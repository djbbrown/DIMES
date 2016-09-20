//*===================================================================
//
// Script Name: getASIFieldValueBeforeItChanged.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Intended for use in ASIUB events. This will get the previous 
//      value of the passed in field name (asiFieldName).
//
//      If this is run in an ASIUA, and possibly other events, it will just return the current value.
//
//      asiSubGroupName = ASI Sub Group Name (the sub group name that 
//          contains the ASI field)
//      asiFieldName = ASI Field (field you want the previous value of)
//      altId (optional) = the alt id of the record you are working with, 
//          if not used it will assume that capID is available
// 
//==================================================================*/
function getASIFieldValueBeforeItChanged(asiSubGroupName, asiFieldName) // optional altId
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

    var beforeValueList = aa.appSpecificInfo.getAppSpecificInfos(theCapID, asiSubGroupName, asiFieldName).getOutput();

    var beforeValue = null;
    for (var i=0;i<beforeValueList.length;i++)
    {
        beforeValue = beforeValueList[i].getChecklistComment();
        logDebug("beforeValue[" + i + "]: " + beforeValue);
    }
    return beforeValue;
}