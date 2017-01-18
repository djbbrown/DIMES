//
//*===================================================================
//
// Script Name: getEnforcementInspectorId.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Returns a code inspector object for the cap id.
//
//      altId (optional) = the alt id of the record you are working with, 
//          if not used it will assume that capID is available
// 
//==================================================================*/
function getEnforcementInspectorId() // optional altId
{
    // code officer aka inspector

    if ( arguments.length == 1 )
    {
        capId = aa.cap.getCapID(arguments[0]).getOutput(); // this is expected in getGisInfo
    }

    var inspector = getGISInfo("Accela/AccelaBoundaries", "Code_Officer_Boundary", "CODE_OFFICER");  //Code
    
    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        if (inspector != "undefined" || inspector != null) {
			// have to re-grab the user since the id won't show up in this object.
			inspUserObj = aa.person.getUser(nameArray[0],"",nameArray[1]).getOutput();
			if (inspUserObj != null){
			return inspUserObj.getUserID();
				}
			}
		return null;
		}
}