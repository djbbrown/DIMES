//*===================================================================
// Script Number: 287
// Script Name: TCC_DaysRestricted
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//		ASA:Transportation/*/*/*
//		ASIUA;Transportation/*/*/*
//==================================================================*/

try
{
  loadASITables();
  var tInfo = DURATIONINFORMATION;
  var rowCount = DURATIONINFORMATION.length;
  var durationDays = 0;
  var x = 0;
  // Dropdown values
  var RoadAlley = 0, Sidewalk = 0, LeftTurn = 0, Arterial = 0, NoRestriction = 0, Block = 0;
  // Get the row count
  if (rowCount > 0)
  {
	  // Loop through each of the rows getting the "" and creating a sum.
    for (x=0;x<rowCount;x++)
    {
      // durationDays = durationDays + parseInt(tInfo[x]["Days Restricted"]);
    	
      if(tInfo[x]["Restriction Type"] == "Roadway/Alley Restriction"){
    	  RoadAlley += parseInt(tInfo[x]["Days Restricted"]);
      }
      else if(tInfo[x]["Restriction Type"] == "Sidewalk Closure"){
    	  Sidewalk += parseInt(tInfo[x]["Days Restricted"]);
      }
      else if(tInfo[x]["Restriction Type"] == "Left Turn Prohibition - Signalized Intersection"){
    	  LeftTurn += parseInt(tInfo[x]["Days Restricted"]);
      }
      else if(tInfo[x]["Restriction Type"] == "Arterial Road Closure"){
    	  Arterial += parseInt(tInfo[x]["Days Restricted"]);
      }
      else if(tInfo[x]["Restriction Type"] == "No Restrictions"){
    	  NoRestriction += parseInt(tInfo[x]["Days Restricted"]);
      }
      else if(tInfo[x]["Restriction Type"] == "Block Party"){
    	  Block += parseInt(tInfo[x]["Days Restricted"]);
      }
    }
    
    // Roadway/Alley
    editAppSpecific("Total Roadway/Alley Restriction",parseInt(RoadAlley|0),capId);
    logDebug("Updating 'Total Roadway/Alley Restriction' to "+parseInt(RoadAlley|0));
    // Sidewalk Closure
    editAppSpecific("Sidewalk Closure",parseInt(Sidewalk|0),capId);
    logDebug("Updating 'Sidewalk Closure' to "+parseInt(Sidewalk|0));
    // Left Turn Prohibition - Signalized Intersection
    editAppSpecific("Left Turn Prohibition - Signalized Intersection",parseInt(LeftTurn|0),capId);
    logDebug("Updating 'Left Turn Prohibition - Signalized Intersection' to "+parseInt(LeftTurn|0));
    // Arterial Road Closure
    editAppSpecific("Arterial Road Closure",parseInt(Arterial|0),capId);
    logDebug("Updating 'Arterial Road Closure' to "+parseInt(Arterial|0));
    // No Restrictions
    // editAppSpecific("No Restrictions",parseInt(NoRestriction|0),capId);
    // Block Party
    // editAppSpecific("Block Party",parseInt(Block|0),capId);
    
    // editAppSpecific("Total Days Restricted",parseInt(durationDays),capId);
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}