// WTUA;Permits!~!~!~.js
include("PMT_PenaltyDate");

// added by Vance Smith (Mesa)
include("PMT_PermitExpirationDate"); // 92

// added by John Cheney (Mesa 10/17/2016 script 334)
// this has to run after PMT_PenaltyDate 
include("PMT_CopyPenaltyDateToDueDate"); 


// added by Kevin Gurney (Accela)
// added !match for Master Plan record type - nalbert 1/31/2017
if (
		(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue")
		|| (wfTask == "Application Submittal" && wfStatus == "Accepted - Plan Review Not Req")
){
	if(!matches(appTypeArray[1], "Master Plan")){
		include("PMT_UtilityServiceFees");
	}
}
