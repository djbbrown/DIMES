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

// Version   |Date      |Engineer         |Details
//  1.0      |2016      |Vance Smith      |Initial Release
//  1.1      |01/11/17  |Vance Smith      |Revised per recommendations by Kevin Gurney
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    // get the inspector for this boundary          
    var inspectorObj = getBuildingInspectorId(); // getBuildingInspectorObject();
    if (inspectorObj != false && InspectorFirstName == null && InspectorMiddleName == null && InspectorLastName == null) 
    {
        /*
		// get all inspections, assign inspector (if not already assigned)
        var inspResultObj = aa.inspection.getInspections(capId);
        if (inspResultObj.getSuccess()) {
            var inspList = inspResultObj.getOutput();

            for ( var xx in inspList )
            {
                var iObj = inspList[xx];
                var inspNumber = iObj.getIdNumber();
                logDebug("inspNumber: " + inspNumber);
           
                // see if inspector is already assigned
                var curInspObj = iObj.getInspector();
                if (curInspObj == "")
                {
                    // assign inspector          
                    iObj.setInspector(inspectorObj);
                    aa.inspection.editInspection(iObj);
                    logDebug("Inspector assigned!");
                }
                else
                {
                    logDebug("Inspector already assigned for " + inspNumber);
                }
            }
        }
        else 
        {
            logDebug("Failed to get inspections...")
        }        
		*/
        assignInspection(inspId,inspectorObj); 
    }
    else
    {
        logDebug("Failed to create building inspector object!");
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}