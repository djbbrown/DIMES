/*===================================================================
// Script Number: 022
// Script Name:ENF_CitationIssuedWFUpdate.js
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Update workflow task and schedule additional Inspection based on Insp result
// Script Run Event: IRSA
// Script Parents:
//	IRSA;Enforcement!Case!Code Sign Issue!~ 
//             
/*==================================================================*/

if ((inspType == "Initial Inspection" || inspType == "Follow-Up Inspection") && inspResult == "Citation Issued") {
  If (!isTaskActive("Citation Inspection")) {
    	if( isTaskActive("Initial Inspection") ) {
		loopTask("Initial Inspection","Citation Issued","Closed by Script","Closed by Script");
	}
	if( isTaskActive("Follow-Up Inspection") ) {
		branchTask("Follow-Up Inspection","Citation Issued","Closed by Script","Closed by Script");
	}
   }
	
}

