//*===================================================================
//
// Script Number: 68
// Script Name: PMT_MasterPlanBlockTester_ASBonly.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		On ASB, if the ASIT (DOC_ASIT) has any rows with the column 
//		"Document Type" set to a value of  
//		"Zoning Verification Letters - One Parcel Request" 
//		then require a document of type "Zoning Verification Letter". 
//		If the document does not exist, prevent submittal.
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//              ASB;Permits/Document Retrieval/NA/NA
//		ASIUB;Permits/Document Retrieval/NA/NA
// 
//==================================================================*/


try
{
  
  showMessage = true;  
  comment("Testing Submission Blocking on Master Plan (ASB Only)");
  cancel = true;

  //logDebug("ASB Only");


}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



