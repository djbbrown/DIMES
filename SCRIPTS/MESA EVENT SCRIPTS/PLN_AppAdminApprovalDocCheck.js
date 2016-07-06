//*===================================================================
//
// Script Number: 79
// Script Name: PLN_AppAdminApprovalDocCheck.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		On application submittal, require a documents of types 
//		"Good Neighbor Policy"
//		"Plan of Operation"
//		"Balloon Test Photos". 
//		If not present, block submittal and display a message
//
// Script Run Event: ASB
// Script Parents:
//             ASB:Planning/Application/Administrative Approval/NA
// 
//==================================================================*/

// making this script so it can be reused or expanded to include additional docs 

try
{
  
  var reqDoc = new Array();
  var missingDoc = new Array();
  var docList = new Array();
  var findDoc;
  var isMatch = false;

  reqDoc.push("Good Neighbor Policy");
  reqDoc.push("Plan of Operation");
  reqDoc.push("Balloon Test Photos");

  docList = getDocumentList();

  for (rD in reqDoc)
  {
    findDoc = reqDoc[rD];

    isMatch = false;

    for (dl in docList)
    {    
      var thisDoc = docList[dl];
      var docCategory = thisDoc.getDocCategory();

      if (findDoc.equals(docCategory))
      {
        isMatch = true;
      }
    }

    if (!(isMatch))
    {
      missingDoc.push(findDoc);
    }
  }

  for (mD in missingDoc)
  {
    aa.print("Missing Document: " + missingDoc[mD]);
  }

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





