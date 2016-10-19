/*===================================================================
// Script Number: 345
// Script Name: TRA_Revisions_Required_New_Doc.js
// Script Description: 	When Traffic Review WF task is statused as Revisions Required Notify staff when new document is uploaded.
// Script Run Event: WTUA
// Script Parents:WTUA;Transportation!~!~!~.js
// Test Record: TTC16-00025
// Version   |Date      |Engineer         |Details
//  1.0      |09/06/16  |Steve Veloudos   |Initial Release
//  1.1      |10/19/16  |Steve Veloudos   |Changed to fire on WTUA
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail = lookup("EMAIL_RECIPIENTS","TTC_Staff");
      var vEParams = aa.util.newHashtable();
      var Url = lookup("Agency_URL","ACA");
      var tStatus = "Revisions Required";
      var DocFlag = 0; 
       
       //Get WF Task
       var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check task status for Revisions Required
            if (tasks[t].getDisposition() == tStatus)
            {
              //Get task name  
            docListResult = aa.document.getCapDocumentList(capId ,currentUserID);
            
            //Get the last document uploaded
            if (docListResult.getSuccess()) 
                { 
                docListArray = docListResult.getOutput()
                var DocLast = docListArray.length;
                var LastPos = DocLast -1
                var DocLastCat = docListArray[LastPos].getDocCategory();
                docLastDate = docListArray[LastPos].getFileUpLoadDate();
                var DocDate = String(docLastDate);
                DocFlag = 1;
                }
                  
                //Add Params
                addParameter(vEParams,"$$RECORDID$$",capIDString);
                addParameter(vEParams,"$$DOCCATEGORY$$",DocLastCat);
                addParameter(vEParams,"$$DOCDATE$$",DocDate);
                
                //Send email
                if(DocFlag == 1)
                {
                sendNotification(FromEmail, ToEmail, "", "TRA_REVISIONS_REQ_DOC_UPLOAD", vEParams, null, capId); 
                }
            }
        }     
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }