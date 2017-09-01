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
//

//Start Script 
try 
 {

if (capStatus == "Fees Due" && balanceDue == 0) 
	{
		updateAppStatus("Fees Paid","Set via script")
		comment("All fees have been paid.  Balance is $0.00");
        
    }

 
 
 }
 catch (err) 
 { 
   logDebug("A JavaScript error occurred: " + err.message); 
 } 
 
//End Script 
