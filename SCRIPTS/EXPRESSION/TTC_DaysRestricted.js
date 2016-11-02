/* ======================================================================
| Written By: Kevin Ford
| 
| Tags: isHoliday, Holiday, Check Working Day, Holiday Array
=======================================================================*/
var aa = expression.getScriptRoot();
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

//
// exists:  return true if Value is in Array
//
function exists(eVal, eArray) {
	  for (ii in eArray)
	  	if (eArray[ii] == eVal) return true;
	  return false;
}

function convertDate(thisDate)
	{
	if (typeof(thisDate) == "string")
		{
		var retVal = new Date(String(thisDate));
		if (!retVal.toString().equals("Invalid Date"))
			return retVal;
		}
	if (typeof(thisDate)== "object")
		{
		if (!thisDate.getClass) // object without getClass, assume that this is a javascript date already
			{
			return thisDate;
			}
		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime"))
			{
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
			}
		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime"))
			{
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
			}			
		if (thisDate.getClass().toString().equals("class java.util.Date")
			|| thisDate.getClass().toString().equals("class java.sql.Timestamp")
		)
			{
			return new Date(thisDate.getTime());
			}
		if (thisDate.getClass().toString().equals("class java.lang.String"))
			{
			return new Date(String(thisDate));
			}
		}
	if (typeof(thisDate) == "number")
		{
		return new Date(thisDate);  // assume milliseconds
		}
	logDebug("**WARNING** convertDate cannot parse date : " + thisDate);
	return null;
	}
	
function monthDiff(d1, d2) {
    var months;
	d1 = convertDate(d1);
	d2 = convertDate(d2);
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function isHoliday(cDate,hString){
	var isHoliday = false;
	cDate = convertDate(cDate);
	var checkH = collectHolidays(cDate,cDate,hString);
	if (checkH.length > 0){
		isHoliday = true;
	}
	return isHoliday;
}
//*/
function collectHolidays(sDate,eDate,hString){
	var hArray = [];
	var sDate2 = convertDate(sDate);
	var eDate = convertDate(eDate);
	var countElem = 0;
	var monthsBetween = monthDiff(sDate2,eDate)+1;
	// for each month in between we want to loop through and create a large array of
	// resultes that match.
	//hArray.push(sDate2);
	for(a = 0; a <= monthsBetween; a++){
		var calE = aa.calendar.getEventSeriesByCalendarID(42,sDate2.getFullYear(),sDate2.getMonth()+a).getOutput();
		for(b in calE){
			// Get the event details
			var evtDateDate = convertDate(calE[b].getStartDate());
			var evtType = calE[b].getEventType();
			//hArray.push(evtDateDate);
			// Now do the COMPARISON
			if(
				exists(evtType,hString)
				&& evtDateDate >= convertDate(sDate)
				&& evtDateDate <= eDate
			)
			{
				// Append to the array
				countElem ++;
				hArray.push(evtDateDate);
			}
		}
	}
	return hArray;
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
		//toDate = convertDate(variable0);ffgf
		// Calculate Days between.
		var daysBetween = 0;
		var monthsBetween = 0;
		daysBetween = diffDate(variable1.value.toString(),variable0.value.toString())+1;
		monthsBetween = monthDiff(variable1.value.toString(),variable0.value.toString()); // Confirmed working
		var arrayLength;
		var incEType = ['HOLIDAY'];
		//var holidayArray = collectHolidays(variable1.value.toString(),variable0.value.toString(),incEType);
		//variable2.message = daysBetween.toString();
		//expression.setReturn(rowIndex,variable0);
		// Parse a number of months for the items that fall in the expected 
		//variable2.message = monthsBetween.toString();
		//expression.setReturn(rowIndex,variable2);
		//monthsBetween = monthDiff(fDate,tDate);
		//monthsBetween = monthDiff(new Date(variable1.value),new Date(variable0,value));
		sDate = variable1.value.toString();
		//dHoliday = isHoliday('07/04/2016',42,'HOLIDAY');
		//variable1.message = dHoliday;
		//expression.setReturn(rowIndex,variable1);
		// Now to implement something that will calculate the number of days based off of flags.
		checkReturn = [];
		var dayCount = 0; // This will end up being the number of days that we want to remove.
		var checkingDate;
		for(x = 0; x <= daysBetween; x++){
			
			checkingDate = addDate(sDate,x);
			var checkingDateDate = convertDate(checkingDate);
			var dHoliday = false;
			//dHoliday = isHoliday('07/04/2016',42,'HOLIDAY');
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
			else if (
					dOW > 0
					&& dOW < 6 
					&& variable3.value.toString() == 'Yes'
					&& !isHoliday(checkingDateDate,incEType)
			){
				dayCount++;
			}
			// Holiday Restrictions
			else if(
				1==1
				&& isHoliday(checkingDateDate,incEType)
				&& variable6.value.toString()=='Yes'
			){
				dayCount++;
				/*
				checkReturn.push(checkingDateDate);
				checkReturn.push(isHoliday(checkingDateDate,incEType));
				variable1.message = holidayArray;
				expression.setReturn(rowIndex,variable1);
				variable0.message = variable6.value.toString();
				expression.setReturn(rowIndex,variable0);
				variable2.message = checkReturn;
				expression.setReturn(rowIndex,variable2);
				//*/
			}
		}
		// variable3.message = checkingDate.toString();
		variable2.value = dayCount;
		expression.setReturn(rowIndex,variable2);
	}}