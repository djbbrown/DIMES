/*===================================================================
// Script Number: 178
// Script Name: PMT_WaterMeterAdapterFee.js
// Script Developer: Bryan de Jesus
// Script Agency: Woolpert
// Script Description: When Water Service Size does not equal Meter Size (for Water only). This fee is for all PMTs EXCEPT Master Plan. Automatically add the Water Meter Adapter fee
// Script Run Event: ASA, ASIUA
// Script Parents:
//          ASA;Permits!Commercial!NA!NA
//			ASIUA;Permits!Commercial!NA!NA
//			ASA;Permits!Residential!NA!NA
//			ASIUA;Permits!Residential!NA!NA
//			ASA;Permits!Residential!Mobile Home!NA
//			ASIUA;Permits!Residential!Mobile Home!NA
// 
// Update to fire on workflow:
// Permit Issuance/Ready to Issue tracker 93/97/98
// Exclude Master Plan
/*==================================================================*/
// showDebug = true;
try {
	var t = null, isMobileHome = false;
	if (typeof(UTILITYSERVICEINFORMATION) == "object") t=UTILITYSERVICEINFORMATION;
	else if (typeof(UTILITYSERVICEINFO) == "object") { 
		t=UTILITYSERVICEINFO; 
		isMobileHome = true;
	}
//	var t = loadASITable("UTILITY SERVICE INFORMATION"), isMobileHome = false;
//	if (!t) {
//		t = loadASITable("UTILITY SERVICE INFO");
//		isMobileHome = true;
//	}

	// Variables
	var serviceSize = null, meterSize = null, qtyOfMeters = 0, numAdapters = 0, numExistingAdapters = 0, rows = [], allNumAdapters = 0, countExAdapters = 0;
	if (!t){
		logDebug("Utility Service Information table not found.");
	} else {
		if (t.length == 0) logDebug("No utility service entries.");
		else {
			logDebug(t.length);
			// get new number of adapters and store non-adapter rows
			for (var entry in t){
				//if (t[entry]["Service Type"] == "Water Service"){ 	//Changed 9/14/16 due to Lauren's SharePoint comment on item 178
				if ((matches(""+t[entry]["Service Type"], "Water Meter: Domestic", "Water Meter: Landscaping") && !appMatch("Permits/Residential/NA/NA"))) {	//Updated to not include res record based on Go Live Issue 189
					serviceSize = t[entry]["Service Size"];
					meterSize = t[entry]["Meter Size"];
					qtyOfMeters = t[entry]["Qty of Meters"];
					logDebug(serviceSize + " " + meterSize + " " + qtyOfMeters);
					if (
							(serviceSize == 'Water 3/4"' && meterSize != 'Water 00.75 (3/4")')
							|| (serviceSize == 'Water 3/4' && meterSize != 'Water 00.75 (3/4')
							// 1 Inch Comparison
							|| (serviceSize == 'Water 1.0"' && meterSize != 'Water 01.0"')
							|| (serviceSize == 'Water 1.0' && meterSize != 'Water 01.0')
							// 1.5 Inch Comparison
							|| (serviceSize == 'Water 1 1/2"' && meterSize != 'Water 01.5 (1 1/2")')
							|| (serviceSize == 'Water 1 1/2' && meterSize != 'Water 01.5 (1 1/2')
							// 2.0 Inch Comparison
							|| (serviceSize == 'Water 2.0"' && meterSize != 'Water 02.0"')
							|| (serviceSize == 'Water 2.0' && meterSize != 'Water 02.0')
							// 4.0 Inch Comparison
							|| (serviceSize == 'Water - 4"' && meterSize != 'Water 04.0"')
							|| (serviceSize == 'Water - 4' && meterSize != 'Water 04.0')
							// 6.0 Inch Comparison
							|| (serviceSize == 'Water - 6"' && meterSize != 'Water 06.0"')
							|| (serviceSize == 'Water - 6' && meterSize != 'Water 06.0')
							// 8.0 Inch Comparison
							|| (serviceSize == 'Water - 8"' && meterSize != 'Water 08.0"')
							|| (serviceSize == 'Water - 8' && meterSize != 'Water 08.0')
							// 10.0 Inch Comparison
							|| serviceSize == 'Water - 10" or 12"' 
							|| serviceSize == 'Water - 10'
					)
					{
						logDebug("Mismatch row " + entry);
//						var newRow = new Array();
//						newRow["Service Type"] = "Water Meter: Adapter";
//						newRow["Service Size"] = "Water Meter Adapter A24";
//						newRow["Meter Size"] = "N/A";
//						newRow["Qty of Meters"] = qtyOfMeters;
//						if (isMobileHome) addToASITable("UTILITY SERVICE INFO", newRow);
//						else addToASITable("UTILITY SERVICE INFORMATION", newRow);
						numAdapters++;
						allNumAdapters += Number(qtyOfMeters);
						logDebug("Q: "+qtyOfMeters);
					}	
					rows.push(t[entry]);
				} else if (t[entry]["Service Type"] == "Water Meter: Adapter"){
					numExistingAdapters++;
					countExAdapters += Number(qtyOfMeters);
				}
				else rows.push(t[entry]); 
			}
			logDebug("allNumAdapters:"+allNumAdapters);
			logDebug("countExAdapters:"+countExAdapters);
			logDebug()
			//if (numExistingAdapters != numAdapters) { // Removed for an actual count of adapters
			if (allNumAdapters != countExAdapters) {
				// reload table without adapter entries
				if (isMobileHome) removeASITable("UTILITY SERVICE INFO");
				else removeASITable("UTILITY SERVICE INFORMATION");
				for (var exRow in rows){
					if (isMobileHome) addToASITable("UTILITY SERVICE INFO", rows[exRow]);
					else addToASITable("UTILITY SERVICE INFORMATION", rows[exRow]);
				}
				// add adapters // Not sure why a new row is often added, we may want to look at updating an existing if exists.
				for (var a=0; a<1; a++){
					var newRow = new Array();
					newRow["Service Type"] = new asiTableValObj("Service Type", "Water Meter: Adapter", "");
					newRow["Service Size"] = new asiTableValObj("Service Size", "Water Meter Adapter A24", "N");
					newRow["Meter Size"] = new asiTableValObj("Meter Size", "N/A", "N");
					// newRow["Qty of Meters"] = new asiTableValObj("Qty of Meters", "" + qtyOfMeters, "N");
					newRow["Qty of Meters"] = new asiTableValObj("Qty of Meters", "" + allNumAdapters, "N");
					newRow["BTU Load"] =  new asiTableValObj("BTU Load", "", "N");
					newRow["Clearance To"] = new asiTableValObj("Clearance To", "", "N");
					newRow["Clearance Date"] = new asiTableValObj("Clearance Date", "", "N");
					newRow["Warranty Status"] = new asiTableValObj("Warranty Status", "", "N");
					newRow["Comments"] = new asiTableValObj("Comments", "", "N");
					if (isMobileHome) addToASITable("UTILITY SERVICE INFO", newRow);
					else addToASITable("UTILITY SERVICE INFORMATION", newRow);				
				}
				numAdapters = allNumAdapters;
				//logDebug("Number of adapters: " + numAdapters);
				//turning the fee assessment part off since this fee is disabled.
				/*if (numAdapters === 0 && feeExists("USF040", "NEW", "INVOICED")) voidRemoveFee("USF040"); 
				else {
					if (!feeExists("USF040", "NEW", "INVOICED") && numAdapters > 0)
						addFee("USF040", "PMT_UTL_SERV", "FINAL", numAdapters, "N");
					else if (feeExists("USF040", "NEW", "INVOICED") && feeQty("USF040") != numAdapters) {
						voidRemoveFee("USF040");
						addFee("USF040", "PMT_UTL_SERV", "FINAL", numAdapters, "N");
					}
				}
				*/
			} else logDebug("Number of adapters required has not changed.");
		}
	}	
} catch (err){
	logDebug("A JavaScript Error occured: " + err.message);
}