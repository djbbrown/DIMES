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
//		ASA:Permits!Residential!NA!NA
//		ASIUA:Permits!Residential!NA!NA
//		(cannot be used on Mobile Home due to configuration changes)
//		ASA:Permits!Residential!Mobile Home!NA
//		ASIUA:Permits!Residential!Mobile Home!NA
/*==================================================================*/


try
{
  loadASITable("OCCUPANCYINFORMATION");
  var tInfo = OCCUPANCYINFORMATION;
  var rowCount = 0;
  var totalSqFt = 0;

  if (tInfo == null)
  {
    //set value to zero
    totalSqFt = 0;
  }
  else
  {
    rowCount = OCCUPANCYINFO.length;

    // loop and sum
    for (x=0;x<=(rowCount-1);x++)
    {
      if ((tInfo[x]["Occupancy Classification"] == "R-3 Single Family/Duplex Residence/Child Care 5 or Less/Congregate Living 15 or Less") ||
         (tInfo[x]["Occupancy Classification"] == "R-5 Livable"))
      {
        totalSqFt += parseInt(tInfo[x]["Sq Ft"]);
      }
    }

    // in case they change the logic
    //totalSqFt = sumASITColumn(OCCUPANCYINFO, "Sq Ft");
  }

  editAppSpecific("R-5 Area", totalSqFt);
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}

