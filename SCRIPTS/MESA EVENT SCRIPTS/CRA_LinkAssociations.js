/*==========================================================================================================================
// Script Number: 404
// Script Name:CRA_LinkAssociations
// Script Developer: Michael VanWie
// Script Agency: MESA
// Script Description: Link Association record contacts with reference contacts
//                     To associate a contact must match on 2 of the 3 following criteria:
//
//                     Name - compareContactsByName() takes 2 CapContactScriptModels and strips/cleans
//                                                    the first/last name fields for comparison.
//                                                    Returns 1 for a match and 0 otherwise
//
//                     Contact Addresses - compareContactAddress() takes 2 CapContactScriptModels
//                                                                 and will compare addressline 1 & 2 of contact address
//                                                                 and addressline 1 & 2 of the first ref address and compares
//                                                                 Street Number, City and Zip for matches
//                                                                 Returns 1 if 2 of the 3 values match and 0 otherwise
//
//                     Email Address - Compares uppercase email address
//                                                                 
// Script Run Event: ASA
// Script Parents:
//	 ASA;Associations/NA/NA/NA
//
// Change Log:
// 02/27/2017   mvanwie - Initial Release
// 04/27/2017   mvanwie - Updated to use a point system based on Names, Contact addresses and Email Address
/*==========================================================================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    //get people on Association Record - Typically just an applicant
    var appContacts = aa.people.getCapContactByCapID(capId).getOutput();
    var appApplicant;

    //Get Applicant
    for(c in appContacts)
        appApplicant = appContacts[c].getCapContactModel().getContactType() == "Applicant" ? appContacts[c] : null;
    
    if(appApplicant)
    {
        //Applicants Ref Number
        var refContactNum = appApplicant.getCapContactModel().getRefContactNumber();
        
        //Check entered Records
        for(ids in CONVERTEDRECORDASSOCIATION)
        {
            //check if CAP is valid
            var capAltId = String(CONVERTEDRECORDASSOCIATION[ids]["Permit/License Number"]).toUpperCase().trim();
            var matchCount = 0;
            
            capResult = aa.cap.getCapID(capAltId);
            
            if(capResult.getSuccess())
            {
                cap = capResult.getOutput();
                capContacts = aa.people.getCapContactByCapID(cap).getOutput();
                
                logDebug("Checking: " + capAltId);

                //Check against contact on CAP
                for(capContact in capContacts)
                {
                    //Cap contact
                    var cContact = capContacts[capContact];
                    
                    //If Contact Name Matches + 1 point
                    if(compareContactsByName(appApplicant, cContact) == 1) 
                        matchCount++ ;

                    //If Contacts Address Matches + 1 point
                    if(compareContactAddress(appApplicant, cContact) > 1) 
                        matchCount++;

                        
                    //If Contacts Emails Matches + 1 point
                    if(('' + appApplicant['people']['email']).toUpperCase() + ' === ' + ('' + cContact['people']['email']).toUpperCase())
                        matchCount++;
                        
                    //If at least 2 match criteria are met link the contacts
                    if(matchCount > 1)
                    {
                        if(refContactNum)
                        {
                            var ccmSeq = cContact.getPeople().getContactSeqNumber();
                            var ccm = aa.people.getCapContactByPK(cap, ccmSeq).getOutput().getCapContactModel();

                            ccm.setRefContactNumber(refContactNum);
                            r = aa.people.editCapContact(ccm);

                            if(r.getSuccess())
                                logDebug("Successfully linked ref contact " + refContactNum + " to cap contact " + ccmSeq);
                            else
                                logDebug("WARNING: error updating cap contact model : " + r.getErrorMessage());
                        }
                    }
                matchCount = 0;
                }
                
            }
            else
            {
                logDebug("Invalid Record ID entered by user: " + capAltId);
            }
        }
    }
}
catch(err)
{
    logDebug("Javascript Error: " + err.message);
    logDebug("Javascript Error Stack: " + err.stack);
}

function compareContactsByName(contact1, contact2)
{
    var tns = {};
    
    if(arguments.length > 1)
    {
        for(arg in arguments)
        {
            name = ([arguments[arg]['firstName'], arguments[arg]['lastName']])
                    .join(' ').toUpperCase()                        //Join Names and uppercase
                    .replace(',',' ').replace('.', ' ')             //Strip commas and periods
                    .split(' ')                                     //Spit name on space
                    .filter(function(val) {return val.length > 1;}) //Remove any parts 1 character long (initials)
                    .join('').split('').sort()                      //Split by char and sort
                    .join('').trim()                                //Join final chars and remove extra spaces

            tns["name" + [arg]] = name;
        }
        return tns['name0'] == tns['name1'] ? 1 : 0;
    }
    else
    {
        logDebug('compareContactsByName(): Two names required from comparison.');
        return 0;
    }
}

function compareContactAddress(contact1, contact2)
{
    var tns = {};
    var matchCount = 0;
    if(arguments.length == 2)
    {
        for(arg in arguments)
        {
            var cObj = arguments[arg];

            tns['addr1Num'+arg] = (cObj['people']['compactAddress']['addressLine1'] || arg + '-null').split(' ')[0].toUpperCase();
            tns['addr2Num'+arg] = (cObj['people']['compactAddress']['addressLine2'] || arg + '-null').split(' ')[0].toUpperCase();
            tns['city'+arg] = (cObj['people']['compactAddress']['city'] || arg + '-null').toUpperCase();
            tns['zip'+arg] = (cObj['people']['compactAddress']['zip'] || arg + '-null').toUpperCase();
            
            if(cObj.people.contactAddressList.toArray()[0] !== undefined)
            {
                tns['refAddr1Num'+arg] = (cObj['people']['contactAddressList'].toArray()[0]['addressLine1'] || arg + '-null').split(' ')[0].toUpperCase();
                tns['refAddr2Num'+arg] = (cObj['people']['contactAddressList'].toArray()[0]['addressLine2'] || arg + '-null').split(' ')[0].toUpperCase();
                tns['refCity'+arg] = (cObj['people']['contactAddressList'].toArray()[0]['city'] || arg + '-null').toUpperCase();
                tns['refZip'+arg] = (cObj['people']['contactAddressList'].toArray()[0]['zip'] || arg + '-null').toUpperCase();
            }
        }
        
        //Match first 'part' of AddressLine1 & AddressLine2 to first 'part' of AddressLine1 OR AddressLine2 of 2nd contact
        //Address could be stored in 'AddressLine1' or 'AddressLine2' so compare both
        //Contacts may have a contact address or a reference address so compare both (Only comparing first of the ref)
        if((   tns['addr1Num0'] == tns['addr1Num1'] 
            || tns['addr1Num0'] == tns['addr2Num1'] 
            || tns['addr2Num0'] == tns['addr1Num1'] 
            || tns['addr2Num0'] == tns['addr2Num1'])
        ||(    tns['addr1Num0'] == tns['refAddr1Num1'] 
            || tns['addr1Num0'] == tns['refAddr2Num1'] 
            || tns['addr2Num0'] == tns['refAddr1Num1'] 
            || tns['addr2Num0'] == tns['refAddr2Num1'])
        ||(    tns['refAddr1Num0'] == tns['addr1Num1'] 
            || tns['refAddr1Num0'] == tns['addr2Num1'] 
            || tns['refAddr2Num0'] == tns['addr1Num1'] 
            || tns['refAddr2Num0'] == tns['addr2Num1'])
        ||(    tns['refAddr1Num0'] == tns['refAddr1Num1'] 
            || tns['refAddr1Num0'] == tns['refAddr2Num1'] 
            || tns['refAddr2Num0'] == tns['refAddr1Num1'] 
            || tns['refAddr2Num0'] == tns['refAddr2Num1']))
            matchCount++;
        
        //Match CRA City of Contact Address or Ref Address to PMT City of Contact Address or Ref Address
        if(tns['city0'] == tns['city1'] || tns['city0'] == tns['refCity1'] || tns['refCity0'] == tns['city1'] || tns['refCity0'] == tns['refCity1'])
            matchCount++;

        //Match CRA Zip of Contact Address or Ref Address to PMT Zip of Contact Address or Ref Address
        if(tns['zip0'] == tns['zip1'] || tns['zip0'] == tns['refZip1'] || tns['refZip0'] == tns['zip1'] || tns['refZip0'] == tns['refZip1'])
            matchCount++;
            
        return matchCount;
    }
    else
    {
        return 0;
    }
}