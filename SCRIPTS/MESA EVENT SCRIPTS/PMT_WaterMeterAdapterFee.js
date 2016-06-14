/*===================================================================
// Script Number: 178
// Script Name: Bryan de Jesus
// Script Developer: 
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
/*==================================================================*/
loadASITables();
var t = UTILITYSERVICEINFORMATION;
var serviceSize = null, meterSize = null, qtyOfMeters = 0, numAdapters = 0;
if (t == null || t.length == 0) logDebug("No utility service entries");
for (entry in t){
	if (t[entry]["Service Type"] == "Water Service"){
		serviceSize = t[entry]["Service Size"];
		meterSize = t[entry]["Meter Size"];
		qtyOfMeters = t[entry]["Quantity of Meters"];
		logDebug(serviceSize + " " + meterSize + " " + qtyOfMeters);
		if (serviceSize == 'Water 3/4"' && meterSize != 'Water 00.75 (3/4")' ||
			serviceSize == 'Water 1.0"' && meterSize != 'Water 01.0"' ||
			serviceSize == 'Water 1 1/2"' && meterSize != 'Water 01.5 (1 1/2")' ||
			serviceSize == 'Water 2.0"' && meterSize != 'Water 02.0"' ||
			serviceSize == 'Water - 4"' && meterSize != 'Water 04.0"' ||
			serviceSize == 'Water - 6"' && meterSize != 'Water 06.0"' ||
			serviceSize == 'Water - 8"' && meterSize != 'Water 08.0"' ||
			serviceSize == 'Water - 10" or 12"')
		{
			logDebug("Mismatch row " + entry);
			var newRow = new Array();
			newRow["Service Type"] = "Water Meter: Adapter";
			newRow["Service Size"] = "Water Meter Adapter A24";
			newRow["Meter Size"] = "N/A";
			newRow["Quantity of Meters"] = qtyOfMeters;
			addToASITable("UTILITY SERVICE INFORMATION", newRow);
			numAdapters++;
		}		
	}
}
logDebug("Number of adapters: " + numAdapters);
if (numAdapters === 0 && feeExists("USF040", "NEW", "INVOICED")) voidRemoveFee("USF040"); 
else {
	if (feeExists("USF040", "NEW", "INVOICED") && feeQty("USF040") != numAdapters) {
		voidRemoveFee("USF040");
		addFee("USF040", "PMT_UTL_SERV", "FINAL", numAdapters, "N");
	}
}