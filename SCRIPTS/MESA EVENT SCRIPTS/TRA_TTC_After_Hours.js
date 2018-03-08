/*===================================================================
// Script Number: 289
// Script Name: TRA_TTC_After_Hours.js
// Script Description: When Saturday Restriction or Sunday Restriction is selected as Y,  Cancel transaction
// Script Run Event: WTUA
// Script Parents: Transportation!~!~!~.js
// Removed ASA & ASIUA
// Version   |Date      |Engineer         |Details
//  1.0      |09/07/16  |Steve Veloudos   |Initial Release 
//  2.0      |10/24/16  |Steve Veloudos   |Added the doesCapConditionExist check
//  3.0      |11/02/16  |Steve Veloudos   |Added check for Permit Issuance task status Issued
//  4.0      |11/17/16  |Kevin Gurney     |Modified Code to run on workflow task Permit Issuance and incorporate 290
//	5.0		 |03/07/18  |Mong Ward	      |Modified Code to run on workflow task Permit Issuance and Final Decision, and add additional note. 
//==================================================================*/

try {
    var ConditionFlag = false;

    if (wfTask == "Traffic Review" && matches(wfStatus,"Approved - Fees Due","Approved - No Fees")){
        //Load Data
        tblDurInfo = loadASITable("DURATION INFORMATION");
		if (tblDurInfo != "undefined"){
			for (x in tblDurInfo)
			if (tblDurInfo[x]["Saturday Restriction"] == "Yes" || tblDurInfo[x]["Sunday Restriction"] == "Yes"){
				ConditionFlag = true;
				break;
			}
		}
		//logDebug("ConditionFlag = " + ConditionFlag);
		
		if (ConditionFlag){
			var afterHrsCond = doesCapConditionExist("After Hours or Saturday/Sunday Restriction");
			//logDebug("afterHrsCond = " + afterHrsCond);
			if (!afterHrsCond){
				addStdCondition("Transportation","After Hours or Saturday/Sunday Restriction");
				showMessage = true;
				comment("After Hours Permit required - See Holds & Notices");
				}
		}
	}
	
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }