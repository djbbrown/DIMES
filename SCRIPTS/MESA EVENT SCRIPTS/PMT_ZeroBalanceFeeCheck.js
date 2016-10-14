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
/*==================================================================*/

try {
       var balance = 0;
       
       //Get WF Task
       var tasks = aa.workflow.getTasks(capId).getOutput();
       for (t in tasks) 
        {
            //Check for Planning Review Task
            if(tasks[t].getTaskDescription().toUpperCase() == "PLANS DISTRIBUTION")
            {
                //Check if PLANS DISTRIBUTION is active
                if(tasks[t].getActiveFlag() == "Y")
                {
                    //Check task status 
                    if (tasks[t].getDisposition().toUpperCase() == "ROUTED FOR REVIEW")
                    {
                        //Get balance due not invoiced fees
                        balance = getUnpaidFeeBalance();
                        
                        //Stop processing if Balance is not 0
                        if(balance > 0 || balanceDue > 0)
                        {
                            //Pop up message to user
                            showMessage = true;
                            comment("Deposit fees have not been paid yet. You cannot proceed.");
                            //Stop the submission
                            cancel = true;
                        }
                    }
                }
            }
        }     
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }