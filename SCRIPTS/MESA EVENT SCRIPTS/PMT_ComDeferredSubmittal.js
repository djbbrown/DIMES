/*===================================================================
// Script Number: 
// Script Name: Deffered Submittal Fee Calculation COM260
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
// Script Run Event: Application Submit After
// Script Parents:
//		WTUA;Permits!Commercial!~!~         
/*==================================================================*/
try{
	if(wfTask == "Plans Coordination" && wfStatus == "Ready to Issue"){
		// Going to add an ASIT column across an entire ASIT table.
		var tmpTable;
		tmpTable = loadASITable("DEFERRED SUBMITTAL INFORMATION");
		var tempSum = 0;
	
		for(var rowIndex in tmpTable){
			thisRow = tmpTable[rowIndex];
			if (!isNaN(parseFloat(thisRow["Number of Deferred Submittals"].fieldValue)))
				tempSum = tempSum + parseFloat(thisRow["Number of Deferred Submittals"].fieldValue);	
		}
	
		// Now that the number of Deferred items has been established I can now
		// go through the action of charging the fee.
		if(tempSum == 0){
			removeFee("COM260","FINAL");
		}
		else {
			updateFee("COM260","PMT_COM", "FINAL",  tempSum, "N");
		}	
	}
}
catch (err) {
	aa.print("A JavaScript Error occurred: " + err.message);
}