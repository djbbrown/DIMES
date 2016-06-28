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

// Create Variable to house the row number of the most recent start of 18 months.
var rowStart18 = null;

// Count all of the rows.
var totalRowCount = expression.getTotalRowCount();
// The following allows me to parse the entire table so I can take advantage of that.
for(var rowIndex=0; rowIndex<totalRowCount; rowIndex++){
	variable1=expression.getValue(rowIndex, "ASIT::CITATION CHECKLIST::Citation Amount");
	variable0=expression.getValue(rowIndex, "ASIT::CITATION CHECKLIST::Citation Issued Date");
	var startMonthDate = null;
	// The following will get the Citation issued date.
	if(rowStart18 != null){
		startMonthDate = expression.getValue(rowStart18, "ASIT::CITATION CHECKLIST::Citation Issued Date");
		startMothhDate = parseDate(startMonthDate.value,'MM/dd/yyyy');
	} 
	else {startMonthDate = parseDate('01/01/2000')};
	// If Statement to look at the timeframe of the date.
	if(
		1==1 //dateDiff((startMonthDate.value, 'yyyy/MM/dd'),formatDate(variable0.value,'yyyy/MM/dd')) > 18
	) {
		rowStart18 = rowIndex;
		//variable1.message="This is a message";
		//variable1.message = variable0.value;
		//variable1.message = formatDate(variable0.value,'yyyy/MM/dd'));
		//variable1.message = formatDate(variable0.value,'MM/dd/yyyy').toString();
		//variable1.message = formatDate(variable0.value,'yyyy/MM/dd').toString();
		variable1.message = formatDate(startMonthDate,'yyyy/MM/dd');
	}
	//*/
	
	if(
		variable0.value!=null
		//&& formatDate(variable0.value,'yyyy/MM/dd').equals(formatDate(12123,'yyyy/MM/dd'))
	){
		for(var updateWhichRowIndex=0;updateWhichRowIndex<totalRowCount;updateWhichRowIndex++){
			variable1=expression.getValue(updateWhichRowIndex, "ASIT::CITATION CHECKLIST::Citation Amount");
			variable0=expression.getValue(updateWhichRowIndex, "ASIT::CITATION CHECKLIST::Citation Issued Date");
			if(
				variable0.value!=null
				//&& formatDate(variable0.value,'yyyy/MM/dd').equals(formatDate(1239,'yyyy/MM/dd'))
			){
				variable1.value=toPrecision(250);
				expression.setReturn(updateWhichRowIndex,variable1);

				//variable1.message="This is the message that I want to have show";
				expression.setReturn(updateWhichRowIndex,variable1);
			}
		}
	}
}