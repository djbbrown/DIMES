//adding publicUser criteria check to execute scripts based on AA or ACA
if (publicUser) {
	include("PMT_SignalButteTag");
	include("PMT_Condition_Email");
}
