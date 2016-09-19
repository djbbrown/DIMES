/*===================================================================
// Script Number: 314
// Script Name: PMT_BuildingPermitInFloodZone.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: If the ASI group "Site Information" ASI field
// "Flood Zone" is set to "Yes" make the "Maricopa County Flood Control
// District Permit" document type Required. 
 
// Script Run Event: ASB

// Script Parents:
//	ASB;Permits!Commercial!NA!NA
//	ASB;Permits!Residential!NA!NA 
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" /> // only for asb events!
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if (getAppSpecific("Flood Zone") == "Yes" ) 
    {
        var docList = getDocumentList();

        if(docList.length == 0) {
            logDebug("Record has no attached documents");
        }
        else {
            for(doc in docList) {
                var currentDoc = docList[doc];
                var docCategory = currentDoc.getDocCategory();

                if(docCategory.toUpperCase() == "MARICOPA COUNTY FLOOD CONTROL DISTRICT PERMIT") {
                    showMessage = true;
                    comment("The 'Maricopa County Flood Control District Permit' document type is required.")
                    cancel = true;
                }
            }
        }
    }
    else
    {
        logDebug("Criteria not met.")
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 

*/