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
  //mkyOutput += "prePlat: "+prePlat+" \r";
  var docCat = "";
  var docNeeded = true;

  if (prePlat)
  {
    //mkyOutput += "  Checking for documents \r";

    var docListResult = aa.document.getCapDocumentList(capId ,currentUserID);

    if (docListResult.getSuccess()) 
    {
      //mkyOutput += "  Document list loaded \r";

      docListArray = docListResult.getOutput()
      docCount = docListArray.length;
      //mkyOutput += "  docCount: "+docCount+" \r";

      for(x in docListArray)
      {
        docCat = docListArray[x].getDocCategory();
        //mkyOutput += "  doc("+x+") Category: "+docCat+" \r";

        if (docCat == "Drawings")
        {
          docNeeded = false;
        }
      }
    }

    if (docNeeded)
    {
      commentBlah = "The following document is required for Request Types of Pre-Plat: Drawings";

      //mkyOutput += "" + commentBlah + " \r";
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

