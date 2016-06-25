//*===================================================================
// Script Number: 34
// Script Name: LIC_TotalAnimalPoints.js 
// Script Developer: Brian ODell
// Script Agency: Accela
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

loadASITables();
var tInfo = CURRENTANIMALINFO;
var rowCount = CURRENTANIMALINFO.length;
var animalPoints = 0;
var x = 0;

mkyOutput += "rowCount: " + rowCount + " \r";

if (tInfo == null)
{
  // set to zero
  animalPoints = 0;
} 
else
{
  // loop and sum
  for (x=0;x<=(rowCount-1);x++)
  {
    animalPoints += tInfo[x]["Animal Points"];
  }
}
