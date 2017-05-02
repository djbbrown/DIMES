/*===================================================================
Versions:
 94/20/2017	    Steve Allred		initial
 ---------------------------------------------------------------------
// Script Number: 411
// Script Name: PMT_Initialize_Submittal_Cycle.js
// Script Developer: Steve Allred
// Script Agency: Mesa
// Script Description:  Initialize the Submittal Cycle (Short Notes) Field with the value of "1"
// Script Run Event: ASA
// Script Parents:
//        ASA;Permits!NA!NA!NA 
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
	updateShortNotes("1");
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}
