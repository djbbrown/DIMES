//adding publicUser criteria check to execute scripts based on AA or ACA
//removing if statement on publicUser since if record is finished in AA it runs the CTRCA event with the internal user
include("PMT_FloodControlPermit");
include("PMT_StapleyTag");
include("PMT_Parcel_51");
include("PMT_CM_Gas_Electric");
include("PMT_CMSW_Gas");
include("PMT_Light_Rail");
include("PMT_Communications_Towers");
// added by Vance Smith (Mesa)
include("PMT_AutopopulateASIFieldsFromGISAttributes");
include("PMT_CodeEnforcementNumber");
include("PMT_Email_Hazardmat_Received");
include("PMT_MasterPlan_DetailDesc");
