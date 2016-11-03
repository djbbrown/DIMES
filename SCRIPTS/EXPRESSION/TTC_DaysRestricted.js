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

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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
function dayDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
function calendarDates(sDate,eDate,aCal,aDayEx){
	// sDate == Start Date
	// eDays == End Date
	// aCal == Array of calendars to include.
	// aDayEx == Array of day types that you wish to exclude.
	
	// Variables
	var dArray = []; // to store the dates between the two dates.
	var sDate2 = convertDate(sDate);
	var eDate2 = convertDate(eDate);
	
	aDays2 = dayDiff(sDate2,eDate2);

	// Change everything in aCal to upper for comparison.
	toUpper = function(x){ 
		  return x.toUpperCase();
	};
	aCal = aCal.map(toUpper);
	
	// eDate2 needs to be sufficiently into the future for the rest of the function.
	eDate2.setDate(eDate2.getDate() + aDays2);
	
	// will be used to pull sufficient days that are "off"
	var monthsBetween = monthDiff(sDate2,eDate2);

	// Now look up the calendars that are going to be excluded.
	// expected return is the calendar ID's
	calNames = aa.calendar.getCalendarNames().getOutput();
	for(x in calNames){
		// IF the name of the calendar is included in the list we need the
		// events from that calendar
		if(exists(calNames[x].getCalendarName().toUpperCase(),aCal)){
			for(a = 0; a <= monthsBetween; a++){
				calE = aa.calendar.getEventSeriesByCalendarID(calNames[x].getCalendarID(),sDate2.getFullYear(),sDate2.getMonth()+a).getOutput();
				for(b in calE){
					// Get the event details
					var evtDateDate = new Date(convertDate(calE[b].getStartDate()));
					var evtType = calE[b].getEventType();
					// Now do the COMPARISON
					if(
						exists(evtType,aDayEx)
					)
					{
						dArray.push(evtDateDate)
					}
				}
			}
		}
	}
	if(sDate2 == eDate2){
		return 0;
	} else {
	return dArray // Return the Date that can be used as a working day.
	}
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
			holidays = calendarDates(variable1.value.toString(),variable0.value.toString(),['WORKDAY CALENDAR'],['HOLIDAY']);
			//variable2.message = holidays.toString();
		//variable4.message=variable4.value;
		//expression.setReturn(rowIndex,variable4);
		//fromDate = convertDate(variable1);
		//toDate = convertDate(variable0);ffgf
		// Calculate Days between.
		var daysBetween = 0;
		var monthsBetween = 0;
		//variable1.message = variable1.value;
		expression.setReturn(rowIndex,variable1);
		//variable0.message = variable0.value;
		expression.setReturn(rowIndex,variable0);
		daysBetween = diffDate(variable1.value.toString(),variable0.value.toString());
		//variable2.message = daysBetween;
		monthsBetween = monthDiff(variable1.value.toString(),variable0.value.toString()); // Confirmed working
		var arrayLength;
		var incEType = ['HOLIDAY'];
		sDate = variable1.value.toString();
		// Now to implement something that will calculate the number of days based off of flags.
		checkReturn = [];
		var dayCount = 0; // This will end up being the number of days that we want to remove.
		var checkingDate;
		var checkingDateDate;
		var sundays = new Array();
		for(x = 0; x <= daysBetween; x++){
			checkingDate = new Date(addDays(sDate,x));
			checkingDateDate = new Date(convertDate(checkingDate));
			var dHoliday = false;
			//dHoliday = isHoliday('07/04/2016',42,'HOLIDAY');
			sundays.push('<br>'+checkingDateDate+' '+x);
			dOW = new Date(checkingDate).getDay();
			// Sunday Operations
			if (dOW == 0 && variable5.value.toString() == 'Yes'){
				dayCount++;
				// sundays.push('<br>'+checkingDateDate+' '+x);
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
					&& !(exists(checkingDateDate.toString(),holidays))
			){
				dayCount++;
			}
			// Holiday Restrictions
			else if(
				1==1
				&& exists(checkingDateDate.toString(),holidays)
				&& variable6.value.toString()=='Yes'
			){
				dayCount++;
			}
		}
		// holidays = calendarDates('11/01/2016','12/01/2016',['WORKDAY CALENDAR'],['HOLIDAY']);
		// variable2.message = holidays.toString();
		variable2.value = dayCount;
		//variable3.message = sundays.toString();
		expression.setReturn(rowIndex,variable2);
		//expression.setReturn(rowIndex,variable3);
	}}