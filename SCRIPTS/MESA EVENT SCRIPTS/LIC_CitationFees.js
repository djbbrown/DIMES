	/*===================================================================
	// Script Number: 200
	// Script Name: 200 Lic Citation Fees
	// Script Developer: Kevin Ford
	// Script Agency: Accela
	// Script Description:
	// Script Run Event: 
	// Script Parents:
	//		ASIUA;Licensing!General!MassageEstablishment!License
	===================================================================*/

	// Under this line create the function that will need to run at script runtime.
	// the function will be called in the event ("AppSubmitAfter") major event.

	try {
		// Load the ASIT
		loadASITable("CITATIONCHECKLIST");
		var tInfo=CITATIONCHECKLIST;
		
		// Total Rows
		rowCount = 0;
		
		if (tInfo == null){
			logDebug("There was no rows in the table.");
			aa.print("There was no rows in the table.");
		}
		else {
			aa.print("Starting to parse table");
			rowCount = CITATIONCHECKLIST.length;
			// Before looping through we need to make sure that each row has the
			// correct fee... unfortunately we can't move/remove fee items
			// that aren't "NEW" so this would need to be done before the fee items
			// get added.
			feeArray = ["L040","L050","L060","040"]; // Each of the "Citation Fees"
			// for each of the items in the array we want to remove them
			for(y=0;y<=(feeArray.length-1);y++){
				exists=feeExists(feeArray[y]);
				if(exists){
					removeFee(feeArray[y],"FINAL");
				}
				exists=false; // just to make sure that it doesn't stay set
			}
			
			// loop through all of the rows in the table.
			for(rowIndex=0; rowIndex <=(rowCount-1);rowIndex++)
			{
				// If we don't yet have a value for rowStart18
				// then we will assume that this is the first row
				if(rowStart18 == null || totalRowCount == 1){
					rowStart18 = rowIndex;
				}
				
				// Parse through each row, comparing to the start of 18 months.
				date1 = tInfo[x]["Citation Issued Date"];
				date2 = tInfo[rowStart18]["Citation Issued Date"];
				// Now we would need to do a diffDate comparison to see if it's 18 months different or not.
				// If it is 18 months or more different the value we want to set is 250
				// variable1.value=toPrecision(250);
				//=======================================
				// Print sequence is not working
				// variable1.message = "hello world"; // This is working
				// variable1.message = date1.value.toString();
				var dateCompare = 0;
				dateCompare = diffDate(date2.value.toString(),date1.value.toString());
				// Testing this area now.
				if(Number(dateCompare) >= Number("547") || Number(dateCompare) == 1 ){
					rowStart18 = rowIndex;
					rowNumber = 0;
					// Add the Fee for 250
					addFee("L040","","FINAL",1,"Y");
				}
				else if(rowNumber == 2){
					// Add the Fee for 500
					addFee("L050","","FINAL",1,"Y");
				}
				else if(rowNumber >= 3){ // Handles 3 or more in the 18 month timeframe.
					// Add the fee for 750
					addFee("L060","","FINAL",1,"Y");
				}
				//=======================================
			}
		}
	}
	catch(err)
	{
		logDebug("A JavaScript Error occured: "+ err.message);
	}