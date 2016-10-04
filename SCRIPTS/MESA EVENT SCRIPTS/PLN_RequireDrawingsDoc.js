//*===================================================================
//
// Script Number: 275
// Script Name: PLN_RequireDrawingsDoc.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		Make Drawings required when Request Type (ASI) selection is one or more of the following: 
//		- Site Plan Review/Modification 
//		- Combined Rezone and Site Plan Review /Modification 
//		- Special Use Permit
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//		ASB;Planning!Planning and Zoning!NA!NA.js
//		ASIUB;Planning!Planning and Zoning!NA!NA.js
// 
//		NOTE: check 312 PMT_RequireDrawing and PMT_RequireDrawings_ASBOnly
//		if criteria on this script change. Both scripts require Drawings
//		document on Planing and Zoning record type
//
//==================================================================*/


try
{
  
  var sitePlanReviewMod = AInfo["Site Plan Review/Modification"];
  var combinedRezoneSitePlanReview = AInfo["Combined Rezone and Site Plan Review /Modification"];
  var specialUsePermit = AInfo["Special Use Permit"];
  var docCat = "";
  var docNeeded = true;

  if ((sitePlanReviewMod) || (combinedRezoneSitePlanReview) || (specialUsePermit))
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
      commentBlah = "A Drawings document is required for the selected Request Type(s)";
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
