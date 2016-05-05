/*===================================================================
// Script Number: 86
// Script Name: PLN Annexation Fees
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On application submitttal Assess fee “Rezoning”  
//		(FP030) at application submittal when Address and Parcel are 
//		located outside of the “downtown” district (downtown layer 
//		currently exists in GIS)
//		If inside Downtown district, “Rezoning Downtown” fee should be assessed instead. 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Annexation!NA!NA  
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/

if (getGISInfo("Planning/Zoning", "Zoning Districts", "DSCR") == "DC - Downtown Core"){
	// inside downtown
	if (!feeExists("PZ040", "NEW", "INVOICED")) addFee("PZ040","PLN_PZ","FINAL",1,"N");
} else {
	// outside downtown
	if (!feeExists("PZ030", "NEW", "INVOICED")) addFee("PZ030","PLN_PZ","FINAL",1,"N");	
}