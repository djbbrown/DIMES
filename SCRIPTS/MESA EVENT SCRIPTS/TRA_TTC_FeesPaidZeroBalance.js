//*===================================================================
//
// Script Number: 
// Script Name: TRA_TTC_FeesPaidZeroBalance.js
// Script Developer: Mong Ward
// Script Agency: City of Mesa
// Script Description: 
// 		When record status is "Fees Due" and payment is received in ACA so that balance on record is = $0.00
//		Then hange the status of record to "Fees Paid"
//
// Script Run Event: PRA
// Script Parents:
//             PRA:Transportation/Temporary Traffic Control/*/*
// 
//==================================================================*/
/* intellisense references */
/

//Start Script 

try
{
var wfTaskStatusCheck = false;
if (capStatus == "Fees Due" && (isTaskActive("Permit Issuance") || isTaskActive("Final Decision")) && balanceDue == 0) 
	{
	var wfTaskStatusCheck = true;
	}        
    {
        updateTask("Permit Issuance", "Fees Paid", "Updated by PRA event", "Updated by PRA event");
		updateTask("Final Decision", "Fees Paid", "Updated by PRA event", "Updated by PRA event");
		comment("All fees have been paid.  Balance is $0.00");
        
    }

 
 }
 catch (err) 
 { 
   logDebug("A JavaScript error occurred: " + err.message); 
 } 
 
//End Script 