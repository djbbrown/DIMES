var toPrecision=function(value){
  var multiplier=10000;
  return Math.round(value*multiplier)/multiplier;
}
function addDate(iDate, nDays){ 
	if(isNaN(nDays)){
		throw("Day is a invalid number!");
	}
	return expression.addDate(iDate,parseInt(nDays));
}

function diffDate(iDate1,iDate2){
	return expression.diffDate(iDate1,iDate2);
}

function parseDate(dateString){
	return expression.parseDate(dateString);
}

function formatDate(dateString,pattern){ 
	if(dateString==null||dateString==''){
		return '';
	}
	return expression.formatDate(dateString,pattern);
}

var servProvCode=expression.getValue("$$servProvCode$$").value;
var variable0=expression.getValue("ASIT::CITATION CHECKLIST::Citation Issued Date");
var variable1=expression.getValue("ASIT::CITATION CHECKLIST::Citation Amount");

// Local Variables
var rowStart18 = null; // To store the start of the most recenet "Citation"
var startMonthDate = null;  // This may be temporary currently storing the startDate
var rowNumber = 0; // 
// Count all of the rows for controlling the loop.
var totalRowCount = expression.getTotalRowCount(); // Can I depend on this ????

//======================================================
// Loop Start
// The following allows me to parse the entire table so I can take advantage of that.
//======================================================
for(var rowIndex=0; rowIndex<totalRowCount; rowIndex++){
	variable1=expression.getValue(rowIndex, "ASIT::CITATION CHECKLIST::Citation Amount");
	variable0=expression.getValue(rowIndex, "ASIT::CITATION CHECKLIST::Citation Issued Date");
	rowNumber++;
	// If we don't yet have a value for rowStart18
	// then we will assume that this is the first row
	if(rowStart18 == null || totalRowCount == 1){
		rowStart18 = rowIndex;
		//variable0.message = "setting rowStart18";
		//expression.setReturn(variable0);
	}
	// Else
	// We would want to see if the date from the current row is 18 months
	// older than the last row
	if(1==1){
		date1 = expression.getValue(rowIndex,"ASIT::CITATION CHECKLIST::Citation Issued Date");
		date2 = expression.getValue(rowStart18,"ASIT::CITATION CHECKLIST::Citation Issued Date");
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
			variable1.value=toPrecision(250);
		}
		else if(rowNumber == 2){
			
			variable1.value=toPrecision(500);
		}
		else if(rowNumber >= 3){
			
			variable1.value=toPrecision(750);
		}
		//*/
		variable1.message = dateCompare
		expression.setReturn(rowIndex,variable1);
		//=======================================
	}
	if(variable1 == null){
		variable1.message = "Null Value";
		expression.setReturn(rowIndex,variable1);
	}
	//*/
	// If Statement to look at the timeframe of the date.
	/*if(
		1=1 // dateDiff(date2.getValue(),date1.getValue) > 18
	) {
		rowStart18 = rowIndex;
		//variable1.message = formatDate(startMonthDate,'yyyy/MM/dd');
		//variable1.message = diffDate(formatDate(startMonthDate.value,'MM/dd/yyyy'),formatDate(variable0.value,'MM/dd/yyyy')).toString();
		variable1.message = "hello world";
		expression.setReturn(updateWhichRowIndex.variable1);
	}
	//*/
}
//======================================================
// Loop End
//======================================================