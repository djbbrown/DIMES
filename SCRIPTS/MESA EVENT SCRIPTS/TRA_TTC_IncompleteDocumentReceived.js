/*===================================================================
// Script Name: TRA_TTC_IncompleteDocumentReceived.js
// Script Developer: Mong Ward
// Script Agency: Mesa
// Script Description: Updates the record status when a document is uploaded when record status is Incomplete.
// Script Run Event: DUA - DocumentUploadAfter
// Script Parents:
//            DUA;Transportation!~!~!~
//
===================================================================*/

 

//Start Script 
try 
 {
var wfTaskStatusCheck = false;
if (capStatus == "Incomplete" && isTaskActive("Application Submittal")) {
	var wfTaskStatusCheck = true;
}
	comment("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck)) 	{
	for(var index = 0; index < documentModelArray.size(); index++){
		
		// Update workflow task for document to be reviewed

		if (documentModelArray.get(index).getDocCategory()=="Traffic Control Plans") 
		{
			updateAppStatus("Received", "Updated by DUA event");
			//potentially send email
		}	
  		
	}
}
 
 }
 catch (err) 
 { 
   logDebug("A JavaScript error occurred: " + err.message); 
 } 
 
//End Script 