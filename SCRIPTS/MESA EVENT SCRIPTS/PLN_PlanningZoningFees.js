/*===================================================================
// Script Number: 86
// Script Name: PLN_PlanningZoningFees
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: On application submitttal Assess fee “Rezoning”  
//		(FP030) at application submittal when Address and Parcel are 
//		located outside of the “downtown” district (downtown layer 
//		currently exists in GIS)
//		If inside Downtown district, “Rezoning Downtown” fee should be assessed instead. 
// Script Run Event: ASA
// Script Parents:
//            ASA;Planning!Planning and Zoning!NA!NA 
/*==================================================================*/

// get parcel acreage
var acres = 0;
var capParcelResult = aa.parcel.getParcelandAttribute(capId,null);
if (capParcelResult.getSuccess())
{
	var Parcels = capParcelResult.getOutput().toArray();
	for (zz in Parcels)
	{
		acres += Parcels[zz].getParcelArea();
	}
}	
else
	logDebug("Error: Unable to access parcels");

acres = Math.ceil(acres);

if (getGISInfo("Planning/Zoning", "Zoning Districts", "DSCR") == "DC - Downtown Core"){
	// inside downtown
	addFee("PZ040","PLN_PZ","FINAL",acres,"N");
} else {
	// outside downtown
	addFee("PZ030","PLN_PZ","FINAL",acres,"N");	
}