/*===================================================================
// Script Number: 378
// Script Name: ENG_IssuePermitFeeBalanceCheck.js
// Script Developer: Mong Ward
// Script Agency: Accela
// Script Description: Prevent the status of "Issued" being set on the workflow task "Permit Issuance" if there is a balance due or assessed fees on the record that have not been invoiced.
//						Also prevent Inspectins WFtask to final out if there is a balance due or assessed fees on the record that have not been invoiced.
// Script Run Event: WorkflowTaskUpdateBefore
// Script Parents:
//            WTUB;Engineering!Right of Way!~!~
//			  WTUB;​Engineering/Utilities/Non-City/Standard
/*==================================================================*/

// Under this line create the function that will need to run at script runtime.
// the function will be called in the event ("WorkflowTaskUpdateBefore") major event.

try {
       var balance = 0;

       //Get balance due not invoiced fees
       feeAmtNotInv = feeTotalByStatus("NEW");
	   comment("feeAmtNotInv = " + feeAmtNotInv);

       if(wfTask == "Permit Issuance" && wfStatus == "Issued")
       {
            //Stop processing if Balance is not 0
            if(feeAmtNotInv > 0 || balanceDue > 0)
            {
                //Pop up message to user
                showMessage = true;
                comment("Fees must be paid before issuing this permit.");
                //Stop the submission
                cancel = true;
            }
       }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }