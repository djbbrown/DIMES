/*===================================================================
// Script Number: 364
// Script Name: PMT_ZeroBalanceFeeCheck.js
// Script Description: 	When wfTask Plans Distribution, performs the zero balance fee check.  If balance > 0, display message & stop processing
// Script Run Event: WTUB
// Script Parents:WTUB;Permits/Sign/NA/NA
// WTUB;Permits/Residential/NA/NA
// Permits/Commercial/NA/NA
// Permits/Master Plan/NA/NA
// Test Record: PMT16-00947
// Version   |Date      |Engineer         |Details
//  1.0      |10/12/16  |Steve Veloudos   |Initial Release
//  2.0      |10/17/16  |Steve Veloudos   |Fixed Javascript error: Cannot call method "toUpperCase" of null
//  3.0      |12/05/16  |Kevin Gurney     |Change to use function to find amounts with fee status of NEW
/*==================================================================*/

try {
       var balance = 0;

       //Get balance due not invoiced fees
       feeAmtNotInv = feeTotalByStatus("NEW");
	   //logDebug("feeAmtNotInv = " + feeAmtNotInv);

       if(wfTask == "Plans Distribution" && wfStatus == "Routed for Review")
       {
            //Stop processing if Balance is not 0
            if(feeAmtNotInv > 0 || balanceDue > 0)
            {
                //Pop up message to user
                showMessage = true;
                comment("Deposit fees have not been paid yet. You cannot proceed.");
                //Stop the submission
                cancel = true;
            }
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }