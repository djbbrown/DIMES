//*===================================================================
//
// Script Number: 68
// Script Name: PMT_ZoningVerificationLetter_ASBonly.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		On ASB, if the ASIT (DOC_ASIT) has any rows with the column 
//		"Document Type" set to a value of  
//		"Zoning Verification Letters - One Parcel Request" 
//		then require a document of type "Zoning Verification Letter". 
//		If the document does not exist, prevent submittal.
//
//		This script has the same purpose as PMT_ZoningVerificationLetter
//		but the configuration of this record type requires different
//		method to load document information. So the version wired to the ASIUB
//		is a little different code to accomplish the same test.
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//              ASB;Permits/Document Retrieval/NA/NA
//		ASIUB;Permits/Document Retrieval/NA/NA  (other script wired to ASIUB)
// 
//==================================================================*/


try
{
 
  loadASITablesBefore();
  var tInfo = DOCUMENTTYPESREQUESTED
  var tInfoCount = tInfo.length;
  var docNeeded = false;
  var docFound = false;

  //logDebug("tInfoCount: " + tInfoCount);

  for (x=0;x<tInfoCount;x++)
  {
    curReqDocType = tInfo[x]["Document Type"];
  
    if (curReqDocType == "Zoning Verification Letter - One Parcel Request")
    {
      docNeeded = true;
      //logDebug("docNeeded: " + docNeeded);
      
      var docList = aa.env.getValue("DocumentModelList");
      var docListCount = 0;

      if((docList == null) 
          || (docList == ""))
      {
        docList = aa.document.getDocumentListByEntity(capId.toString(),"TMP_CAP").getOutput();
        docListCount = docList.size();
      }
      else
      {
        docListCount = docList.size();
      }
	

      if (docListCount > 0)
      {
        for(x=0;x<docListCount;x++)
        { 
          if((docList.get(x) != null)
              && (docList.get(x).getDocGroup() == "PMT_DOC")
              && (docList.get(x).getDocCategory() == "Zoning Verification Request")) 
          {
            docFound = true;
            break; 
          }
        }
      }

    }
  }
   
  if ((!(docFound == true)) && (docNeeded == true))
  {
    if (publicUser) { showDebug=false; }
    showMessage = true;         
    //logMessage("Zoning Verification Request must be attached.");
    //logDebug("Zoning Verification Request must be attached.");
    comment("The document Zoning Verification Letter is required. Please add this document and submit again.");
    cancel = true;
  }


}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



