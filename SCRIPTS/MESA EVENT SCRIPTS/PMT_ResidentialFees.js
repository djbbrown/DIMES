/*===================================================================
// Script Number: 
// Script Name: PMT_ResidentialFees.js
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: Residential Fees 
// Script Run Event: Application Submit After
// Script Parents:
//		ASA;Permits!Residential!~!~
//             
/*==================================================================*/

var typeOfWork = (AInfo["Type of Work"] != undefined) ? AInfo["Type of Work"] : AInfo["Type of work"]

//RES380 -- Charged at Stauts
if(wfTask == "Plans Coordination" && wfStatus=="Ready to Issue") {
	if (typeOfWork && typeOfWork =='Model Home Complex') {
		if (feeExists("RES380", "NEW", "INVOICED")) voidRemoveFee("RES380");
		addFee("RES380", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='Construction Trailer' && feeExists("RES380", "NEW", "INVOICED")){
		voidRemoveFee("RES380");
	}
}
// Pool
if(wfTask == "Plans Coordination" && wfStatus=="Ready to Issue") {
	if (typeOfWork && typeOfWork =='Swimming Pool') {
		if (feeExists("RES270", "NEW", "INVOICED")) voidRemoveFee("RES270");
		addFee("RES270", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='Swimming Pool' && feeExists("RES270", "NEW", "INVOICED")){
		voidRemoveFee("RES270");
	}
}
if(wfTask == "Plans Coordination" && wfStatus=="Ready to Issue") {
	if (typeOfWork && typeOfWork =='SPA') {
		if (feeExists("RES280", "NEW", "INVOICED")) voidRemoveFee("RES280");
		addFee("RES280", "PMT_RES","FINAL", 1, "N");
	}
	if(typeOfWork && typeOfWork !='SPA' && feeExists("RES280", "NEW", "INVOICED")){
		voidRemoveFee("RES280");
	}
}