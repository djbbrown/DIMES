//*===================================================================
//
// Script Number: 382
// Script Name: PMT_OwnerBuilderDocReq_ASBOnly.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		Make these documents required when "Pre-Plat" is checked 
//		in the General ASI subgroup:
//		1) Declaration of Intent
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//		ASB;Permits!Online!NA!NA.js
//		ASIUB;Permits!Online!NA!NA.js
// 
//==================================================================*/


try
{
  
  var isOwnerBuilder = AInfo["Are You the Owner/Builder?"];
  var docCat = "";
  var docNeeded = true;

  if (isOwnerBuilder == "Yes")
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
          && (docList.get(x).getDocCategory() == "Declaration of Intent")) 
        {
          docNeeded = false;
          break; 
        }
      }

    }

    if (docNeeded)
    {
      commentBlah = "For request types where Owner/Builder is Yes a Declaration of Intent document is required";
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

