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
	var parentMstPlnId = getParent();
	logDebug("parentMstPlanId = " + parentMstPlnId);
	//parentMstPlnIdAlt = parentMstPln[0].getCustomID();
	//parentMstPlnId = getApplication(parentMstPlnIdAlt);
	//mstPlnWrkDes = workDescGet(parentMstPlnId);
	//logDebug("mstPlnWrkDes = " + mstPlnWrkDes);
	//logDebug("parentMstPlnIdAlt = " + parentMstPlnIdAlt);
	if(parentMstPlnId != null){
		copyCapWorkDesInfo(parentMstPlnId,capId);
		}
	}
catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
	}