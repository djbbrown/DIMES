function totalInspHours(){
	logDebug("Starting totalInspHours...");
	var totalHours = 0;
	// Get the list of inspections
	insp = aa.inspection.getInspections(capId);
	if(insp.getSuccess()){
		inspR = insp.getOutput();
		// Variables that will be needed
		var incExcArr = new Array();
		var incExc = '';
		
		// Parse multiple parameters if needed.
		if(arguments.length > 0){
			// Parameter 1 "EXCLUDE"
			incExc = arguments[0];
			// All other parameters are items to be "Included" or "Excluded"
			for(x = 1; x < arguments.length; x++){
				incExcArr.push(arguments[x]);
			}
			incExcArr = arrayToUpper(incExcArr);
		}
		
		// Do check and creat sum
		// 0 Parameters
		if(arguments.length <= 0){
			for(x in inspR){
				inspTime = inspR[x].getTimeTotal()|0;
				totalHours += inspTime;
				// logDebug(inspR[x].getTimeTotal());
			}
		}
		if(arguments.length >0){
			for(x in inspR){
				if(
					(incExc.toUpperCase() == 'INCLUDE' && exists(inspR[x].getInspectionType().toUpperCase(),incExcArr))
					|| (incExc.toUpperCase() == 'EXCLUDE' && !exists(inspR[x].getInspectionType().toUpperCase(),incExcArr))
				){
					inspTime = inspR[x].getTimeTotal()|0;
					totalHours += inspTime;
					// logDebug(inspR[x].getTimeTotal());
				}
			}
		}
	}
	logDebug("totalHours: "+totalHours);
	return totalHours;
}