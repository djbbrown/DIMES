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

        var today = new Date();          

        logDebug("App Type: " + appTypeString );

        var expDate;// = dateAdd(tStatusDate, 180); // default to 180 days out

        if (appMatch("Permits/Sign/NA/NA"))
        {
            loadASITable("SIGN INFO");
            var tInfo = SIGNINFO;
            var typeOfWork = ""; 
            if (tInfo.length > 0 ) {
                typeOfWork = "" + tInfo[0]["Type of Work"];
            }        
            logDebug("Type of Work: " + typeOfWork);

            switch (typeOfWork.trim()){
                case "Construction Noise Permit": // doesnt exist?
                case "Grand Opening Banners":
                    expDate = dateAdd(tStatusDate, 30);
                    editAppSpecific_Mesa("Permit Expiration Date", expDate);
                    logDebug( appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 30 days out");
                    break;
                case "Subdivision Sign":
                case "Subdivision Directional Sign":
                    expDate = dateAdd(tStatusDate, 730);
                    editAppSpecific_Mesa("Permit Expiration Date",expDate);
                    logDebug(appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 2 years out");
                    break;
                case "Downtown Directional A-Frames":
                case "Subdivision Weekend Sign":
                    expDate = dateAdd(tStatusDate, 365);
                    editAppSpecific_Mesa("Permit Expiration Date", expDate);
                    logDebug(appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 1 year out");
                    break;
                default: // as of this writing, this would catch: "Freeway Landmark Monument" and "Sign"
                    expDate = dateAdd(tStatusDate, 180);
                    editAppSpecific_Mesa("Permit Expiration Date", expDate);
                    logDebug(appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 180 days out");
                    break;
            }
        }
        else if (appMatch("Permits/Online/NA/NA"))
        {
            var typeOfWork = "" + getAppSpecific("Type of Work");
            if (typeOfWork == "Construction Noise Permit")
            {
                expDate = dateAdd(tStatusDate, 30)
                editAppSpecific_Mesa("Permit Expiration Date", expDate);
                logDebug( appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 30 days out");
            }
            else
            {
                expDate = dateAdd(tStatusDate, 180);
                editAppSpecific_Mesa("Permit Expiration Date", expDate );
                logDebug(appTypeString  + " and 'Type of Work' = '" + typeOfWork + "': expiration date 180 days out");
            }
        }
        else if (
            appMatch("Permits/Demolition/NA/NA") || appMatch("Permits/Residential/Mobile Home/NA") ||
            appMatch("Permits/Commercial/NA/NA") || appMatch("Permits/Residential/NA/NA")
        )
        {
            expDate = dateAdd(tStatusDate, 180);
            editAppSpecific_Mesa("Permit Expiration Date", expDate);
            logDebug(appTypeString  + ", default expiration date added: 180 days from status date");
        }

        logDebug("Exp Date: " + expDate );
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

/* Test Record: 
PMT16-00951: Banners - passed
PMT16-00833: Online - passed
PMT16-00952: Subdivision Weekend Sign - passed
PMT16-00954: Subdivision Sign - passed
PMT16-00955: Subdivision Directional Sign - passed
PMT16-00957: Downtown Directional A-Frames
PMT16-00958: Online

*/