/*===================================================================
// Script Number: 133
// Script Name: PMT_R5AreaCalc.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		When value of 
//		“R-5 Single Family/Duplex Residence/Child Care 5 or Less/Congregate Living 15 or Less”
//		or 
//		“R-5 Livable” is chosen for ASIT field “Classification” in ASIT subgroup “Occupancy"
//		Then auto-fill the ASI field “R-5 Area” with the sum of the ASIT “Sq Ft” fields.
// Script Run Event: ASA / ASIUA
// Script Parents:
//		ASA:Permits!Residential!Mobile Home!NA
//		ASIUA:Permits!Residential!Mobile Home!NA
//		ASA:Permits!Residential!NA!NA
//		ASIUA:Permits!Residential!NA!NA
/*==================================================================*/


try
{
  loadASITables();
  var tInfo = OCCUPANCYINFO;
  var rowCount = OCCUPANCYINFO.length;
  var totalSqFt = 0;

  if (tInfo == null)
  {
    //set value to zero
    totalSqFt = 0;
  }
  else
  {
    totalSqFt = sumASITColumn(OCCUPANCYINFO, "Sq Ft");
  }

  editAppSpecific("R-5 Area", totalSqFt);
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}

