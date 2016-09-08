/*===================================================================
// Script Number: 293
// Script Name: TRA_TTC_Traffic_Restrictions_Notes.js
// Script Description: Make the Notes field required if Multiple Lanes or Left Turn Lane (Exclusive) is selected. 
// Display message. when Left Turn Lane (Exclusive) is selected Describe if there are any left turn prohibitions.
// Script Run Event: ASB
// Script Parents:ASB;Transportation!~!~!~.js
// ASIUB;Transportation!~!~!~.js
// Testing record: TTC2016-00845
// Version   |Date      |Engineer         |Details
//  1.0      |09/07/16  |Steve Veloudos   |Initial Release 
/*==================================================================*/

try {
    var MultipleLanes;
    var LeftTurnLane;
    var ConditionFlag;
    var ConditionFlag2;
    var Notes;
    //Load Data
    loadASITables();
    var tInfo = TRAFFICRESTRICTIONINFO;
    var rowCount = TRAFFICRESTRICTIONINFO.length;
    var x = 0;

    //Iterate and check data
    for (x=0;x<=(rowCount-1);x++)
    {
        ConditionFlag = 0;
        ConditionFlag2 = 0;
        MultipleLanes = tInfo[x]["No. of Lanes Closed in this Direction"];
        LeftTurnLane = tInfo[x]["Lane Type"];
        Notes = tInfo[x]["Notes"];
        
        if(MultipleLanes > 1 || LeftTurnLane == "Left Turn Lane (Exclusive)")
        {
           ConditionFlag = 1; 
        }
        if(Notes.length == 0)
        {
            ConditionFlag2 = 1; 
        }

        //Set condition
        if(ConditionFlag == 1 && ConditionFlag2 == 1)
        {
            //Pop up message to user
            //showMessage = true;
            //comment("When Left Turn Lane (Exclusive) is selected, describe if there are any left turn prohibitions.");
            //Stop the submission
            //cancel = true;
            //Break out of the loop
            break;
        }  
    }
       
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }