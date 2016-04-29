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
showDebug = true;
logDebug("GIS Info for Zoning Description: " + getGISBufferInfo("Planning/Zoning", "Zoning Districts", 0, "Description"));