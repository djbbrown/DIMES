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
  logDebug(AInfo['Parent TTC Permit #'].toUpperCase());
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
    if(appTypeString == 'Transportation/Temporary Traffic Control/Modification/NA'){
		// get that record's capId so that the parent can be updated.
		var uCapId = aa.cap.getCapID(AInfo['Parent TTC Permit #'].toUpperCase()).getOutput();
	}
	else {
		var uCapId = capId
	}
    // Roadway/Alley
    trar = getAppSpecific("Total Roadway/Alley Restriction",uCapId); // Get current value
	logDebug("Total Roadway/Alley Restriction Current: "+trar);
	trar = parseInt(trar) + parseInt(RoadAlley|0);
    editAppSpecific("Total Roadway/Alley Restriction",trar,uCapId);
    logDebug("Updating 'Total Roadway/Alley Restriction' to "+trar);
    // Sidewalk Closure
    sc = getAppSpecific("Sidewalk Closure",uCapId); // Get current value
	logDebug("Sidewalk Closure Current: "+sc);
	sc = parseInt(sc) + parseInt(Sidewalk|0);
    editAppSpecific("Sidewalk Closure",sc,uCapId);
    logDebug("Updating 'Sidewalk Closure' to "+sc);
    // Left Turn Prohibition - Signalized Intersection
    ltpsi = getAppSpecific("Left Turn Prohibition - Signalized Intersection",uCapId); // Get current value
	logDebug("Left Turn Prohibition - Signalized Intersection Current: "+ltpsi);
	ltpsi = parseInt(ltpsi) + parseInt(LeftTurn|0);
    editAppSpecific("Left Turn Prohibition - Signalized Intersection",ltpsi,uCapId);
    logDebug("Updating 'Left Turn Prohibition - Signalized Intersection' to "+ltpsi);
    // Arterial Road Closure
    arc = getAppSpecific("Arterial Road Closure",uCapId); // Get current value
	logDebug("Arterial Road Closure Current: "+arc);
	arc = parseInt(arc) + parseInt(Arterial|0);
    editAppSpecific("Arterial Road Closure",arc ,uCapId);
    logDebug("Updating 'Arterial Road Closure' to "+arc);
	//*/
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