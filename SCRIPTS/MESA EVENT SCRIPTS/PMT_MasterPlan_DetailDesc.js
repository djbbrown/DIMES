/*===================================================================
// Script Number: TBD
// Script Name: PMT_MasterPlan_DetailDesc.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: Workaround for pageflow script issue on detailed description
// Script Run Event: CTRCA
// Script Parents:
//          CTRCA;Permits!Residential!NA!NA
//			CTRCA;Permits!Commercial!NA!NA
/*==================================================================*/
try {
	logDebug("parentCapId = " + parentCapId);
	if(parentCapId != null){
		copyCapWorkDesInfo(parentCapId,capId);
		}
	}
catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
	}