/*===================================================================
// Script Number: 328
// Script Name: PMT_InspectionPhoneNumberRequired.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
If one of these type of inspections is requested:
Zoning Final, NPP Fence Inspection, Zoning - Monitor Inspection,
Zoning - Preliminary Inspection, Fire Underground, Fire Overhead
Fire Alarm System, Gate Test, Hood Test or Fire Final
 
Action: 
Require a phone number be entered on the inspection. 

// Script Run Event: ISB

// Script Parents:

//	ISB;Permits!~!~!~

//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    //MRK - 9.27.2016 - Removed (XXX)XXX-XXXX Regex pattern check from validation script.

    var firePermitType = "Permits/Fire/*/*";
    var policePermitType = "Permits/Police Department/*/*";

    //check to see if the permit type is not a fire or police permit
    if(!appMatch(firePermitType) && !appMatch(policePermitType))
    {
        //get all the inspections for the current record
        var inspectionResult = aa.inspection.getInspections(capId);

        if(inspectionResult.getSuccess) {
            //get the array of inspections for the record
            var inspectionArray = inspectionResult.getOutput();

            if(inspectionArray.length != 0) {
                var isMatch = false;
                //inspection types that require a phone number for the requestor 
                var inspectionTypes = [
                    "ZONING FINAL", 
                    "NPP FENCE INSPECTION",
                    "ZONING - MONITOR INSPECTION",
                    "ZONING - PRELIMINARY INSPECTION",
                    "FIRE UNDERGROUND",
                    "FIRE OVERHEAD",
                    "FIRE ALARM SYSTEM",
                    "GATE TEST",
                    "HOOD TEST",
                    "FIRE FINAL"
                ];

                for(inspection in inspectionArray) {
                    var inspectionType = "";
                    var inspectionObj = inspectionArray[inspection];

                    inspectionType = inspectionObj.getInspectionType().toUpperCase();

                    //check to see if inspection type of current inspection matches any of the inspection types in array
                    for(type in inspectionTypes) {
                        var currentType = "" + inspectionTypes[type];

                        if(currentType == inspectionType) 
                        {
                            isMatch = true;
                            break;
                        }
                    }

                    //check the requestor's phone number and it was entered in the proper format: (XXX)XXX-XXXX  
                    if(isMatch) 
                    {
                        var validPhoneNumber = true;
                        var validationMessage = "";
                        //get the requestor's phone number from current inspection object
                        var phoneNumber = "" + inspectionObj.getRequestPhoneNum();

                        //if the phone number field is empty, they must enter a valid phone number
                        if(phoneNumber.length == 0)
                        {
                            validPhoneNumber = false;
                            validationMessage = "Please enter valid phone number for the Requestor's Phone Number field.";
                        }
                        
                        if(!validPhoneNumber) {
                            showMessage = true;
                            comment(validationMessage);
                            cancel = true;
                        }
                    }
                }
            }
        }        
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
     
*/