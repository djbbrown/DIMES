/*===================================================================
Versions:
 9/19/2016      Vance Smith     initial
 10/25/2016     Vance Smith     modified to use getDocs()
 ---------------------------------------------------------------------

// Script Number: 311
// Script Name: PLN_DevelopmentUnitPlan.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: If ASI field "Development Unit Plan" is Checked 
// in the "Request Type" ASI subgroup, then document "Development 
// Unit Plan" is required at intake.
 
// Script Run Event: ASB

// Script Parents:
//	ASB;Planning!Planning and Zoning!NA!NA
//	ASIUB;Planning!Planning and Zoning!NA!NA  
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" /> // only for asb events!
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var docList = getDocs(); //getDocumentList(); removed on 10/25/2016
    var isDevUnitPlanChecked = (AInfo["Development Unit Plan"] == "CHECKED");
    
    if ( isDevUnitPlanChecked )
    {
        var showComment = false;
        if(docList.length == 0) {
            logDebug("Record has no attached documents");
            showComment = true;
        }
        else {
            for(doc in docList) {
                var currentDoc = docList[doc];
                //var docCategory = "" + currentDoc.getDocCategory();
                //logDebug(docCategory);
                if (currentDoc == "Development Unit Plan")
                {
                    showComment = false;
                    break;
                }
                else
                {
                    showComment = true;
                }
            }
        }

        if ( showComment )
        {
            if (publicUser) { showDebug=false; }

            logDebug("Document not found!");
            showMessage = true;
            comment("The 'Development Unit Plan' document type is required.")
            cancel = true;
        }
        else
        {
            logDebug("Document found!");
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

/* Test Record: ZON16-00238


*/