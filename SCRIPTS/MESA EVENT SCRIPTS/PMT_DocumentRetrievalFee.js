//*===================================================================
//
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
//              Permits/Document Retrieval/NA/NA
// 
//==================================================================*/

var purpose = AInfo["Documents Requested For"];
var exists = feeExists("DOC050");

if (purpose == "Commercial Purposes Only")
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

