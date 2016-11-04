//*===================================================================
//
// Script Number: 275, 313
// Script Name: PLN_RequireDrawingsDoc_ASBOnly.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description:  
//		When Request Type (ASI) selection is one or more of the following: 
//		- Site Plan Review/Modification 
//		- Combined Rezone and Site Plan Review /Modification 
//		- Special Use Permit
//
//		Required the following documents:
//		- Site Plan
//		- Preliminary Grading Drainage and Utility Plan 
//		- Floor Plans
//		- Landscape Plan 
//		- Building Elevations
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//		ASB;Planning!Planning and Zoning!NA!NA.js
//		ASIUB;Planning!Planning and Zoning!NA!NA.js
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
  var docSitePlanMsg = "Site Plan<br />";
  var docFloorPlan = false;
  var docFloorPlanMsg = "Floor Plans<br />";
  var docLandscapePlan = false;
  var docLandscapePlanMsg = "Landscape Plan<br />";
  var docBuildingElevation = false;
  var docBuildingElevationMsg = "Building Elevations<br />";
  var docDrainageUtilPlan = false;
  var docDrainageUtilPlanMsg = "Preliminary Grading Drainage and Utility Plan <br />";


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
            docSitePlanMsg = "";
          }
          if (docList.get(x).getDocCategory() == "Floor Plans")
          {
            docFloorPlan=true;
            docFloorPlanMsg = ""; 
          }
          if (docList.get(x).getDocCategory() == "Landscape Plan")
          {
            docLandscapePlan=true;
            docLandscapePlanMsg = "";
          }
          if (docList.get(x).getDocCategory() == "Building Elevations")
          {
            docBuildingElevation=true; 
            docBuildingElevationMsg = "";
          }
          if (docCat == "Preliminary Grading Drainage and Utility Plan")
          {
            docDrainageUtilPlan=true; 
            docDrainageUtilPlanMsg = "";
          }

        }
      }

    }

    if (!(docSitePlan && docFloorPlan  && docLandscapePlan && docBuildingElevation))
    {
      commentBlah = "A following document(s) are required for the selected Request Type(s): <br />";
      commentBlah += docSitePlanMsg + docFloorPlanMsg + docLandscapePlanMsg + docBuildingElevationMsg;
      commentBlah += docDrainageUtilPlanMsg;
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

