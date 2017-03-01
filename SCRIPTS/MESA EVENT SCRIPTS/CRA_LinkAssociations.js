/*===================================================================
// Script Number: ---
// Script Name:CRA_LinkAssociations
// Script Developer: Michael VanWie
// Script Agency: MESA
// Script Description: Link Association record contacts with reference contacts
// Script Run Event: ASA
// Script Parents:
//	 ASA;Associations/NA/NA/NA
//
// Change Log:
// 02/27/2017   mvanwie - Initial Release        
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    //get people on Association Record - Typically just an applicant
    var appContacts = aa.people.getCapContactByCapID(capId).getOutput();

    //Get Applicant
    for(c in appContacts)
        var applicant = appContacts[c].getCapContactModel().getContactType() == "Applicant" ? appContacts[c] : null;

    if(applicant)
    {
        //Applicants Ref Number
        var refContactNum = applicant.getCapContactModel().getRefContactNumber();

        //Check entered Records
        for(ids in CONVERTEDRECORDASSOCIATION)
        {
            //check if CAP is valid
            var capAltId = String(CONVERTEDRECORDASSOCIATION[ids]["Permit/License Number"]).trim();
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
                    
                    //If Application Contact's Name and Email Match link them to CAP
                    if(applicant.getEmail().toUpperCase() == cContact.getEmail().toUpperCase() &&
                        applicant.getFirstName().toUpperCase() == cContact.getFirstName().toUpperCase() &&
                        applicant.getLastName().toUpperCase() == cContact.getLastName().toUpperCase())
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