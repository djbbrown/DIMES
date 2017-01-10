/*===================================================================
// Script Number: 358
// Script Name: ANI_AnimalControlLetter.js
// Script Description: 	When the workflow task Animal Control Officer is set to a status of Letter Sent then if the ASIT Violation Information field Citation Category:
// 1) ARS - do nothing
// 2) Title 6 Civil OR Title 8 - create Civil Courtesy Notice report
// 3) Title 6 Criminal - create Criminal Courtesy Notice report
// Script Run Event: WTUA
// Script Parents:WTUA;​Animal Control!~!~!~
// Version   |Date      |Engineer         |Details
//  1.0      |10/18/16  |Steve Veloudos   |Initial Release  
//  2.0      |01/09/17  |Steve Veloudos   |Reversed Civil & Criminal reports
//  3.0      |01/10/17  |Steve Veloudos   |Look at Violation Code Added new criteria for criminal else civil
/*==================================================================*/

try {
       var CivilFlag = 0;
       var CriminalFlag = 0; 
       var CCategory;

       //Check Workflow
       if(wfTask == "Animal Control Officer" && wfStatus == "Letter Sent")
       {
           //Check Violation Info ASIT Citation Category
            loadASITables();
            var tInfo = VIOLATIONINFORMATION;
            var rowCount = VIOLATIONINFORMATION.length;
            var x = 0;
            
            //Iterate and check Violation Code
            for (x=0;x<=(rowCount-1);x++)
            {
               CCategory = tInfo[x]["Violation Code"];
               
                //Check criminal
               if (CCategory == "6-4-3" || CCategory == "6-4-7(C)" || CCategory == "6-4-7(D)" || CCategory == "6-4-9" || CCategory == "ARS 13-2910")
               {
                  CriminalFlag = 1; 
               }
               //Else Civil
               else
               {
                  CivilFlag = 1; 
               }

            }
        if(CivilFlag == 1)
            {
            //Display Civil report
            runReportAttach(capId,"114-ANI Courtesy Notice","CaseNbr", capId.getCustomID());
            }
        if(CriminalFlag == 1)
            {
            //Display Criminal report
            runReportAttach(capId,"113-ANI Courtesy Notice","Alt_ID", capId.getCustomID());
            }
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }