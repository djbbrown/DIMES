//*===================================================================
// Script Number: 287
// Script Name: TCC_DaysRestricted
// Script Developer: Kevin Ford
// Script Agency: Accela
// Script Description: 
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//		ASA:Transportation/*/*/*
//		ASIUA;Transportation/*/*/*
//==================================================================*/

try
{
  loadASITables();
  var tInfo = DURATIONINFORMATION;
  var rowCount = DURATIONINFORMATION.length;
  var durationDays = 0;
  var x = 0;
  // Get the row count
  if (rowCount > 0)
  {
	  // Loop through each of the rows getting the "" and creating a sum.
    for (x=0;x<rowCount;x++)
    {
      durationDays = durationDays + parseInt(tInfo[x]["Days Restricted"]);
    }

    editAppSpecific("Total Days Restricted",parseInt(durationDays),capId);
  }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}