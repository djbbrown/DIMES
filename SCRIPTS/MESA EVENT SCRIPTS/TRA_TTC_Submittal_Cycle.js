/*=================================================================== 
// Script Number:  379
// Script Name: TRA_TTC_Submittal_Cycle.js 
// Script Developer: Mong Ward 
// Script Agency: Mesa 
// Script Description: When status of "Revisions Required" is applied  
// to wf task "Traffic Review" then add 1 to the "Submittal Cycle"  
// value. Number should be increased by 1 for each time this occurs. 
 
// Script Run Event: WTUA 
  
// Script Parents: 
//	WTUA;Transportation!~!~!~ 

//             
/*==================================================================*/ 
 
 
/* intellisense references */ 
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" /> 
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" /> 
/// <reference path="../../INCLUDES_CUSTOM.js" /> 
 
 
try 
 { 
     if ( wfTask == "Traffic Review" && wfStatus == "Revisions Required" )  
     { 
         comment("Criteria met for script."); 
 
 
         var revisions = getAppSpecific("Submittal Cycle"); 
         if ( revisions == null )  
         { 
             revisions = 1; 
         } 
         else 
         { 
             revisions = parseInt(revisions); 
         } 
         comment("Revisions: " + revisions); 
 
 
         revisions++; // increment by one 
 
 
         editAppSpecific_Mesa("Submittal Cycle", revisions ); 
 
 
         comment("Updated Revisions to " + revisions ); 
     } 
     else 
     { 
         comment("Criteria not met.") 
     } 
 } 
 catch (err) 
 { 
   logDebug("A JavaScript error occurred: " + err.message); 
 } 
 
 
 /* Test Record:  
  
 */ 
