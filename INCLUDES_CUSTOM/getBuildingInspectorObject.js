//*===================================================================
//
// Script Name: getBuildingInspectorObject.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Returns a BUILDING inspector object for the cap id.
//
//      altId (optional) = the alt id of the record you are working with, 
//          if not used it will assume that capID is available
// 
//==================================================================*/
function getBuildingInspectorObject() // optional altId
{
    // code officer aka inspector

    if ( arguments.length == 1 )
    {
        capId = aa.cap.getCapID(arguments[0]).getOutput(); // this is expected in getGisInfo
    }

    var inspector = getGISInfo("Accela/AccelaBoundaries", "Building_Inspection_Areas", "NAME");
    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        var inspRes = null;
        switch (nameArray.length)
        {
            case 1:
                inspRes = aa.person.getUser(inspector);
                break;
            case 2:
                inspRes = aa.person.getUser(nameArray[0], "", nameArray[1]);
                break;
            case 3:
                inspRes = aa.person.getUser(nameArray[0], nameArray[1], nameArray[2]);
                break;
        }
        
		if (inspRes.getSuccess())
        {
			return inspRes.getOutput();
		}
        else
        {
            logDebug("Failed to create building inspector object!");
            return false;
        }
    }
	else 
	{
		return false;
	}
}