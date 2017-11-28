/*===================================================================
// Sharepoint Issue Number: 134
// Script Name: TRA_TTC_DocumentReceived.js
// Script Developer: Mong Ward
// Script Agency: Mesa
// Script Description: Blocks the submittion of documents when application status is other than Revisions Required, Received, Incomplete, In Review, or Revisions Received.
// Script Run Event: DUB - DocumentUploadBefore
// Script Parents:
//            DUB;Transportation!~!~!~
//
===================================================================*/

 

//Start Script 
try 
 {
var wfTaskStatusCheck = false;
if (capStatus != "Revisions Required" || capStatus != "Received" || capStatus != "In Review" || capStatus != "Revisions Received" || capStatus != "Incomplete") 
	{
		var wfTaskStatusCheck = true;
	}
	comment("wfTaskStatusCheck = " + wfTaskStatusCheck);

if ((documentModelArray.size() > 0) && (wfTaskStatusCheck = true) && (publicUser)) 	
	{
	for(var index = 0; index < documentModelArray.size(); index++)
		{
		
		// Update workflow task for document to be reviewed

		if (documentModelArray.get(index).getDocCategory()=="Traffic Control Plans") 
			{
			showMessage = true;    
			comment("Plans cannot be uploaded to this application.  A new application may be required. Please contact City of Mesa Transportation");
			cancel = true; 
			}	
  		
		}
	}
 
 }


 
 catch (err) 
 { 
   logDebug("A JavaScript error occurred: " + err.message); 
 } 
 
//End Script 