
function getParentCapID4Renewal() {
    var parentLic = getParentLicenseCapID(capId); 
    var pLicArray = String(parentLic).split("-"); 
    var parentLicenseCAPID = aa.cap.getCapID(pLicArray[0],pLicArray[1],pLicArray[2]).getOutput();

    return parentLicenseCAPID;
}
