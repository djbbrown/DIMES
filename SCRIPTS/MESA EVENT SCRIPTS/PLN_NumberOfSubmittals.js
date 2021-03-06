//*===================================================================
//
// Script Number: 153
// Script Name: PLN_NumberOfSubmittals.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		When the task 
//		"Substantive Review Distribution" 
//		is set to a status of 
//		"Distributed" or "Resubmitted" 
//		increment the value in the asi field "Number of Submittals"
//		
//		Current workflow task names:
//		Planning/Design Review - Distribution
//		Planning/Group Home - Distribution
//		Planning/Subdivision - Distribution
//		Planning/General Plan Amendment � Major - Distribution
//		Planning/Planning and Zoning - Substantive Review Distribution
//		Planning/Annexation - Substantive Review Distribution
//		Planning/Admin Review - Distribution
//		Planning/Board of Adjustment - Distribution
//		NOTE: Config change: make Annexation & P&Z match the others
//
// Script Run Event: WTUA
// Script Parents:
//              WTUA;Planning/~/~/~
// 
//==================================================================*/

try
{
  if (
	(appMatch("Planning/Design Review/NA/NA")) ||
	(appMatch("Planning/Group Home/Application/NA")) ||
	(appMatch("Planning/Subdivision/NA/NA")) ||
	(appMatch("Planning/General Plan Amendment � Major/NA/NA")) ||
	(appMatch("Planning/Planning and Zoning/NA/NA")) ||
	(appMatch("Planning/Annexation/NA/NA")) ||
	(appMatch("Planning/Admin Review/NA/NA")) ||
	(appMatch("Planning/Board of Adjustment/NA/NA"))	
	)
  {

    if (
        (wfTask == "Distribution") 
        && 
        ((wfStatus == "Distributed") || (wfStatus == "Resubmitted"))
       )
    {
    
      var numOfSubmittals = AInfo["Number of Submittals"];

      if (numOfSubmittals == null)
      {
        numOfSubmittals = 0;
      }

      numOfSubmittals++;

      editAppSpecific("Number of Submittals", numOfSubmittals)

    }

  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



