//*===================================================================
//
// Script Number: 68
// Script Name: PMT_ZoningVerificationLetter.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		On ASB, if the ASIT (DOC_ASIT) has any rows with the column 
//		"Document Type" set to a value of  
//		"Zoning Verification Letters - One Parcel Request" 
//		then require a document of type "Zoning Verification Letter". 
//		If the document does not exist, prevent submittal.
//
// Script Run Event: ASB, ASIUB
// Script Parents:
//              ASB;Permits/Document Retrieval/NA/NA
//		ASIUB;Permits/Document Retrieval/NA/NA
// 
//==================================================================*/


try
{
 /* loadASITable("DOCUMENT TYPES REQUESTED");
  var tInfo = DOCUMENTTYPESREQUESTED
  var tInfoCount = tInfo.length;

  var docNeeded = false;
  var docFound = false;
  var curReqDocType = "";

    showMessage = true;
    comment("The document Zoning Verification Letter is required. Please add this document and submit again.");
    cancel = true;
	*/
//  try something like this

loadASITablesBefore();

var docList= aa.env.getValue("DocumentModelList");
	if(docList ==null || docList=="")
	{
	 docList=aa.document.getDocumentListByEntity(capId.toString(),"TMP_CAP").getOutput();
	 var num = docList.size();
    }
    else
    {
	var num =docList.size();
	}
	
	var isExist=false;
	if (num>0)
	{
	   for(var i=0;i<num;i++)
	   { 
             if(docList.get(i)!=null&&docList.get(i).getDocGroup()=="PMT_DOC" && docList.get(i).getDocCategory()=="Zoning Verification Request") 
             {
              isExist=true;
              break; 
	         }
	   }
	}
   
	if(isExist!==true) 
	{
	 showMessage=true;         
     logMessage("Zoning Verification Request must be attached.");
     logDebug("Zoning Verification Request must be attached.");
     cancel=true;
	}
}


}


catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



