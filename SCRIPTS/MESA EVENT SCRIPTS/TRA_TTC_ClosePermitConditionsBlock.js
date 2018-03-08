/*===================================================================
// Script Number: 
// Script Name: TRA_TTC_ClosePermitConditionsBlock.js
// Script Description: 	Block submit of WF Task Inspections with WF Status "Final Inspection Complete" when there are Holds or Notices that are not "Condition Met". 
// Script Parents:WTUB;Transportation!Temporary Traffic Control!NA!NA.js
// Test Record:       
// Version   |Date      |Engineer         |Details
//  1.0      |03/08/18  |Mong Ward	      |Initial Release
//  
/*==================================================================*/

try 
{
      if(wfTask == 'Inspections' && wfStatus == 'Final Inspection Complete')         
    {
        var condResult = appHasCondition("Transportation","APPLIED",null,null);
			//logDebug("condResult = " + condResult);
			if (condResult)
			{
				showMessage = true;
				comment("All Holds & Notices must have (Not Applied) status to close this permit");
				//Stop the submission
				cancel = true;
			}
			
		
    }                
}
catch (err)
    {
      logDebug("A JavaScript Error occurred: " + err.message);
    }