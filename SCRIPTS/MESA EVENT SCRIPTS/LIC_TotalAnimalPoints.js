//*===================================================================
//
// Script Number: 34
// Script Name: LIC_TotalAnimalPoints.js
// Script Developer: Brian O'Dell
// Script Agency: City of Mesa
// Script Description: 
// 		Populate the ASI field "Total Animal Points" with the sum 
//              of the column "Animal Points" across all rows of the ASIT 
//              "Animal Information"
//
// Script Run Event: ASA / ASIUA
// Script Parents:
//             ASA:Licenses/General/Livestock/Application
//             ASIUA:Licenses/General/Livestock/Application
//             ASA:Licenses/General/Livestock/Renewal
//             ASIUA:Licenses/General/Livestock/Renewal
// 
//==================================================================*/


try
{
  loadASITable("CURRENT ANIMAL INFO");
  var tInfo = CURRENTANIMALINFO;
  var rowCount = 0;
  var animalPoints = 0.0;
  var x = 0;

  if (tInfo == null)
  {
    // set to zero
    animalPoints = 0;
  } 
  else
  {
    rowCount = CURRENTANIMALINFO.length;

    // loop and sum
    for (x=0;x<=(rowCount-1);x++)
    {
      animalPoints += parseFloat(tInfo[x]["Animal Points"]);
    }
  }

  editAppSpecific("Total Animal Points", animalPoints);

}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





