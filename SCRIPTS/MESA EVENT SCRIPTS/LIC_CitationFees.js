/*===================================================================
// Script Number: 200
// Script Name: 200 Lic Citation Fees
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description:
When the “Citation Issued Date” is set the following calculations will be performed/populated.
•	If this is the first citation, then fee will be $250 dollars (first being in row #1). This will be calculated and the fee will be applied on the “Fee’s” tab LIC_PASS:L040 fee item will be added.
•	If this is not the first citation on the ASIT then additional work is to be done, fee can be either $500 or $750.
	o	$500 dollar fee will be calculated if this is row number 2, and is within 18 months of row number 1. LIC_PASS:L050 fee item will be added.
	o	$750 dollar fee will be calculated if this is row number 3 or higher, and is within 18 months of row number one. LIC_PASS:L060 fee item will be added. $750 for the 3rd citation and each subsequent citation in an 18 month period.
•	If this is not the first citation AND is being issued greater than 18 months after row number one, then reset the row number within the scope of the expression and perform the above calculations based off of new row set. The previous 18 month period citation history must be retained
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
	}
	else {
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