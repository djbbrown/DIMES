/*===================================================================
// Script Number: 143
// Script Name: a.	PMT_assessFeeRDIF140OrRDIF150.js
// Script Developer: Chris Godwin
// Script Agency: Woolpert
// Script Description: Assess "Parks - Single Family Detached/Mobile Home (on plotted land) Impact Fee" when ASI "Park" equals "Yes" and ASI "Proposed Use" equals “Mobile Home – Platted Land” or “Park Model – Platted Land” and ASI "Type of Work" equals "New Mobile Home".
// Script Run Event: ASA, ASIUA
// Script Parents:
//            ASIUA;Permits!Residential!Mobile Home!NA
//            ASA;Permits!Residential!Mobile Home!NA
/*==================================================================*/

if(matches(AInfo["Park"], "Yes", "Y") && matches(AInfo["Proposed Use"], "Mobile Home – Platted Land", "Park Model – Platted Land") && matches(AInfo["Type of Work"], "New Mobile Home")){
	if(!feeExists("RDIF140", "NEW", "INVOICED")) addFee("RDIF140","PMT_RDIF","FINAL",1,"N");
	if(feeExists("RDIF150", "NEW", "INVOICED")) voidRemoveFee("RDIF150");
}else if(matches(AInfo["Park"], "Yes", "Y") && matches(AInfo["Proposed Use"], "Mobile Home – Park", "Park Model – Park") && matches(AInfo["Type of Work"], "New Park Model")){
	if(!feeExists("RDIF150", "NEW", "INVOICED")) addFee("RDIF150","PMT_RDIF","FINAL",1,"N");
	if(feeExists("RDIF140", "NEW", "INVOICED")) voidRemoveFee("RDIF140");
}else{
	if(feeExists("RDIF140", "NEW", "INVOICED")) voidRemoveFee("RDIF140");
	if(feeExists("RDIF150", "NEW", "INVOICED")) voidRemoveFee("RDIF150");
}