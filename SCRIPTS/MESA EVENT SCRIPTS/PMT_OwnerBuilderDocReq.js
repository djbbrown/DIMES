//*===================================================================
//
// Script Number: 382
// Script Name: PMT_OwnerBuilderDocReq.js
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
    var docListResult = aa.document.getCapDocumentList(capId ,currentUserID);

    if (docListResult.getSuccess()) 
    {
      docListArray = docListResult.getOutput();
      docCount = docListArray.length;

      for(x in docListArray)
      {
        docCat = docListArray[x].getDocCategory();
        
        if (docCat == "Declaration of Intent")
        {
          docNeeded = false;
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

