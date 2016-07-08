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
var variable0=expression.getValue("ASIT::DURATION INFORMATION::Restriction End Date");
var variable1=expression.getValue("ASIT::DURATION INFORMATION::Restriction Start Date");
var variable2=expression.getValue("ASIT::DURATION INFORMATION::Days Restricted");
var variable3=expression.getValue("ASIT::DURATION INFORMATION::Weekday Restriction");
var variable4=expression.getValue("ASIT::DURATION INFORMATION::Saturday Restriction");
var variable5=expression.getValue("ASIT::DURATION INFORMATION::Sunday Restriction");
var variable6=expression.getValue("ASIT::DURATION INFORMATION::City Holiday Restriction");


var totalRowCount = expression.getTotalRowCount();
for(var rowIndex=0; rowIndex<totalRowCount; rowIndex++){

		variable1=expression.getValue(rowIndex, "ASIT::DURATION INFORMATION::Restriction Start Date");
		variable2=expression.getValue(rowIndex, "ASIT::DURATION INFORMATION::Days Restricted");
		variable0=expression.getValue(rowIndex, "ASIT::DURATION INFORMATION::Restriction End Date");
		variable3=expression.getValue(rowIndex, "ASIT::DURATION INFORMATION::Weekday Restriction");
		variable4=expression.getValue(rowIndex, "ASIT::DURATION INFORMATION::Saturday Restriction");
		variable5=expression.getValue(rowIndex, "ASIT::DURATION INFORMATION::Sunday Restriction");
		variable6=expression.getValue(rowIndex, "ASIT::DURATION INFORMATION::City Holiday Restriction");
		if(variable0.value!=null && !formatDate(variable0.value,'yyyy/MM/dd').equals(formatDate(null,'yyyy/MM/dd')) && variable1.value!=null && !formatDate(variable1.value,'yyyy/MM/dd').equals(formatDate(null,'yyyy/MM/dd'))){
		//variable4.message=variable4.value;
		//expression.setReturn(rowIndex,variable4);
		//fromDate = convertDate(variable1);
		//toDate = convertDate(variable0);
		// Calculate Days between.
		var daysBetween = 0;
		daysBetween = diffDate(variable1.value.toString(),variable0.value.toString());
		sDate = variable1.value.toString();
		// Now to implement something that will calculate the number of days based off of flags.
		var dayCount = 0; // This will end up being the number of days that we want to remove.
		for(x = 0; x <= daysBetween; x++){
			var checkingDate;
			checkingDate = addDate(sDate,x);
			dOW = new Date(checkingDate).getDay();
			// Suday Operations
			if (dOW == 0 && variable5.value.toString() == 'Yes'){
				dayCount++;
			}
			// Saturday Operations
			else if (dOW == 6 && variable4.value.toString()== 'Yes') {
				dayCount++;
			}
			// Weekday Restrictions
			else if (dOW > 0 && dOW < 6 && variable3.value.toString() == 'Yes'){
				dayCount++;
			}
		}
		variable2.value = dayCount;
		expression.setReturn(rowIndex,variable2);
	}}