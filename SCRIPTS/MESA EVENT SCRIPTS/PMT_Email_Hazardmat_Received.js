/*===================================================================*/
// Script Number: 227
// Script Name: PMT_Email_Hazardmat_Received.js
// Script Description: Send email when a document with a category of "Industrial PreTreatment Form" or "Hazardous Material Inventory Statement" is uploaded    
// Script Run Event: DUA
// Script Parents:DUA;Permits/Commercial/NA/NA
// Testing Record: PMT16-00498
// Version   |Date      |Engineer         |Details
//  1.0      |08/31/16  |Steve Veloudos   |Initial Release 
//  2.0      |09/28/16  |Steve Veloudos   |Adj to iterate through all docs
//  3.0      |11/02/16  |Steve Veloudos   |Adj to get last doc uploaded only
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail;
      var vEParams = aa.util.newHashtable();
      var DocFlag = 0;
      var DocCategory;
    
    //Retrieve documents
    var docListResult = getDocumentList();
    
    //Get the last document uploaded
    if (docListResult.getSuccess()) 
        { 
        docListArray = docListResult.getOutput()
        var DocLast = docListArray.length;
        var LastPos = DocLast -1
        DocCategory = docListArray[LastPos].getDocCategory();
        var DocLastCatUC = DocCategory.toUpperCase();
        
        //Test for Doc category
        if (DocLastCatUC == "INDUSTRIAL PRETREATMENT FORM")
            {
                DocFlag = 1;
            }
            else if (DocLastCatUC == "HAZARDOUS MATERIALS INVENTORY STATEMENT")
            {
                DocFlag = 1;
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