/*===================================================================
// Script Number: 217
// Script Name: PMT_R5AreaCalc_MasterPlanParent
// Script Developer: Mike Linscheid
// Script Agency: Mesa
// Script Description: 
//		1.	Retrieve the ASIT “Occupancy Information” from the parent record.
//		2.	For any row with a value of “R-5 Livable” or “R-5N Non-Livable” for the “Occupancy Classification” column copy the row to the ASIT on the child record. If the rows already exist on the child record, delete them prior to copying those from the parent record.
//		3.	Sum the “Sq Ft” column of the rows written to the new record with an Occupancy Classification of “R-5 Livable” and store this value in the ASI field “R-5 Area”. 
//		4.	Sum the “Sq Ft” column of the rows written to the new record with an Occupancy Classification of “R-5N Non-Livable” and store this value in the ASI field “R-5N Area”.
//		5.	Store the sum of both Occupancy Classifications in the “Total Sq Ft” ASI field. 
// Script Run Event: ASA 
/*==================================================================*/


try {
	updateClassifications = ["R-5 Livable","R-5N Non-Livable"]
	pList = getParents("Permits/Master Plan/NA/NA")
	
	if (pList.length > 0) {
		parentId = pList[0]
		parentASIT = loadASITable("OCCUPANCY  INFORMATION",parentId)
		childASIT = loadASITable("OCCUPANCY  INFORMATION",parentId)
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
			if (""+parentASIT[r]["Occupancy Classification"].fieldValue == "R-5 Livable") r5_sum += parseFloat(parentASIT[r]["Sq Ft"].fieldValue)
			if (""+parentASIT[r]["Occupancy Classification"].fieldValue == "R-5N Non-Livable") r5n_sum += parseFloat(parentASIT[r]["Sq Ft"].fieldValue)
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
}
