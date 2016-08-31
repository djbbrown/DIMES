//*===================================================================
//
// Script Number: 230
// Script Name: ENF_PopulateViolationOrdinance.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
//		Populate ASIT column "Violation Ordinance" in ASIT 
//		VIOLATION INFORMATION based on column Violation Code.
//		Ordinance List can be found in Standard Conditions ENFORCEMENT
//
// Script Run Event: ASA, ASIUA
// Script Parents:
//		ASA;Enforcement/Case/Code Sign Issue/NA
//		ASIUA;Enforcement/Case/Code Sign Issue/NA
// 
//==================================================================*/

try
{

  loadASITable("VIOLATION INFORMATION");
  var tInfo = VIOLATIONINFORMATION;
  var tInfoCount = tInfo.length;
  var newTable = new Array();

  //mkyOutput += " tInfoCount: " + tInfoCount + " \r";

  var conditionType = "Enforcement";
  var conditionName = "";  //"Political and campaign signs";  // test case
  var conditionComment = "";
  var x = 0;


  for(var eachRow in tInfo)
  {
    var thisRow = tInfo[eachRow];
    //mkyOutput += "   thisRow[Violation Code]: " + thisRow["Violation Code"] + " \r";
    //mkyOutput += "   thisRow[Violation Description]: " + thisRow["Violation Description"] + " \r";
  
    conditionName = thisRow["Violation Description"];
  
    if (!aa.capCondition.getStandardConditions) 
    {
      //mkyOutput += "Standard Condition functions are not available in this version of Accela Automation.";
      logDebug("addStdCondition function is not available in this version of Accela Automation.");
    } 
    else 
    {
      //mkyOutput += "Standard Condition functions are available. \r";
  
      var standardConditions = aa.capCondition.getStandardConditions(conditionType, conditionName).getOutput();
      //mkyOutput += "  standardConditions length: " + standardConditions.length + " \r";
  
      for (x=0; x<standardConditions.length; x++)
      {
        var standardCondition = standardConditions[x];
        conditionComment = standardCondition.getConditionComment();
        //mkyOutput += "   conditionComment: " + conditionComment + " \r";
  
        thisRow["Violation Ordinance"] = new asiTableValObj("Violation Ordinance", conditionComment, "N");
      }
    }

    newTable.push(thisRow);

  }

  removeASITable("VIOLATION INFORMATION");
  addASITable("VIOLATION INFORMATION", newTable);

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}



