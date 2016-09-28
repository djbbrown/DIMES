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

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    // get the inspector for this boundary          
    var inspectorObj = getBuildingInspectorObject();
    if (inspectorObj != false) 
    {
        // get this inspection's id Number
        var inspNumber;
        if ( typeof inpsId == "undefined")
        {
            logDebug("Used getThisInspectionId_ISA() to get inspNumber")
            inspNumber = getThisInspectionId_ISA();
        }
        else
        {
            inspNumber = inspId;
        }
        logDebug("inspNumber: " + inspNumber);

        if (inspNumber != false)
        {            
            // assign inspector
            var iObjResult = aa.inspection.getInspection(capId, inspNumber);
            if (iObjResult.getSuccess()) 
            {
                iObj = iObjResult.getOutput();
                iObj.setInspector(inspectorObj);
                aa.inspection.editInspection(iObj)
                logDebug("Inspector assigned!");
            }
            else
            {
                logDebug("**WARNING retrieving inspection " + inspNumber + " : " + iObjResult.getErrorMessage());
            } 
        }
        else
        {
            logDebug("Failed to get inspection number!");
        }
    }
    else
    {
        logDebug("Failed to create building inspector object!");
    }

    aa.sendMail("NoReply@MesaAz.gov", "vance.smith@mesaaz.gov", "vance.smith@mesaaz.gov", "Test Script: 110", "ISA event fired!");
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00874

*/