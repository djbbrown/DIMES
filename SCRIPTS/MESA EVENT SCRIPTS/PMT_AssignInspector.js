/*===================================================================
// Script Number: 110
// Script Name: PMT_AssignInspector.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When any inspection is added to the record, 
// retrieve the inspector from GIS and assign the inspection to that 
// inspector.

// Script Run Event: ISA

// Script Parents:

//	ISA;Permits!Demolition!NA!NA
//	ISA;Permits!Sign!NA!NA
//	ISA;Permits!Residential!NA!NA
//	ISA;Permits!Commercial!NA!NA
//	ISA;Permits!Residential!Mobile Home!NA
//	ISA;Permits!Online!NA!NA

//            
/*==================================================================*/

function getThisInspectionId() 
{
    var inspResultObj = aa.inspection.getInspections(capId);
    if (inspResultObj.getSuccess()) {
        var inspList = inspResultObj.getOutput();
        
        if ( inspList.length > 1 )
        {
            inspList.sort(compareByNumber);
        }
        
        return inspList[inspList.length-1].getIdNumber();
    }
}

function compareByNumber(a, b) {
    return a.getIdNumber() - b.getIdNumber();
}

try
{
    // get the inspector for this boundary          
    var inspector = getGISInfo("Accela/AccelaBoundaries", "Code_Officer_Boundary", "CODE_OFFICER");
    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        var inpRes = null;
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
			var inspectorObj = inspRes.getOutput();

            // get this inspection's id Number
            var inspNumber = getThisInspectionId();
            logDebug("inspNumber: " + inspNumber);
            //getInspections(); // test
            
            // assign inspector
            var iObjResult = aa.inspection.getInspection(capId, inspNumber);
            if (!iObjResult.getSuccess()) 
            {
		        logDebug("**WARNING retrieving inspection " + inspNumber + " : " + iObjResult.getErrorMessage());
		        return false;
	        }
	        iObj = iObjResult.getOutput();
            iObj.setInspector(inspectorObj);
            logDebug("Inspector assigned!");
		}
        else
        {
            logDebug("Failed to create inspector object!");
        }
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00509

*/