//*===================================================================
// Script Number: 067
// Script Name: PMT_DocumentRetrievalFee.js 
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		If the ASI field "Documents Requested For" has a value of "Commercial Purpose", 
//              assess and invoice the "Records Request Fee" (fee code = DOC050, fee schedule = PMT_DOC).
//              If the ASI field does not have the value of "Commercial Purposes" and the fee 
//              exists on the record, remove it.
// Script Run Event: ASA
// Script Parents: 
//		ASA;Permits/Document Retrieval/NA/NA
//		ASIUA;Permits/Document Retrieval/NA/NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |06/24/16  |Brian O'Dell     |Initial Release
//  1.1      |07/26/16  |Steve Veloudos   |Adj Commercial Purposes
//  1.2      |09/06/16  |Brian O'Dell     |Updated Invoicing and added ASIUA reference
//==================================================================*/


var purpose = AInfo["Documents Requested For"];
var exists = feeExists("DOC050");

if (purpose == "Commercial Purpose")
{
  // syntax: addFee(fcode,fsched,fperiod,fqty,finvoice)
  addFee("DOC050","PMT_DOC", "FINAL",  1, "Y");
}
else
{
  if (exists)
  {
    // syntax: removeFee(fcode,fperiod)
    removeFee("DOC050","FINAL");
  }
  
}

