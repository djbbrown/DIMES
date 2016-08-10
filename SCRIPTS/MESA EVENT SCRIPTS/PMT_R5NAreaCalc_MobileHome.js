/*===================================================================
// Script Number: 134
// Script Name: PMT_R5NAreaCalc_MobileHome.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		When value of “R-5N Non-Livable” is chosen for ASIT field 
//		“Classification” in ASIT subgroup “Occupancy”
//		then auto-fill the ASI field “R-5N Area” with the sum of 
//		the ASIT “Sq Ft” fields.
// Script Run Event: ASA / ASIUA
// Script Parents:
//		ASA:Permits!Residential!Mobile Home!NA
//		ASIUA:Permits!Residential!Mobile Home!NA
//		(currently can only be used on MobileHome due to configuration changes)
//		ASA:Permits!Residential!NA!NA
//		ASIUA:Permits!Residential!NA!NA
/*==================================================================*/

try
{
  loadASITable("OCCUPANCY INFO");
  var tInfo = OCCUPANCYINFO;
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
      if (tInfo[x]["Occupancy Classification"] == "R-5N Non-Livable")
      {
        totalSqFt += parseInt(tInfo[x]["Sq Ft"]);
      }
    }

    // in case they change the logic, this is more efficent
    //totalSqFt = sumASITColumn(OCCUPANCYINFO, "Sq Ft");
  }

  editAppSpecific("R-5N Area", totalSqFt);
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}

