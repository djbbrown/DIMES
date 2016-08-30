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
//              ASB;Engineering!Utilities!Non City!~
//		ASIUB;Engineering!Utilities!Non City!~
// 
//==================================================================*/


try
{
  loadASITable("DOCUMENT TYPES REQUESTED");
  var tInfo = DOCUMENTTYPESREQUESTED
  var tInfoCount = tInfo.length;

  logDebug("tInfoCount: " + tInfoCount);
  //mkyOutput += "tInfoCount: " + tInfoCount + " \r";

  var docFound = false;
  var curReqDocType = "";

  for (x=0;x<tInfoCount;x++)
  {
    curReqDocType = tInfo[x]["Document Type"];

    logDebug("curReqDocType: " + curReqDocType);
    //mkyOutput += "curReqDocType: " + curReqDocType + " \r";
  
    if (curReqDocType == "Zoning Verification Letter - One Parcel Request")
    {
      var docListResult = aa.document.getCapDocumentList(capId,currentUserID);
  
      if (docListResult.getSuccess())
      {
        var docListArray = docListResult.getOutput()
        var docCount = docListArray.length;
        var docCat = "";

        //mkyOutput += "docCount: " + docCount + " \r";
 
        for(x=0;x<docCount;x++)
        {
          docCat = docListArray[x].getDocCategory();

          //mkyOutput += "docCat : " + docCat + " \r";
  
          if (docCat == "Zoning Verification Request")
          {
            docFound = true;
          }
        }  
      } 
    }
  }

  logDebug("docFound: " + docFound);
  //mkyOutput += "docFound: " + docFound + " \r";

  if (!(docFound))
  {
    comment("The document Zoning Verification Letter is required. Please add this document and submit again.");
    cancel = true;
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



