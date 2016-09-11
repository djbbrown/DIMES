//*===================================================================
//
// Script Name: doesCapConditionExist.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		See if the standard condition exists.
//
//      conditionName = the name of the standard condition
//      altId (optional) = the alt id of the record you are working with, 
//          if not used it will assume that capID is available
// 
//==================================================================*/

function doesCapConditionExist(conditionName) // optional altId
{
    var theCapID = null;
    if ( arguments.length == 2 )
    {
        theCapID = aa.cap.getCapID(arguments[1]).getOutput();
    }
    else 
    {
        theCapID = capId;
    }

    var condResult = aa.capCondition.getCapConditions(theCapID);
    if (condResult.getSuccess())
    {
        var capConds = condResult.getOutput();
        for (cc in capConds) 
        {
            var thisCond = capConds[cc];
            var cDesc = thisCond.getConditionDescription().toUpperCase();
            if(cDesc == conditionName.toUpperCase())
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    else
    {
        return false;
    }
}