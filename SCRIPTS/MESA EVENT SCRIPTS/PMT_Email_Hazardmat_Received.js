/*===================================================================*/
// Script Number: 227
// Script Name: PMT_Email_Hazardmat_Received.js
// Script Description: Send email when a document with a category of "Industrial PreTreatment Form" or "Hazardous Material Inventory Statement" is uploaded    
// Script Run Event: ASA, ASIUA
// Script Parents:ASA;Permits/Commercial/NA/NA
// ASIUA;Permits/Commercial/NA/NA
// Testing Record: PMT16-00498
// Version   |Date      |Engineer         |Details
//  1.0      |08/31/16  |Steve Veloudos   |Initial Release 
//  2.0      |09/28/16  |Steve Veloudos   |Adj to iterate through all docs
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var ToEmail;
      var vEParams = aa.util.newHashtable();
      var DocFlag = 0;
      var DocCategory;
    
    //Retrieve documents
    var docListResult = getDocumentList();
    if (docListResult.length > 0) 
	    { 

        for (doc in docListResult)
        {
             //Get category
             DocCategory =  docListResult[doc].getDocCategory().toUpperCase();
            
            //Test for Doc category
            if (DocCategory == "INDUSTRIAL PRETREATMENT FORM")
            {
                DocFlag = 1;
                break;
            }
            else if (DocCategory == "HAZARDOUS MATERIALS INVENTORY STATEMENT")
            {
                DocFlag = 1;
                break;
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