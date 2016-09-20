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
//		ASB;Planning!Admin Review!NA!NA.js
//		ASIUB;Planning!Admin Review!NA!NA.js
// 
//==================================================================*/

try
{
  
  var prePlat = AInfo["Pre-Plat"];
  var docCat = "";
  var docNeeded = true;

  if (prePlat)
  {
    // this was the original way (works on ASUIB but not ASB)
    //var docListResult = aa.document.getCapDocumentList(capId ,currentUserID);

    // this is the new way (used on PMT_ZoningVerificationLetter_ASBonly script also)
    var docListResult = aa.env.getValue("DocumentModelList");
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

