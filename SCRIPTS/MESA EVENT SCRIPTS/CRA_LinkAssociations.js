/*===================================================================
// Script Number: ---
// Script Name:CRA_LinkAssociations
// Script Developer: Raminder Gill
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

//get people on Association Record - Typically just an applicant
var appContacts = aa.people.getCapContactByCapID(capId).getOutput();
var overwriteAttributes = false;

//Check entered Records
for(ids in CONVERTEDRECORDASSOCIATION)
{
    //check if CAP is valid
    var capAltId = String(CONVERTEDRECORDASSOCIATION[ids]["Permit/License Number"]).trim();
    capResult = aa.cap.getCapID(capAltId);

    if(capResult.getSuccess())
    {
        cap = capResult.getOutput();
        logDebug("Checking: " + capAltId);
        capContacts = aa.people.getCapContactByCapID(cap).getOutput();
        capContacts2 = aa.people.getCapContactByCapID(cap).getOutput();

        //For each contact on the application 
        for(appContact in appContacts)
        {
            //Application Contact
            var aContact = appContacts[appContact];

            //Check against contact on CAP
            for(capContact in capContacts)
            {
                //Cap contact
                var cContact = capContacts[capContact];
                
                //If Application Contact's Name and Email Match link them to CAP
                if(aContact.getEmail() == cContact.getEmail() &&
                aContact.getFirstName() == cContact.getFirstName() &&
                aContact.getLastName() == cContact.getLastName())
                {
                    //Get Applications Ref Number
                    var refContactNum = aContact.getCapContactModel().getRefContactNumber();
                    //Get Cap PeopleObject
                    var cPeople = cContact.getPeople();

                    if(refContactNum)
                    {
                        cPeople.setContactSeqNumber(refContactNum);
                        cPeople.setContactType(cContact.getPeople().getContactType());

                        if(overwriteAttributes)
                        {
                            var a = cPeople.getAttributes();
                            if(a)
                            {
                                var ai = a.iterator();
                                while(ai.hasNext())
                                {
                                    var xx = ai.next();
                                    xx.setContactNo(refContactNum);
                                }
                            }
                            var r = aa.people.editPeopleWithAttribute(cPeople, cPeople.getAttributes());
                            if(!r.getSuccess())
                                logDebug("WARNING: Couldn't refresh reference people : " + r.getErrorMessage());
                            else
                                logDebug("Successfully Refreshed ref contact # " + refContactNum + " with CAP contact data");
                        }
                        else
                        {
                            var r = aa.people.editPeople(cPeople);
                            if(!r.getSuccess())
                                logDebug("WARNING: Couldn't refresh reference people : " + r.getErrorMessage());
                            else
                                logDebug("Successfully linked " + refContactNum + " with " + cap + " as " + cContact.getPeople().getContactType());
                        }
                    }
                }
            } //loop Cap Contacts
        } //loop association contacts
    }
    else
    {
        logDebug("Invalid Record ID entered by user: " + capAltId);
    }
}