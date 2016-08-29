/*===================================================================
// Script Number: 217
// Script Name: PMT_R5AreaCalc_MasterPlanParent
// Script Developer: Mike Linscheid
// Script Agency: Mesa
// Script Description: 
//		1.	Retrieve the ASIT "Occupancy Information" from the parent record.
//		2.	For any row with a value of "R-5 Livable" or "R-5N Non-Livable" for the "Occupancy Classification" column copy the row to the ASIT on the child record. If the rows already exist on the child record, delete them prior to copying those from the parent record.
//		3.	Sum the "Sq Ft" column of the rows written to the new record with an Occupancy Classification of "R-5 Livable" and store this value in the ASI field "R-5 Area". 
//		4.	Sum the "Sq Ft" column of the rows written to the new record with an Occupancy Classification of "R-5N Non-Livable" and store this value in the ASI field "R-5N Area".
//		5.	Store the sum of both Occupancy Classifications in the "Total Sq Ft" ASI field. 
// Script Run Event: ASA 
/*==================================================================*/

try {
	updateClassifications = ["R-5 Livable","R-5N Non-Livable"]
	pList = getParents("Permits/Master Plan/NA/NA")
	
	if (pList.length > 0) {
		parentId = pList[0]
		masterPlanASIT = loadASITable("MASTER PLAN INFORMATION")
		occInfoASIT = loadASITable("OCCUPANCY  INFORMATION")
		newOccInfoASIT = []
		r5_sum = 0
		r5n_sum = 0
		for (r in masterPlanASIT){
			thisR5 = parseFloat(masterPlanASIT[r]["Livable SqFt"].fieldValue)
			thisR5N = parseFloat(masterPlanASIT[r]["Non-Livable SqFt"].fieldValue)
			r5_sum += (isNaN(thisR5)) ? 0 : thisR5
			r5n_sum += (isNaN(thisR5N)) ? 0 : thisR5N
		}
		
		wasR5Updated = false
		wasR5NUpdated = false
		for( r in occInfoASIT ){
			newRow = []
			for (c in occInfoASIT[r] ){
				if (c == "Sq Ft" && (""+occInfoASIT[r]["Occupancy Classification"].fieldValue) == "R-5 Livable") {
					newRow[c] =  new asiTableValObj(c, r5_sum,"N")
					wasR5Updated = true
				}
				else if (c == "Sq Ft" && (""+occInfoASIT[r]["Occupancy Classification"].fieldValue) == "R-5N Non-Livable") {
					newRow[c] =  new asiTableValObj(c, r5n_sum,"N")
					wasR5NUpdated = true
				}
				else
					newRow[c] =  new asiTableValObj(c, occInfoASIT[r][c].fieldValue,"N")
			}
			newOccInfoASIT.push(newRow)
		}
		
		if (!wasR5Updated) {
			newRow = []
			newRow["Occupancy Classification"] =  new asiTableValObj("Occupancy Classification", "R-5 Livable","N")
			newRow["Type of Construction"] =  new asiTableValObj("Type of Construction", "VB Any Material (0 HR)","N")
			newRow["Sq Ft"] =  new asiTableValObj("Sq Ft", ""+r5_sum,"N")
			newRow["Occupant Load"] =  new asiTableValObj("Occupant Load", "","N")
			newOccInfoASIT.push(newRow)
		}
		if (!wasR5NUpdated) {
			newRow = []
			newRow["Occupancy Classification"] =  new asiTableValObj("Occupancy Classification", "R-5N Non-Livable","N")
			newRow["Type of Construction"] =  new asiTableValObj("Type of Construction", "VB Any Material (0 HR)","N")
			newRow["Sq Ft"] =  new asiTableValObj("Sq Ft", ""+r5n_sum,"N")
			newRow["Occupant Load"] =  new asiTableValObj("Occupant Load", "","N")
			newOccInfoASIT.push(newRow)
		}
		
		editAppSpecific("R-5 Area",r5_sum)
		editAppSpecific("R-5N Area",r5n_sum)
		editAppSpecific("Total Sq Ft",r5_sum+r5n_sum)
		
		removeASITable("OCCUPANCY  INFORMATION");
		addASITable("OCCUPANCY  INFORMATION",newOccInfoASIT);
	}
}
catch (err){
  logDebug("A JavaScript Error occured: " + err.message);
}

/* Old - replaced due to changelog #57

try {
	updateClassifications = ["R-5 Livable","R-5N Non-Livable"]
	pList = getParents("Permits/Master Plan/NA/NA")
	
	if (pList.length > 0) {
		parentId = pList[0]
		parentASIT = loadASITable("OCCUPANCY  INFORMATION",parentId)
		childASIT = loadASITable("OCCUPANCY  INFORMATION")
		newASIT = []
		for( r in childASIT ){
			if (updateClassifications.indexOf(""+childASIT[r]["Occupancy Classification"].fieldValue) >= 0) continue
			newRow = []
			for (c in childASIT[r] ){
				newRow[c] =  new asiTableValObj(c, childASIT[r][c].fieldValue,"N")
			}
			newASIT.push(newRow)
		}
		r5_sum = 0
		r5n_sum = 0
		for( r in parentASIT ){
			if (updateClassifications.indexOf(""+parentASIT[r]["Occupancy Classification"].fieldValue) < 0) continue
			if (""+parentASIT[r]["Occupancy Classification"].fieldValue == "R-5 Livable") {
				thisR5 = parseFloat(parentASIT[r]["Sq Ft"].fieldValue)
				if (!isNaN(thisR5)) r5_sum += thisR5
			}
			if (""+parentASIT[r]["Occupancy Classification"].fieldValue == "R-5N Non-Livable") {
				thisR5N = parseFloat(parentASIT[r]["Sq Ft"].fieldValue)
				if (!isNaN(thisR5N)) r5n_sum += thisR5N
			}
			newRow = []
			for (c in parentASIT[r] ){
				newRow[c] =  new asiTableValObj(c, parentASIT[r][c].fieldValue,"N")
			}
			newASIT.push(newRow)
		}
		
		editAppSpecific("R-5 Area",r5_sum)
		editAppSpecific("R-5N Area",r5n_sum)
		editAppSpecific("Total Sq Ft",r5_sum+r5n_sum)
		
		removeASITable("OCCUPANCY  INFORMATION");
		addASITable("OCCUPANCY  INFORMATION",newASIT);
	}
}
catch (err){
  logDebug("A JavaScript Error occured: " + err.message);
}*/
