/*===================================================================
// Script Number: 282
// Script Name: TRA_TTC_Steel_Plate.js
// Script Description: 	If wfTask Inspections is resulted with Steel Plate in ROW, add Condition Steel Plate in ROW to record.
// Script Parents:IRSA;Transportation!~!~!~.js
// Test Record: TTC16-00024
// Version   |Date      |Engineer         |Details
//  1.0      |09/19/16  |Steve Veloudos   |Initial Release
//  2.0      |11/22/16  |Steve Veloudos   |Adj to fix multipule conditions added
//	3.0		 |11/22/16  |Mong Ward	      |Adj to fix multiple conditions added - Check if condition exists
/*==================================================================*/

try {
      if (inspType == "Final Inspection" && inspResult == "Steel Plate in ROW")
        {
			var steelPlate = doesCapConditionExist("Steel Plate in ROW");
			//logDebug("afterHrsCond = " + afterHrsCond);
			if (!steelPlate)
			{
				addStdCondition("Transportation","Steel Plate in ROW");
				showMessage = true;
				comment("Steel Plate condition Hold - See Holds and Notices");
			}
		}
                            
    }
catch (err)
    {
      logDebug("A JavaScript Error occurred: " + err.message);
    }