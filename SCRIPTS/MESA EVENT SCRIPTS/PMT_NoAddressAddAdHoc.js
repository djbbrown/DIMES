/*==================================================================*/
// Script Number: 111
// Script Name: PMT_NoAddressAddAdHoc.js
// Script Developer: Chris Godwin
// Script Developer: N. Victor Staggs
// Script Agency: Woolpert
// Script Description: If, on app submittal the record has no address, Add Adhoc task "GIS Addressing".
// Script Run Event: ASA
// Script Parents:
//
//    ASA;Permits!Commercial!NA!NA
//    ASA;Permits!Demolition!NA!NA
//    ASA;Permits!Residential!Mobile Home!NA
//    ASA;Permits!Residential!NA!NA
//    ASA;Permits!Sign!NA!NA   
//
/*==================================================================*/

//Permits/Commercial/NA/NA
//Permits/Demolition/NA/NA
//Permits/Residential/Mobile Home/NA
//Permits/Residential/NA/NA
//Permits/Sign/NA/NA

if (
    matches("" + appTypeArray[0], "Permits")
        &&
    matches("" + appTypeArray[1], "Commercial", "Demolition", "Residential", "Sign")
        &&
    matches("" + appTypeArray[2], "NA", "Mobile Home")
        &&
    matches("" + appTypeArray[2], "NA")
) {
    try {
        DoAddAdHocTaskWhenNoAddress();
    } catch (exception){
        logDebug("JavaScript exception caught: " + exception.message);
    }
}

function DoAddAdHocTaskWhenNoAddress() {
    logDebug("Enter DoAddAdHocTaskWhenNoAddress()");

    logDebug("capId: " + capId);

    var getAddressByCapIdScriptResult = aa.address.getAddressByCapId(capId);
    logDebug("getAddressByCapIdScriptResult: " + getAddressByCapIdScriptResult);
    logDebug("getAddressByCapIdScriptResult.getSuccess()" + getAddressByCapIdScriptResult.getSuccess());

    if (getAddressByCapIdScriptResult.getSuccess()) {

        var addressModels = getAddressByCapIdScriptResult.getOutput();
        logDebug("addressModels: " + addressModels);
        logDebug("addressModels.length: " + addressModels.length);

        if (addressModels.length == 0) {
            logDebug("Begin calling addAdHocTask()");
            addAdHocTask("WFADHOC_PROCESS", "GIS Addressing", "Added by Script");
            logDebug("End calling addAdHocTask()");
        }
    }

    logDebug("Exit DoAddAdHocTaskWhenNoAddress()");
}