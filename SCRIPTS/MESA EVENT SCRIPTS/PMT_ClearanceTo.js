 /*===================================================================
// Script Number: 215
// Script Name: PMT_ClearanceTo.js 
// Script Developer: Deanna Hoops
// Script Agency: Accela
// Script Description: set the ASIT column Clearance To based on GIS attribute
// Script Run Event: ASA, ASIUA
// Script Parents: ASA:Permits/*/*/*, ASIUA:Permits/*/*/*
/*==================================================================*/

tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
if (tagFieldArray && tagFieldArray.length > 0) {
	logDebug(tagFieldArray);
	tName = "UTILITY SERVICE INFORMATION";
	utilTable = loadASITable("UTILITY SERVICE INFORMATION");
	if (utilTable == null)  { utilTable = loadASITable("UTILITY SERVICE INFO"); tName = "UTILITY SERVICE INFO"; }
	changesMade = false;
	if (utilTable != null && utilTable.length > 0) {
		newTable = new Array();
		for (rIndex in utilTable) {
			thisRow = utilTable[rIndex];
			serviceType = "" + thisRow["Service Type"].fieldValue;
			currentValue = "" + thisRow["Clearance To"].fieldValue;
			if (currentValue != "null" && currentValue != "")
				newTable.push(thisRow);
			else {
				if (matches(serviceType, "Water Service", "Water Meter: Adapter", "Water Meter:Domestic, Water Meter:Landscaping", "Water Relocation")) {
					if (IsStrInArry("AWCP", tagFieldArray) && IsStrInArry("COMW", tagFieldArray)) { 
						// do nothing 
					}
					else {
						if (IsStrInArry("COMW", tagFieldArray)) {
								thisRow["Clearance To"].fieldValue = "City of Mesa";
								changesMade = true;
						}
					}
				}
				if (matches(serviceType, "Electric Meter: New", "Electric Meter: Relocate", "Electric Meter: Temporary", "Electric Meter: Upgrade", "Electric Service Turn On Same Day")) {
					if (IsStrInArry("COME", tagFieldArray) && IsStrInArry("SRPE", tagFieldArray)) {
						// do nothing
					}
					else {
						if (IsStrInArry("COME", tagFieldArray)) {
								thisRow["Clearance To"].fieldValue = "City of Mesa";
								changesMade = true;
						}
						if (IsStrInArry("SRPE", tagFieldArray)) {
								thisRow["Clearance To"].fieldValue = "Salt River Project";
								changesMade = true;
						}
					}
				}
				if (matches(serviceType, "Gas Meter", "Gas Relocation/Retrofit", "Gas Service and Meter", "Gas Service/Meter - Commercial", "Gas Service/Meter - Large Residential")) {
					if (IsStrInArry("COMG", tagFieldArray) && IsStrInArry("SWGA", tagFieldArray)) {
						// do nothing
					}
					else {
						if (IsStrInArry("COMG", tagFieldArray)) {
								thisRow["Clearance To"].fieldValue = "City of Mesa";
								changesMade = true;
						}
						if (IsStrInArry("SWGA", tagFieldArray)) {
								thisRow["Clearance To"].fieldValue = "Salt River Project";
								changesMade = true;
						}
					}
				}
			}
			newTable.push(thisRow);
		}
	}
	if (changesMade) {
		removeASITable(tName);
		addASITable(tName, newTable);
	}
}
