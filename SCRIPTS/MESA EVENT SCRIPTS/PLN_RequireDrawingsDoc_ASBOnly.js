//*===================================================================
//
// Script Number: 275
// Script Name: PLN_RequireDrawingsDoc_ASBOnly.js
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

  var docSitePlan = false;
  var docFloorPlan = false;
  var docLandscapePlan = false;
  var docBuildingElevation = false;

  if ((sitePlanReviewMod) || (combinedRezoneSitePlanReview) || (specialUsePermit))
  {
    // this was the original way (works on ASUIB but not ASB)
    //var docList = aa.document.getCapDocumentList(capId ,currentUserID);

    // this is the new way (used on PMT_ZoningVerificationLetter_ASBonly script also)
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
        if (docList.get(x) != null)
        {
          //(docList.get(x).getDocCategory() == "Drawings"))
        
          if (docList.get(x).getDocCategory() == "Site Plan")
          {
            docSitePlan=true;
          }
          if (docList.get(x).getDocCategory() == "Floor Plans")
          {
            docFloorPlan=true; 
          }
          if (docList.get(x).getDocCategory() == "Landscape Plan")
          {
            docLandscapePlan=true;
          }
          if (docList.get(x).getDocCategory() == "Building Elevations")
          {
            docBuildingElevation=true; 
          }

        }
      }

    }

    if (!(docSitePlan && docFloorPlan  && docLandscapePlan && docBuildingElevation))
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

