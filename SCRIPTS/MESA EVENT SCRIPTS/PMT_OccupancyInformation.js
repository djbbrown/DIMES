/*===================================================================
// Script Number: 
// Script Name: 
// Script Developer: 
// Script Agency: (Mesa/Accela/Woolpert)
// Script Description: 
// Script Run Event: 
// Script Parents:
//            ASA;Planning!Group Home-Daycare!Application!NA  (example)
//            ASA;Licensing!General!ParkAndSwap!NA  (example)
===================================================================*/

try
{
	// Get the current record type and make sure that we can continue
	if(appTypeString == "Permits/Residential/NA/NA"){
		// Load the ASIT for the current record
		//childASIT = loadASITables(capId);
		cOccInfo = OCCUPANCYINFORMATION;
		cOccCount = cOccInfo.length;
		// Get the parent record type, just make sure that there is one.
		parentRec = aa.cap.getProjectParents(capId,1).getOutput();
		//aa.print("parentRec: "+parentRec);
		for(x in parentRec){
			// Check the Record Type
			//aa.print(parentRec[x]);
			parentCapType = parentRec[x].getCapType();
			pCapId = parentRec[x].getCapID();
			if (parentCapType == "Permits/Master Plan/NA/NA"){
				// get the ASI Table Loaded
				occClass=['R-5 Livable','R-5N Non-Livable'];
				loadASITables(pCapId); // pCapId can be used here
				var tInfo = OCCUPANCYINFORMATION;
				var rowCount = OCCUPANCYINFORMATION.length;
				if( rowCount > 0){
					// Can I just delete any R-5 or R-5N records from this location
					// so that all are going to be replaced.
					
					// Loop through and copy the ASIT
					for(x in tInfo){
						pOccClass = tInfo[x]["Occupancy Classification"]
						if(exists(pOccClass,occClass))
						{
							// We only want to to look at removing child rows when there
							// are child rows that could be removed
							if(cOccCount > 0){
								for(y in cOccInfo){
									// Delete the row if it already exists
									if(pOccClass.toString() == cOccInfo[y]["Occupancy Classification"].toString())
									{
										aa.print("Delete row: "+y);
										cOccInfo.splice(y,1); // Delete the Row, currently this is working.
									}
								}
								aa.print("End cOccInfo: "+cOccInfo.length);
							}
							// Create and populate the new row with the data from the other table
							// this only works due to the fact that the ASIT are the same.
							cOccInfo.push(tInfo[x]);
						}
					}
				}
			}
			aa.print("Print table");
			for(a in cOccInfo){
				aa.print("Row: "+a);
				for(b in cOccInfo[a]){
					aa.print(b+":"+cOccInfo[a][b])
				}
			}
			aa.print("Print table");
			// Only after doing a full update do you want to delete the ASIT
			// and reload the ASIT with the new values.
			removeASITable("OCCUPANCY INFORMATION"); 
			addASITable("OCCUPANCY INFORMATION",cOccInfo);
		}	
	}
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}