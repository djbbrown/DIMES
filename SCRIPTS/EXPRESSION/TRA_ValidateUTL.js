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
var aa=expression.getScriptRoot();
var servProvCode=expression.getValue("$$servProvCode$$").value;
var variable0=expression.getValue("ASI::GENERAL WORK INFORMATION::UTL Permit No.");
var variable1=expression.getValue("ASI::FORM");

valueOk = true;
if(variable0.value!=null && variable0.value != ""){
    valueOk = false;
	rowNum = variable0.value;
	var licCapResult = aa.cap.getCapID(rowNum);
	if (licCapResult.getSuccess()) {
		licCapId = licCapResult.getOutput();
		var capResult = aa.cap.getCap(licCapId);
		if (capResult.getSuccess()) {
			licCap = capResult.getOutput();
			if (licCap != null) {
				appTypeResult = licCap.getCapType();
				appTypeString = appTypeResult.toString();
				appTypeArray = appTypeString.split("/");
 				if (appTypeArray[0] == "Engineering" && appTypeArray[1] == "Utilities")
					valueOk = true;
			}
		}
	}
}

if (!valueOk) {	
	msg = "Invalid UTL Permit number";
	variable0.message = msg;
	variable0.value = "";
	expression.setReturn(variable0);
	variable1.blockSubmit=true;
	expression.setReturn(variable1);
}