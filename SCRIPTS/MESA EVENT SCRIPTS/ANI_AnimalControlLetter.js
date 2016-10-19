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
            
            //Iterate and check Citation Category
            for (x=0;x<=(rowCount-1);x++)
            {
               CCategory = tInfo[x]["Citation Category"];
               
               //Check civil
               if (CCategory == "Title 6 Civil" || CCategory == "Title 8")
               {
                  CivilFlag = 1; 
               }
               //Check criminal
               if (CCategory == "Title 6 Criminal")
               {
                  CriminalFlag = 1; 
               }

            }
        if(CivilFlag == 1)
            {
            //Display Civil report
            //runReportAttach(capId,"113-ANI Courtesy Notice");
            RunMyReport("113-ANI Courtesy Notice");
            }
        if(CriminalFlag == 1)
            {
            //Display Criminal report
            //runReportAttach(capId,"114-ANI Courtesy Notice");
             RunMyReport("114-ANI Courtesy Notice");
            }
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }

    RunMyReport(ReportName)
    {
        try{
            // Step 1.  Get Report Model by ReportName
            var reportInfoResult = aa.reportManager.getReportInfoModelByName(reportName);
            
            // Step 2. Initialize report
            report = reportInfoResult.getOutput();
            report.setModule(module);
            report.setCapId(capIDString);
            report.setReportParameters(reportParameters);
            
            // Step 3. Check permission on report
            var permissionResult = aa.reportManager.hasPermission(reportName,reportUser);
            
            // Step 4. Run report
            var reportResult = aa.reportManager.getReportResult(report);
          
           // Step 5, Store Report File to harddisk
            reportResult = reportResult.getOutput();
            var reportFileResult = aa.reportManager.storeReportToDisk(reportResult);

        }
        catch(err)
        {
		logError("One error occurs. Error description: " + err );
        }
    }