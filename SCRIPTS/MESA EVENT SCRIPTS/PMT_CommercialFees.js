/*===================================================================
// Script Number: 
// Script Name: Commercial Fees
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: Application Submit After
// Script Parents:
//		ASA;Permits!Commercial!~!~
//             
/*==================================================================*/
var classification = AInfo["Classification Type"];
if (classification && classification =='Construction Trailer') {
	if (feeExists("COM440", "NEW", "INVOICED")) voidRemoveFee("COM440");
	addFee("COM440", "PMT_COM", "FINAL", 1, "N");
}
if(classification && classification !='Construction Trailer' && feeExists("COM440", "NEW", "INVOICED")){
	voidRemoveFee("COM440");
}