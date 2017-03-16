/*===================================================================
// Script Number: 393
// Script Name: PMT_IssueOnlinePermitACAjs
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: When the Online Permit is submitted through ACA:
                            Update Task Status to "Issued"
                            Deactivate Task
                            Update Record Status to "Issued"
                            Execute Report "219 - Online Permit" and save it to the document tab
// Script Run Event: ASA
// Script Parents:
//	ASA;Permits!Online!NA!NA    
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(appMatch("Permits/Online/NA/NA"))
    {
        //Update Application Submittal to "Ready to Issue"
        branchTask("Application Submittal", "Ready To Issue", "Closed by Script 393", "Closed via Script 393");
        
        //Update Permit Issuance to "Issued"
        branchTask("Permit Issuance", "Issued", "Issued by Script 393", "Issued via Script 393");
        
        //Update App Status to "Issued"
        updateAppStatus("Issued", "Issued by Script 393");

        //Run and Attach report 219
        runReportAttach(capId, "219 - Online Permit", "RecordNumber", capId.getCustomID());
    }
}
catch(ex)
{
    logDebug("Javascript error: " + ex.message);
    logDebug("Error Stack: " + ex.stack);
}