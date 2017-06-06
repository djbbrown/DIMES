//*===================================================================
//
// Script Number: 312
// Script Name: PLN_PrePlatReqDoc_ASBOnly.js
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

  if (prePlat == "CHECKED")
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
        if((docList.get(x) != null)
          && (docList.get(x).getDocCategory() == "Pre-Plat")) 
        {
          docNeeded = false;
          break; 
        }
      }

    }

    if (docNeeded)
    {
	  if (publicUser) {
		  showDebug=false;
	  }
      commentBlah = "For request types with Pre-Plat a Pre-Plat document is required";
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

