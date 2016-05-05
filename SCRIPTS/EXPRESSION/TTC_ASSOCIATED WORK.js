// This is used in conjuction with the following:
// 	TRA_ValidateRow.js (Expression)
// 	TRA_ValidateUTL.js (Expression)
// 	TRN_MaintainRelatedRecords.js (Script)
// 	TTC_ASSOCIATED WORK.js (Eipression)

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

// Variables
var servProvCode=expression.getValue("$$servProvCode$$").value;
var variable0=expression.getValue("ASI::GENERAL WORK INFORMATION::Associated Work Permit Type");
var variable1=expression.getValue("ASI::GENERAL WORK INFORMATION::ROW Permit No.");
var variable2=expression.getValue("ASI::GENERAL WORK INFORMATION::UTL Permit No.");


var totalRowCount = expression.getTotalRowCount();

if(variable0.value!=null && variable0.value.equals(String("ROW - Right-of-Way"))){
	// if "Assoiated Work Permit Type" is not null and value is "ROW - Right-of-Way"
	variable1.required=true;	// "ROW Permit No." is required
	expression.setReturn(variable1);
	variable2.readOnly=true;	// "UTL Permit No."  should be readonly
	expression.setReturn(variable2);
	variable1.readOnly=false;	// "ROW Permit No." needs to be writable
	expression.setReturn(variable1);
	}
else if(
	// IF "Assoiated Work Permit Type" is not null and value is "UTL - Utility"
	variable0.value!=null && variable0.value.equals(String("UTL - Utility"))){
	variable2.required=true; // "UTL Permit No." is required
	expression.setReturn(variable2);
	variable1.readOnly=true; // "ROW Permit No." should be read only
	expression.setReturn(variable1);
	variable2.readOnly=false; // "UTL Permit No." should be writable
	expression.setReturn(variable2);
}
// Else everything is not required
// and everything is read only.
else{ 
	variable1.required=false;
	expression.setReturn(variable1);
	variable2.required=false;
	expression.setReturn(variable2);
	variable1.readOnly=true;
	expression.setReturn(variable1);
	variable2.readOnly=true;
	expression.setReturn(variable2);
}