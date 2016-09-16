//*===================================================================
//
// Script Number: 68
// Script Name: PMT_ZoningVerificationLetter.js
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
  loadASITable("DOCUMENT TYPES REQUESTED");
  var tInfo = DOCUMENTTYPESREQUESTED
  var tInfoCount = tInfo.length;

  var docNeeded = false;
  var docFound = false;
  var curReqDocType = "";

  for (x=0;x<tInfoCount;x++)
  {
    curReqDocType = tInfo[x]["Document Type"];
  
    if (curReqDocType == "Zoning Verification Letter - One Parcel Request")
    {
      docNeeded = true;
      var docListResult = aa.document.getCapDocumentList(capId,currentUserID);

      if (docListResult == null)
      {
        showMessage = true;
        comment("The document List is null");
      }
      else
      {

        if (docListResult.getSuccess())
        {
          var docListArray = docListResult.getOutput()
          var docCount = docListArray.length;
          var docCat = "";

          for(x=0;x<docCount;x++)
          {
            docCat = docListArray[x].getDocCategory();
    
            if (docCat == "Zoning Verification Request")
            {
              docFound = true;
            }
          }  
        } 
      }
    }
  }

  if ((docNeeded) && (!(docFound)))
  {
    showMessage = true;
    comment("The document Zoning Verification Letter is required. Please add this document and submit again.");
    cancel = true;
  }


}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



