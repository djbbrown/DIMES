/*===================================================================
// Script Number: 282
// Script Name: TRA_TTC_Steel_Plate.js
// Script Description: 	If wfTask Inspections is resulted with Steel Plate in ROW, add Condition Steel Plate in ROW to record.
// Script Parents:IRSA;Transportation!~!~!~.js
// Test Record: TTC16-00024
// Version   |Date      |Engineer         |Details
//  1.0      |09/19/16  |Steve Veloudos   |Initial Release
//  2.0      |11/22/16  |Steve Veloudos   |Adj to fix multipule conditions added
/*==================================================================*/

try {
      if (inspResult.toUpperCase() == "STEEL PLATE IN ROW")
        {
        addAppCondition("Transportation","Applied(Applied)","Steel Plate in ROW","","Required");
        }                    
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }