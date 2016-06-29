//*===================================================================
//
// Script Number: 281
// Script Name: TRA_SetPermitExpirationDate.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Permit Expiration date ASI field should be auto filled 
//		with the same date that was entered by Applicant into 
//		ASIT field "Restriction End Date" (latest date)
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//             ASA:Transportation/*/*/*
// 
//==================================================================*/


try
{
  loadASITables();
  var tInfo = DURATIONINFORMATION;
  var rowCount = DURATIONINFORMATION.length;
  var theDate = new Date("01/01/1990");
  var testDate = new Date()
  var x = 0;

  for (x=0;x<rowCount;x++)
  {
    testDate = new Date(tInfo[x]["Restriction End Date"]);

    if (theDate < testDate)
    {
      theDate = new Date(tInfo[x]["Restriction End Date"]);
    }
  }

  editAppSpecific("Permit Expiration Date",jsDateToASIDate(theDate),capId);
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





