//
// include("PLN_ParcelNoAddress"); // Moved to all Planning Records
//include("PLN_AutopopulateZoningClassification"); // Script 73  moved to all planning records

/*===================================================================
// Script Number: TBD
// Script Desc: To schedule Pre-Submittal Meeting
==================================================================*/
if(!publicUser){
	include("PLN_SchedulePreSubmittal");
	// added by John Cheney (Mesa) 9/22/2016
	include("PLN_ExistingZoning");
}