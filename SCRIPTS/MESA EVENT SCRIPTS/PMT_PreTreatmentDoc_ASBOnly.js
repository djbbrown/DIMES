/*===================================================================*/
// Script Number: 208b
// Script Name: PMT_PreTreatmentDoc.js
// Script Description: If ASI field Do you need a Grease Trap or Sane/Oil Interceptor is set to a value of Yes then 
// a PreTreatment document is required 
// Script Run Event: ASB, ASIB
// Script Parents: ASB;Permits/Commercial/NA/NA
// Testing record:  PMT16-00427
// Version   |Date      |Engineer         |Details
//  1.0      |11/17/16  |Steve Veloudos   |Initial Release
//  2.0      |12/2/16   |Kevin Gurney     |Changed to match other similar ASB document requirement scripts
//  3.0      |7/10/17   |Steve Allred     |Corrected spelling error in commentBlah
/*==================================================================*/

try {
	var GreaseTrapFlag = 0;
    var PreTreatDocFlag = 0;
	var GTrapSoil = AInfo["Is your project an Industrial, Commercial, Manufacturing, Automotive or Restaurant?"];
	var docCat = "";
	var docNeeded = true;

	if (GTrapSoil == "Yes")
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
          && (docList.get(x).getDocCategory() == "Industrial Pretreatment Form")) 
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
	  commentBlah = "For a project that is Industrial, Commercial, Manufacturing, Automotive or Restaurant a Industrial Pretreatment Form document is required";
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
