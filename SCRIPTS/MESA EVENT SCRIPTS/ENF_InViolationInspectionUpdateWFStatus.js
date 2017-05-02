/*===================================================================
// Script Number: 047
// Script Name:ENF_InViolationInspectionUpdateWFStatus.js
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Update workflow task  When Initial or Follow-Up Inspection is resulted with "In Violation"
// Script Run Event: IRSA
// Script Parents:
//	IRSA;Enforcement!Case!~!~ 
//	IRSA;Enforcement!Environmental!~!~ 
//
// - Date    	| Updated By			| Notes
// ------------------------------------------------------------------
// - 01/01/1900 | Raminder Gill         | Initial Version 
// - 05/01/2017 | Michael VanWie		| Added Try/Catch, Cleaned up logic
/*==================================================================*/
try
{
    var inViolationInspectionScriptModels = [];
    var getInspectionsResult = aa.inspection.getInspections(capId);
    
    if (getInspectionsResult.getSuccess()) 
    {
    	var inspectionScriptModels = getInspectionsResult.getOutput();
        var checkType = ["Initial Inspection", "Follow-Up Inspection", "Citation Inspection"];
    	
    	for (inspectionScriptModelIndex in inspectionScriptModels) 
    	{
    		var ISM = inspectionScriptModels[inspectionScriptModelIndex];
    		if(IsStrInArry(ISM.inspectionType, checkType) && ISM.inspectionStatus == "In Violation")
    			inViolationInspectionScriptModels.push(ISM);
    	}
    }
    
    var inspTypes = ["Initial Inspection", "Follow-Up Inspection", "Follow-up Inspection", "Citation Inspection"];
    if(IsStrInArry(inspType, inspTypes) && inspResult == "In Violation" && (inViolationInspectionScriptModels.length > 0 && inViolationInspectionScriptModels.length < 3))
    {
        logDebug('Found ' + inViolationInspectionScriptModels.length + ' Inspections In Violation.')
        if( isTaskActive("Citation Inspections") )
			updateTask("Citation Inspections","In Violation","Updated by Script 47","Updated by Script 47");
		if( isTaskActive("Follow-Up Inspection") )
			updateTask("Follow-Up Inspection","In Violation","Updated by Script 47","Updated by Script 47");
		if( isTaskActive("Initial Inspection") )
			branchTask("Initial Inspection","In Violation","Closed by Script 47","Closed by Script 47");
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}