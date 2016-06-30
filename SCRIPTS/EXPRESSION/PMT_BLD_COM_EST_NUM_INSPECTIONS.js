/*===================================================================*/
// Script Number: 213
// Script Name:  PMT_BLD_COM_EST_NUM_INSPECTIONS.js
// Script Developer: N. Victor Staggs
// Script Agency: Woolpert, Inc.
// Script TYpe: Expression Builder Script
// Script Description: Conditionally hide/show and make required the "Estimated Number of Inspections" field.
// Script CAP Type: Permits/Commercial/NA/NA
/*==================================================================*/

var toPrecision = function (value) {
    var multiplier = 10000;
    return Math.round(value * multiplier) / multiplier;
}
function addDate(iDate, nDays) {
    if (isNaN(nDays)) {
        throw ("Day is a invalid number!");
    }
    return expression.addDate(iDate, parseInt(nDays));
}

function diffDate(iDate1, iDate2) {
    return expression.diffDate(iDate1, iDate2);
}

function parseDate(dateString) {
    return expression.parseDate(dateString);
}

function formatDate(dateString, pattern) {
    if (dateString == null || dateString == '') {
        return '';
    }
    return expression.formatDate(dateString, pattern);
}

function getAdditionalInfo(capId) {

    var bvaluatnScriptModel = null;

    var s_result = aa.cap.getBValuatn4AddtInfo(capId);

    if (s_result.getSuccess()) {
        bvaluatnScriptModel = s_result.getOutput();
        if (bvaluatnScriptModel == null) {
            bvaluatnScriptModel = null;
        }
    }
    else {
        bvaluatnScriptModel = null;
    }

    return bvaluatnScriptModel;
}

var servProvCode = expression.getValue("$$servProvCode$$").value;
var totalRowCount = expression.getTotalRowCount();

var aa = expression.getScriptRoot()

var capType = expression.getValue("CAP::capType").value;

if (capType == "Permits/Commercial/NA/NA") {

    var applicantJobValue = 0;
    var totalValuation = 0;

    var estimatedNumberOfInspectionsControl = expression.getValue("ASI::GENERAL INFORMATION::Estimated Number of Inspections");
    var totalValuationControl = expression.getValue("ASI::GENERAL INFORMATION::Total Valuation");
    var mcFloodZonePermitNumberControl = expression.getValue("ASI::GENERAL INFORMATION::MC Flood Zone Permit Number");

    //mcFloodZonePermitNumberControl.value += capType.toString();
    estimatedNumberOfInspectionsControl = expression.getValue("ASI::GENERAL INFORMATION::Estimated Number of Inspections");
    totalValuationControl = expression.getValue("ASI::GENERAL INFORMATION::Total Valuation");

    var capIdObj = aa.cap.getCapID("" + expression.getValue("CAP::capModel*altID").value)

    if (capIdObj.getSuccess()) {
        var capId = capIdObj.getOutput();
        //mcFloodZonePermitNumberControl.value += capId.toString();
        var additionalInfo = getAdditionalInfo(capId);
        applicantJobValue = Number(additionalInfo.getEstimatedValue());
        //mcFloodZonePermitNumberControl.value += applicantJobValue.toString();

    }

    //Get the value from the "Data Fields -> General Information -> Total Valuation" control
    if (totalValuationControl.value != null && totalValuationControl.value != "") {
        totalValuation = Number(totalValuationControl.value);
        //mcFloodZonePermitNumberControl.value += totalValuation.toString();
    }

    if ((totalValuation + applicantJobValue < 25000)) {
        estimatedNumberOfInspectionsControl.hidden = true;
        estimatedNumberOfInspectionsControl.required = false;
    } else {
        estimatedNumberOfInspectionsControl.hidden = false;
        estimatedNumberOfInspectionsControl.required = true;
    }

    //expression.setReturn(mcFloodZonePermitNumberControl);
    expression.setReturn(estimatedNumberOfInspectionsControl);
}