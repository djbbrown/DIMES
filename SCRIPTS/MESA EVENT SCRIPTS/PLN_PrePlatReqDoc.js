//*===================================================================
//
// Script Number: 312
// Script Name: PLN_PrePlatReqDoc.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		Make these documents required when "Pre-Plat" is checked 
//		in in Request Type ASI subgroup:
//		1) Drawings
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//		ASB;Planning!Planning and Zoning!NA!NA.js
//		ASIUB;Planning!Planning and Zoning!NA!NA.js
// 
//		NOTE: check 275 PMT_RequireDrawing and PMT_RequireDrawings_ASBOnly
//		if criteria on this script change. Both scripts require Drawings
//		document on Planing and Zoning record type
//
//==================================================================*/


try
{
  
  var prePlat = AInfo["Pre-Plat"];
  var docCat = "";
  var docNeeded = true;

  if (prePlat)
  {
    var docListResult = aa.document.getCapDocumentList(capId ,currentUserID);

    if (docListResult.getSuccess()) 
    {
      docListArray = docListResult.getOutput();
      docCount = docListArray.length;

      for(x in docListArray)
      {
        docCat = docListArray[x].getDocCategory();
        
        if (docCat == "Drawings")
        {
          docNeeded = false;
        }
      }
    }

    if (docNeeded)
    {
      commentBlah = "The following document is required for Request Types of Pre-Plat: Drawings";
      showMessage = true;
      comment(commentBlah);
      cancel = true;    
    }

  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}

