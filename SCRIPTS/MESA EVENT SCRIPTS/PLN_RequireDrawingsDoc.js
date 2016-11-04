//*===================================================================
//
// Script Number: 275, 313
// Script Name: PLN_RequireDrawingsDoc.js
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
    var docListResult = aa.document.getCapDocumentList(capId ,currentUserID);

    if (docListResult.getSuccess()) 
    {
      docListArray = docListResult.getOutput();
      docCount = docListArray.length;

      for(x in docListArray)
      {
        docCat = docListArray[x].getDocCategory();
        
        if (docCat == "Site Plan")
        {
          docSitePlan=true;
          docSitePlanMsg = "";
        }
        if (docCat == "Floor Plans")
        {
          docFloorPlan=true;
          docFloorPlanMsg = ""; 
        }
        if (docCat == "Landscape Plan")
        {
          docLandscapePlan=true;
          docLandscapePlanMsg = "";
        }
        if (docCat == "Building Elevations")
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

