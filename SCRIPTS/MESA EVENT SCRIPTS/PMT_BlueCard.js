/*===================================================================
// Script Number: 421
// Script Name: PMT_BlueCard.js
// Script Description: 	When the workflow task Permit Issuance is set to a status of Issued, print the PMT_BlueCard report
// Script Run Event: WTUA
// Script Parents:WTUA;​Permits!~!~!~
// Version   |Date      |Engineer         |Details  
//  1.0      |07/24/17  |Steve Allred     |Initial Release  
/*==================================================================*/

try {
       var BlueCard = 0;
	   var ServType;

       //Check Workflow
       if(wfTask == "Permit Issuance" && wfStatus == "Issued")
       {
		   //Commercial and Residential
		   If (appMatch("Permits/Commercial/NA/NA") || appMatch("Permits/Residential/NA/NA")) 
		   {
			   //Check for Water Meters in Utility Service Information ASIT
				loadASITables();
				var tInfo = UTILITYSERVICEINFORMATION;
				var rowCount = UTILITYSERVICEINFORMATION.length;
				var x = 0;
				
				//Iterate and check Service Type
				for (x=0;x<=(rowCount-1);x++)
				{
				   ServType = tInfo[x]["Service Type"];
				   
					//Check criminal
				   if (ServType == "Water Meter: Domestic" || ServType == "Water Meter: Landscaping")
				   {
					  BlueCard = 1; 
				   }
				}
		   }

		   //Mobile Home
		   If (appMatch("Permits/Residential/Mobile Home/NA")) 
		   {
			   //Check for Water Meters in Utility Service Information ASIT
				loadASITables();
				var tInfo = UTILITYSERVICEINFO;
				var rowCount = UTILITYSERVICEINFO.length;
				var x = 0;
				
				//Iterate and check Service Type
				for (x=0;x<=(rowCount-1);x++)
				{
				   ServType = tInfo[x]["Service Type"];
				   
					//Check criminal
				   if (ServType == "Water Meter: Domestic" || ServType == "Water Meter: Landscaping")
				   {
					  BlueCard = 1; 
				   }
				}
		    }
			
			if(BlueCard == 1)
            {
				//Display Blue Card report
				runReportAttach(capId,"235-PMT_BlueCard","PermitNbr", capId.getCustomID());
            }
		}
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }