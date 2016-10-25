/*===================================================================
// Script Number: 292
// Script Name: TRA_TTC_Final_Inspection_Complete.js
// Script Description: 	Prevent Final Inspection to status OK if fees are due and Steel Plate in ROW condition doe not have a status of Condition Met
// Script Parents:ISB;Transportation!~!~!~.js
// Test Record: TTC16-00028
// Version   |Date      |Engineer         |Details
//  1.0      |09/15/16  |Steve Veloudos   |Initial Release
//  2.0      |10/25/16  |Steve Veloudos   |Added unpaid non invoiced balance due
/*==================================================================*/

try {

      var balance;
      var CondFlag = 0;
      var BalanceDueFlag = 0;
      var FinalInspectionFlag = 0;
      var UnpaidBalance;

      //Get balance due not invoiced fees
      UnpaidBalance = getUnpaidFeeBalance();
      
      //Get balance due 
       balance = balanceDue;
       if(balance > 0 || UnpaidBalance > 0)
       {
         BalanceDueFlag = 1;  
       }
        
        //Get Conditions
        var condResult = aa.capCondition.getCapConditions(capId);
            if (condResult.getSuccess())
            {
                var capConds = condResult.getOutput();
                for (cc in capConds) 
                {
                var thisCond = capConds[cc];
                var cDesc = thisCond.getConditionDescription().toUpperCase();
                if(cDesc == "STEEL PLATE IN ROW")
                    {
                        //Get condition status
                        var CondStatus = thisCond.getConditionStatus().toUpperCase();
                        if(CondStatus == "CONDITION MET")
                        {
                            CondFlag = 1;
                        }

                    }
                }
            }
      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	    var inspectionScriptModels = getInspectionsResult.getOutput();
	    var inspectionScriptModel = null;

            //Check if Inspection is Final Inspection
            for (inspectionScriptModelIndex in inspectionScriptModels)
                {
                    inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
                    if (inspectionScriptModel.getInspectionType().toUpperCase() == "FINAL INSPECTION")
                    {
                       //Check for OK
                       if (inspectionScriptModel.getInspectionStatus().toUpperCase() == "OK")
                       {
                           FinalInspectionFlag = 1;
                       }
                    }
                }
      }
      //Check final inspection flag
      if(FinalInspectionFlag == 1)
      {
         //If there is a balance due or the Condition flag not true stop submission
          if(BalanceDueFlag == 1 || CondFlag != 1)
          {
            //Pop up message to user
            showMessage = true;
            comment("The Steel Plate in ROW condition must have a status of Condition Met(Not Applied), or there is a balance due.");
            //Stop the submission
            cancel = true;
          }
      }
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }