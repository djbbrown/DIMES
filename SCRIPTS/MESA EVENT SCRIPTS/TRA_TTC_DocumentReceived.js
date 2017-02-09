/*===================================================================
// Script Name: TRA_TTC_DocumentReceived.js
// Script Developer: Mong Ward
// Script Agency: Mesa
// Script Description: Updates the Plans Distribution WF Task when a document is uploaded to Revisions recieved.
// Script Run Event: DUA - DocumentUploadAfter
// Script Parents:
//            DUA;Transportation!~!~!~
//
===================================================================*/

 

//Start Script 
try 
 { 
var wfTaskStatusCheck = false;
if (capStatus == "Revisions Required" && isTaskActive("Plans Distribution")) {
	var wfTaskStatusCheck = true;
}
//logDebug("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck)) 	{
	for(var index = 0; index < documentModelArray.size(); index++){
		
		// Update workflow task for document to be reviewed

		if (documentModelArray.get(index).getDocCategory()=="Traffic Control Plans") 
		{
			updateTask("Plans Distribution", "Revisions Received", "Updated by DUA event", "Updated by DUA event");
			//potentially send email
		}	
  		
	}
}
 catch (err) 
 { 
   logDebug("A JavaScript error occurred: " + err.message); 
 } 
 
//End Script 