/*===================================================================
// Script Number: 145
// Script Name: PMT_MobileHomePublicSafetyImpactFee.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
	
When “Y” is chosen for ASI field “Police” in ASI subgroup “Impact Fees” then...
IF value of “Manufactured Home (on platted lot)” is chosen for ASI dropdown field “Classification” then 
assess Public Safety Impact Fee using # entered into ASI field "Number of Units" in GENERAL ASI Section.
Fee item Code: RDIF340
Fee Schedule: PMT_RDIF
Fee Period = Final
 
IF value of “Mfg. Home/Park Model/RV (per space or lot)” is chosen for ASI dropdown field “Classification” then 
assess Public Safety Impact Fee using # entered into ASI field "Number of Units" in GENERAL ASI Section.  
Fee item Code: RDIF350
Fee Schedule: PMT_RDIF
Fee Period = Final

// Script Run Event: ASIUA, WTUA

// Script Parents:

//	ASA;Permits/Residential/Mobile Home/NA (removed 9/22/16)
    ASIUA;Permits/Residential/Mobile Home/NA
    WTUA;Permits/Residential/Mobie Home/NA (added 9/22/16)
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var passedCriteria = false;

    //This code is checking for the following scenarios:
    //1) When workflow task "Permit Issuance" is activated 
    //2) On ASIUA, if workflow has one of the following tasks activited: Permit Issuance or Inspection
    //3) if all workflow tasks are inactive (workflow has been completed)

    var isPermitIssuanceActive = isTaskActive("Permit Issuance");
    var isInspectionActive = isTaskActive("Inspection");

    //modified if statement to validate that isPermitIssuanceActive and isInspectionActive are not null and switch the "And" syntax to an "IF" syntax

    if((isPermitIssuanceActive != null && isPermitIssuanceActive) || (isInspectionActive != null && isInspectionActive))
        passedCriteria = true;
    else {
        var tasks = aa.workflow.getTasks(capId).getOutput();

        if(tasks.length > 0)
        {
            for(x in tasks) {
                var currentTask = tasks[x];

                if(currentTask.isTaskActive)
                    break;
            }

            passedCriteria = true;
        }
    }

    if(passedCriteria) {

        //check to see if the "Police" ASI field is "Y"/"CHECKED"
        var isPolice = Boolean(AInfo["Police"]);

        if(isPolice) {
            var assessFee = false;
            var feeItemCode = "";
            var feeSchedule = "PMT_RDIF";
            var feePeriod = "FINAL";
            var numberOfUnits = 0;
            
            //If true, check the ASI dropdown field "Classification"
            var classification = "" + AInfo["Classification"];

            if(classification.length > 0){
                //if a selection has been made in the ASI dropfield "Classification", get the value
                classification = classification.toUpperCase();

                //If the value equals one of the following values, we need to assess a public safety impact fee:
                //Manufactured Home (on platted lot)
                //Mfg. Home/Park Model/RV (per space or lot)
                switch(classification) {
                    case "MANUFACTURED HOME (ON PLATTED LOT)":
                        feeItemCode = "RDIF340";
                        assessFee = true;
                        break;

                    case "MFG. HOME/PARK MODEL/RV (PER SPACE OR LOT)":
                        feeItemCode = "RDIF350";             
                        assessFee = true;
                        break;
                }

                //if a fee needs to be assessed, call the addFee function and get the number of units from
                //ASI field "Number of Units"
                if(assessFee) {
                    numberOfUnits = AInfo["Number of Units"];
                    addFee(feeItemCode, feeSchedule, feePeriod, numberOfUnits, "N");
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