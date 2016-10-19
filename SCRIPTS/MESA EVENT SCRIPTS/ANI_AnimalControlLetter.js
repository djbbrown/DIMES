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
            //var msg = runReportAttach(capId,"113-ANI Courtesy Notice");
            runMyReportAttach("113-ANI Courtesy Notice","CaseNbr",capId);
            }
        if(CriminalFlag == 1)
            {
            //Display Criminal report
            //var msg = runReportAttach(capId,"114-ANI Courtesy Notice");
            runMyReportAttach("114-ANI Courtesy Notice","CaseNbr",capId);
            }
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }

function runMyReportAttach(aaReportName,aaReportParamName,aaReportParamValue)
{
	var reportName = aaReportName;
 	report = aa.reportManager.getReportInfoModelByName(reportName);
	report = report.getOutput(); 
	cap = aa.cap.getCap(capId).getOutput();
	appTypeResult = cap.getCapType();
	appTypeString = appTypeResult.toString(); 
	appTypeArray = appTypeString.split("/");

	report.setModule(appTypeArray[0]); 
	report.setCapId(capId); 

	var parameters = aa.util.newHashMap(); 
	//Make sure the parameters includes some key parameters. 
	parameters.put(aaReportParamName, aaReportParamValue);

	report.setReportParameters(parameters);

	var permit = aa.reportManager.hasPermission(reportName,currentUserID); 
	if(permit.getOutput().booleanValue()) 
	{ 
		var reportResult = aa.reportManager.getReportResult(report); 

		if(reportResult) 
		{ 
			reportResult = reportResult.getOutput(); 
			var reportFile = aa.reportManager.storeReportToDisk(reportResult);

			reportFile = reportFile.getOutput();
		}
		logDebug("Report has been run for " + altID);

	}
	else
		logDebug("No permission to report: "+ reportName + " for Admin" + systemUserObj);
}