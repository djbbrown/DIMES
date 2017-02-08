/*===================================================================
// Script Number: TBD
// Script Name: PMT_CheckConditions.js
// Script Description: Check to see that the Maricopa County Dust Plan and Maricopa County Dust Permit conditions are met
// Script Run Event: WTUB
// Script Parents:
//			WTUB;Permits!Demolition!NA!NA
//			WTUB;Permits!Commercial!NA!NA
//			WTUB;Permits!Residential!NA!NA
//==================================================================*/

try {
    var ConditionFlag = false;

    if (wfTask == "Permit Issuance" && wfStatus == "Issued"){
        if ((appHasCondition("Building Permit","Applied","Maricopa County Dust Control Permit",null)) || (appHasCondition("Building Permit","Applied","Maricopa County Dust Control Plan",null))){
			conditionFlag = true;
			//logDebug("conditionFlag = " + conditionFlag);
			if (conditionFlag){
				cancel = true;
				showMessage = true;
				comment("Conditions of Maricopa County Dust Control Permit or Plan need to be met prior to issuing the permit.");
				}
		}
	}
	
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }