/*===================================================================
// Script Number: TBD
// Script Name: ALR_PermitFees.js
// Script Developer: Kevin Gurney
// Script Agency: Accela
// Script Description: When an Alarm Permit is submitted apply the appropriate Permit Fees 
//
// Script Run Event: ASA
// Script Parents:
//             ASA;Permits!Police Department!Alarms!Commercial
==================================================================*/
if(publicUser){
	removeAllFees(capId);
}
if (AInfo["Burglary Function"] == "Yes"){
	addFee("PD_ALARM_01","PMT_PD_ALARM_010","FINAL",1,"Y");
}
if (AInfo["Panic/Robbery/Hold-Up Function"] == "Yes"){
	addFee("PD_ALARM_02","PMT_PD_ALARM_010","FINAL",1,"Y");
}

updateFee("PD_ALARM_07","PMT_PD_ALARM_010","FINAL",1,"Y");

