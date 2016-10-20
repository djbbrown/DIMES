/*===================================================================
// Script Number: 345
// Script Name: TRA_Revisions_Required_New_Doc.js
// Script Description: 	Send email notification to TTC_Staff when a document is uploaded into the system.
// Script Run Event: DUA
// Script Parents:DUA;Transportation!~!~!~.js
// Test Record: TTC16-00025
// Version   |Date      |Engineer         |Details
//  1.0      |09/06/16  |Steve Veloudos   |Initial Release
//  1.1      |10/19/16  |Steve Veloudos   |Changed to fire on WTUA
//  2.0      |10/20/16  |Steve Veloudos   |Changed to fire on DUA removed Workflow checks
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var ToEmail = lookup("EMAIL_RECIPIENTS","TTC_Staff");
    var vEParams = aa.util.newHashtable();
    var DocFlag = 0; 
    
    //Get doc list 
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
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }