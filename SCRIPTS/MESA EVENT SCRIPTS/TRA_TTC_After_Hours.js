/*===================================================================
// Script Number: 289
// Script Name: TRA_TTC_After_Hours.js
// Script Description: When Saturday Restriction or Sunday Restriction is selected as Y,  Add condition to hold issuance of 
// Permit until After Hours work permit is obtained.
// Script Run Event: ASA
// Script Parents:ASA;Transportation!~!~!~.js
// ASIUA;Transportation!~!~!~.js
// Testing record: TTC2016-00845
// Version   |Date      |Engineer         |Details
//  1.0      |09/07/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
    var SatRestrict;
    var SunRestrict;
    var ConditionFlag = 0;

    //Load Data
    loadASITables();
    var tInfo = DURATIONINFORMATION;
    var rowCount = DURATIONINFORMATION.length;
    var x = 0;

    //Iterate and check restrictions
    for (x=0;x<=(rowCount-1);x++)
    {
        SatRestrict = tInfo[x]["Saturday Restriction"];
        SunRestrict = tInfo[x]["Sunday Restriction"];

        if(SatRestrict == "Yes" || SunRestrict == "Yes")
        {
           ConditionFlag = 1; 
        }
    }
  
    //Set condition
    if(ConditionFlag == 1)
    {
         addAppCondition("Transportation","Applied(Applied)","After Hours or Saturday/Sunday Restriction","Permit cannot be issued until After Hours Work Permit is obtained.","Hold");
    }
       
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }