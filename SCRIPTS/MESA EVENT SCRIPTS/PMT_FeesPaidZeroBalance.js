//*===================================================================
//
// Issue SP #:165 
// Script Name: PMT_FeesPaidZeroBalance.js
// Script Developer: Mong Ward
// Script Agency: City of Mesa
// Script Description: 
// 		When record status is "Fees Due" and payment is received so that balance on record is = $0.00
//		Then change the status of record to "Fees Paid"
//		(Copied from TRA_TTC_FeesPaidZeroBalance.js)
//
// Script Run Event: PaymentRecievedAfter
// Script Parents:
//             	PRA;Permits!Addenda or Deferred!~!~.js
//				PRA;Permits!Commercial!~!~.js
//				PRA;Permits!Demolition!NA!NA.js
//				PRA;Permits!Document Retrieval!NA!NA.js
//				PRA;Permits!Master Plan!NA!NA.js
//				PRA;Permits!Residential!~!~.js
//				PRA:Permits!Sign!NA!NA.js
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
