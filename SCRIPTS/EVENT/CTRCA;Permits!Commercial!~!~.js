//adding publicUser criteria check to execute scripts based on AA or ACA
if (publicUser) {
	include("PMT_SignalButteTag");
	include("PMT_Condition_Email");
}

//adding this call for executing fees if ACA record application is completed by internal user.
if (!publicUser) {
	include("PMT_CommercialASAFees");
}