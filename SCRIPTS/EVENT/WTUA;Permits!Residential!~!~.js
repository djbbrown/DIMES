//Evaluating the PMT_TotalEvaluation prior to fees being added 
//As it is calculated based on this.
include("PMT_TotalValuation");
include("PMT_AssessResidentialBuildingPermitFee");
include("PMT_ResDeferredSubmittal");
include("PMT_ResidentialFees");
include("PMT_ResubmittalFee");
//      added by Steve Allred (Mesa)   
include("PMT_BlueCard");

// This must run last
include("PMT_ResidentialDeposit");