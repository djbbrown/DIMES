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
//		Planning/General Plan Amendment – Major - Distribution
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
	(appMatch("Planning/Board of Adjustment/NA/NA")) ||
	(appMatch("Planning/Planning and Zoning/NA/NA"))
	)
  {    
    
    var numOfSubmittals = AInfo["Number of Submittals"];

    if (numOfSubmittals == null)
    {
      //mkyOutput += "Number of Submittals is null \r";
      numOfSubmittals = 0;
    }

    //mkyOutput += "numOfSubmittals: "+ numOfSubmittals +" \r";

    numOfSubmittals++;
    //mkyOutput += "numOfSubmittals: "+ numOfSubmittals +" \r";

    editAppSpecific("Number of Submittals", numOfSubmittals)

  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



