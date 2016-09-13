//*===================================================================
//
// Script Name: getRecordPriority.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Get's the record's "priority". Returns false if there is a problem.
//      altId (optional) = the alt id of the record you are working with, 
//          if not used it will assume that capID is available
// 
//==================================================================*/
function getRecordPriority() // optional altId
{
    var theCapID = null;
    if ( arguments.length == 1 )
    {
        theCapID = aa.cap.getCapID(arguments[0]).getOutput();
    }
    else 
    {
        theCapID = capId;
    }
    var cdScriptObjResult = aa.cap.getCapDetail(theCapID);
    if (cdScriptObjResult.getSuccess())
    {
        var cdScriptObj = cdScriptObjResult.getOutput();
        if ( cdScriptObj ) 
        {
            var cd = cdScriptObj.getCapDetailModel();
            return cd.getPriority();
        }
        else
        {
            logDebug("Failed to get record priority (cdScriptObj)")
            return false;
        }
    }
    else 
    {
        logDebug("Failed to get record priority (cdScriptObjResult)")
        return false;
    }
}