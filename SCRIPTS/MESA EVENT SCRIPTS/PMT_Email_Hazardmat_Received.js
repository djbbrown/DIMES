/*===================================================================*/
// Script Number: 227
// Script Name: PMT_Email_Hazardmat_Received.js
// Script Description: Send email when a document with a category of "Industrial PreTreatment Form" or "Hazardous Material Inventory Statement" is uploaded. 
// Possible all record status and along with other document types.   
// Script Run Event: DUA
// Script Parents:DUA;Permits/Commercial/NA/NA
// Testing Record: PMT16-00498
// Version   |Date      |Engineer         |Details
//  1.0      |08/31/16  |Steve Veloudos   |Initial Release 
//  2.0      |09/28/16  |Steve Veloudos   |Adj to iterate through all docs
//  3.0      |11/02/16  |Steve Veloudos   |Adj to get last doc uploaded only
//  4.0      |12/08/16  |Steve Veloudos   |Adj for all documents and only get docs that match current date
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail;
      var vEParams = aa.util.newHashtable();
      var DocFlag = 0;
      var DocCatUC;
      var DocUploadDate;
      var d;
      var d2;
      var CurrentDate;
      var StringUploadDate;

      //Get current date
      d = new Date();
      d2 = jsDateToASIDate(d);
      CurrentDate = String(d2);

        //Retrieve documents
        var docListResult = aa.document.getCapDocumentList(capId,currentUserID);
    
        //Iterate through the document list
        if (docListResult.getSuccess()) 
        { 
            docListArray = docListResult.getOutput()
            for(x in docListArray)
            {
            //get doc category and date uploaded
            DocCatUC = docListArray[x].getDocCategory().toUpperCase();
            DocUploadDate =  docListArray[x].getFileUpLoadDate();
        
            //Convert to string date
            StringUploadDate = String(DocUploadDate);

            //Compare dates
            if (CurrentDate == StringUploadDate)
                {
                //Test for Doc category
                if (DocCatUC == "INDUSTRIAL PRETREATMENT FORM")
                    {
                        DocFlag = 1;
                        break;
                    }
                    else if (DocCatUC == "HAZARDOUS MATERIALS INVENTORY STATEMENT")
                    {
                        DocFlag = 1;
                        break;
                    }
                }
            }  
        }
   
    //Add parms
    addParameter(vEParams,"$$RECORDID$$",capIDString);
    addParameter(vEParams,"$$DocCategory$$",DocCategory);
      
    //Send Email if correct doc category
    if(DocFlag == 1)
      {
      ToEmail = lookup("EMAIL_RECIPIENTS","Industrial_Pretreatment_Supervisor");
      sendNotification(FromEmail, ToEmail, "", "PMT_DOC_UPLOAD", vEParams, null, capId);
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }