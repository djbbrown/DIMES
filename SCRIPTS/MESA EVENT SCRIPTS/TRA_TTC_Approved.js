/*===================================================================
// Script Number: 290
// Script Name: TRA_TTC_Approved.js
// Script Description: When Traffic Review Task is statused as Approved - No Fees Automatically status permit Issuance Task to Issued and go to next task.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Test Record: TTC16-00029
// Version   |Date      |Engineer         |Details
//  1.0      |09/19/16  |Steve Veloudos   |Initial Release
//  2.0      |11/02/16  |Steve Veloudos   |Added Restriction set
//  3.0      |11/02/16  |Kevin Gurney     |Updated to use environment variables
/*==================================================================*/

try {
    var ConditionFlag = false;

    if (wfTask == "Traffic Review" && wfStatus == "Approved - No Fees"){
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
	
		if (!ConditionFlag && appMatch("Transportation/Temporary Traffic Control/NA/NA"){
			branchTask("Permit Issuance","Issued","Closed via Script Approved - No Fees","Closed via Script");
		}
		
		if (!ConditionFlag && appMatch("Transportation/Temporary Traffic Control/Modification/NA"){
			closeTask("Final Decision","Approved","Closed via Script Approved - No Fees","Closed via Script");
		}
	
		if (ConditionFlag){
			var afterHrsCond = doesCapConditionExist("After Hours or Saturday/Sunday Restriction");
			//logDebug("afterHrsCond = " + afterHrsCond);
			if (!afterHrsCond){
				addStdCondition("Transportation","After Hours or Saturday/Sunday Restriction");
			}
		}
	}
	
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }