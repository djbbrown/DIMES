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
      commentBlah = "For request types with Pre-Plat a Drawings document is required";
      showMessage = true;
      comment(commentBlah);
      cancel = true;    
    }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}

