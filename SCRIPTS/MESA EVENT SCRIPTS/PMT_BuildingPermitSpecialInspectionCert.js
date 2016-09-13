/*===================================================================
// Script Number: 315
// Script Name: PMT_BuildingPermitSpecialInspectionCert.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
If a “Special Inspection Cert.” Inspection type is added to the record, make the “Special Inspection Certificate” 
Document type required before the Workflow Task “Inspections” Can have a status of “Finaled”, “Finaled – C of C Required” 
or “Finaled – C of O Required”.

// Script Run Event: WTUB

// Script Parents:

//	WTUB;Permits!Commercial!NA!NA
//	WTUB;Permits!Residential!NA!NA

//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    //check the workflow task status of the Inspections to make sure it is one of the following
    //Finaled, Finaled -- C of C Required or Finaled -- C of O Required 
    var currentStatus = taskStatus("Inspections");

    //this code will replace extra long dash and replace with normal dash
    currentStatus = currentStatus.replace("\u2013", "-");
    currentStatus = currentStatus.replace("\u2014", "-");

    if(matches(currentStatus, "Finaled", "Finaled - C of C Required", "Finaled - C of O Required")) {
        logDebug("Inspection Workflow Status: " + currentStatus);

        //get the inspections for the record
        var inspectionResult = aa.inspection.getInspections(capId);

        if(inspectionResult.getSuccess) {
            logDebug("getInspections call successfully");
            //get array of inspections for the record
            var inspectionArray = inspectionResult.getOutput();
            
            if(inspectionArray.length != 0) {
                logDebug("Inspections found for record");

                var hasSpecialInspectionCert = false;
                var hasSpecialInspectionCertDoc = false;

                //loop through all inspections to check for a "Special Inspection Certificate" inspection type
                logDebug("Checking inspections for 'Special Inspection Cert.' inspection type");
                for(inspection in inspectionArray) {
                    var inspectionObj = inspectionArray[inspection];

                    //check the inspection type of the record
                    if(inspectionObj.getInspectionType().toUpperCase() == "SPECIAL INSPECTION CERT.") {
                        hasSpecialInspectionCert = true;

                        //check the attached documents for the record to see if there is a 
                        //Special Inspection Certificate document
                        var docList = getDocumentList();

                        if(docList.length == 0) {
                            logDebug("Record has no attached documents");
                            hasSpecialInspectionCertDoc = false;
                        }
                        else {
                            //loop through document list and document category for 'Special Inspection Certificate'
                            for(doc in docList) {
                                var currentDoc = docList[doc];
                                var docCategory = currentDoc.getDocCategory();

                                if(docCategory.toUpperCase() == "SPECIAL INSPECTION CERTIFICATE") {
                                    hasSpecialInspectionCertDoc = true;
                                }
                            }
                        }
                    }
                }

                if(hasSpecialInspectionCert) {
                    logDebug("Record has a Special Inspection Cert.");

                    if(!hasSpecialInspectionCertDoc) {
                        logDebug("'Special Inspection Certificate' document not attached");
                        showMessage = true;
                        comment("Special Inspection Certificate document required if you schedule a Special Inspection Cert. inspection.") 
                        cancel = true;
                    }
                }
                else {
                    logDebug("Record does not have a Special Inspection Cert.");
                }
            }
            else 
                logDebug("Inspections not found for record");
        }
        else {
            logDebug("getInspections call not successfully");
        }
    }
    else {
        logDebug("Inspection work flow status: " + currentStatus);
        logDebug("Inspection work flow status not met");
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
    PMT16-00545 - has the Inspections task active and ready to try to be finaled 
*/