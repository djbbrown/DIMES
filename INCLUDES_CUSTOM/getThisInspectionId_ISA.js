//*===================================================================
//
// Script Name: getThisInspectionId_ISA.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Get's the newly created inspection id. To be used in ISA events.

//      altId (optional) = the alt id of the record you are working with, 
//          if not used it will assume that capID is available
// 
//==================================================================*/
function getThisInspectionId_ISA() // optional altId
{
    var theCapID = null;
    if ( arguments.length == 3 )
    {
        theCapID = aa.cap.getCapID(arguments[2]).getOutput();
    }
    else 
    {
        theCapID = capId;
    }

    var inspResultObj = aa.inspection.getInspections(capId);
    if (inspResultObj.getSuccess()) {
        var inspList = inspResultObj.getOutput();
        
        if ( inspList.length > 1 )
        {
            var compareFunction = new function compareByNumber(a, b) { return a.getIdNumber() - b.getIdNumber(); }
            inspList.sort(compareFunction);
        }
        
        return inspList[inspList.length-1].getIdNumber();
    }
    else 
    {
        logDebug("Failed to get Inspection Id.")
        return false;
    }
}