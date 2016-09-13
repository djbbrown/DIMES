/*===================================================================
// Script Number: 92
// Script Name: PMT_PermitExpirationDate.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When a status of "Issued" is applied to wf task
// "Permit Issuance" then set permit expiration date  in ASI field 
// "Permit Expiration Date".
 
// Permit expiration date will be set as 180 calendar days unless noted below:
 
// see switch statement below for details on exceptions to the default 180 days

// Script Run Event: WTUA

// Script Parents:
//	WTUA;Permits!~!~!~ 
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if (taskStatus("Permit Issuance") != null && taskStatus("Permit Issuance").toUpperCase() == "ISSUED" ) 
    {
        logDebug("Task 'Permit Issuance' has status = 'Issued'");

        var tStatusDate = convertDate(taskStatusDate("Permit Issuance"));
        logDebug("tStatusDate: " + tStatusDate);        

        loadASITable("SIGN INFO");
        var tInfo = SIGNINFO;
        var typeOfWork = ""; 
        if (tInfo.length > 0 ) {
            typeOfWork = tInfo[0]["Type of Work"];
        }        
        logDebug("Type of Work: " + typeOfWork);

        logDebug("App Type: " + appTypeString );

        if (appMatch("Permits/Sign/NA/NA") || appMatch("Permits/Online/NA/NA"))
        {
            switch (typeOfWork){
                case "Construction Noise Permit":
                case "Grand Opening Banners":
                    editAppSpecific("Permit Expiration Date", dateAdd(tStatusDate, 30));
                    logDebug( appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 30 days out");
                    break;
                case "Subdivision Sign":
                case "Subdivision Weekend Sign":
                case "Subdivision Directional Sign":
                    editAppSpecific("Permit Expiration Date", dateAdd(tStatusDate, 730));
                    logDebug(appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 2 years out");
                    break;
                case "Downtown Directional A-Frames":
                    editAppSpecific("Permit Expiration Date", dateAdd(tStatusDate, 365));
                    logDebug(appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 2 years out");
                    break;
                default:
                    editAppSpecific("Permit Expiration Date", dateAdd(tStatusDate, 180));
                    logDebug(appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 180 days out");
                    break;
            }
        }
        else 
        {
            editAppSpecific("Permit Expiration Date", dateAdd(tStatusDate, 180));
            logDebug(appTypeString  + ", default expiration date added: 180 days");
        }
    }
    else
    {
        logDebug("Criteria not met.")
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00369

*/