//*===================================================================
//
// Issue SP #:165 
// Script Name: PMT_FeesPaidZeroBalance.js
// Script Developer: Mong Ward
// Script Agency: City of Mesa
// Script Description: 
// 		When record status is "Fees Due" and payment is received so that balance on record is = $0.00
//		Then change the status of record to "Fees Paid"
//
// Script Run Event: PRA
// Script Parents:
//             PRA:Permits!Sign!NA!NA.js
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
