/*===================================================================
// Script Number: 310
// Script Name: PMT_BuildingAddendaCodeModificationForm.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
When ASI field "Type of Work" = "Code Modification", require document "Code Modification Form".

// Script Run Event: ASA, ASIUA

// Script Parents:

//	ASB;Permits!Addenda or Deferred!NA!NA
//	ASIUB;Permits!Addenda or Deferred!NA!NA

//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if(getAppSpecific("Type of Work") == "Code Modification")
    {
        var passed = true;

        logDebug("Criteria Met!");

        //get the document list for the record
        var docList = getDocumentList();

        //if there are no documents attached to the record, failed validation
        if(docList.length == 0)
        {
            logDebug("No documents attached to record!");
            passed = false;
        }
        else
        {
            logDebug("Documents attached to record.  Checking if 'Code Modification Form' is attached.");
            var isMatch = false;

            //loop through document list and check the document category to see if is a Code Modification Form
            for(doc in docList)
            {
                var currentDoc = docList[doc];
                var docCategory = currentDoc.getDocCategory();

                if(docCategory.equals("Code Modification Form"))
                    isMatch = true;
            }

            if(!isMatch) passed = false;
        }

        //if there are no documents attached or if code modification form not attached
        //display message to user that "Code Modification Form" required.
        if(!passed)
        {
            logDebug("'Code Modification Form' not attached");
            showMessage = true;
            comment("Code Modification Form Required!") 
            cancel = true;
        }
        else
        {
            logDebug("'Code Modification Form' attached");
        }
    }
    else 
    {
        logDebug("Criteria Not Met!");

    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
    PMT16-00492 - has documents attached but no Code Modification Form
    PMT16-00576 - has Code Modification Form document attached 
*/