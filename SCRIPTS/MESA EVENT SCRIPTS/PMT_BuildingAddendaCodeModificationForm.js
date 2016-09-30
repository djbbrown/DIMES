/*===================================================================
// Script Number: 310
// Script Name: PMT_BuildingAddendaCodeModificationForm.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
When ASI field "Type of Work" = "Code Modification", require document "Code Modification Form".

// Script Run Event: ASB, ASIUB

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
    //MRK - 9.27.2016 - removed all logDebug references

    if(getAppSpecific("Type of Work") == "Code Modification")
    {
        var passed = true;

        //get the document list for the record
        var docList = getDocumentList();

        //if there are no documents attached to the record, failed validation
        if(docList.length == 0)
        {
            passed = false;
        }
        else
        {
            var isMatch = false;

            //loop through document list and check the document category to see if is a Code Modification Form
            for(doc in docList)
            {
                var currentDoc = docList[doc];
                var docCategory = currentDoc.getDocCategory();

                //MRK - 9.27.2016 - removed "Code Modification Form" and replaced with "Construction Documents"
                if(docCategory.equals("Construction Documents"))
                    isMatch = true;
            }

            if(!isMatch) passed = false;
        }

        //if there are no documents attached or if code modification form not attached
        //display message to user that "Construction Documents" required.
        if(!passed)
        {
            showMessage = true;
            comment("Construction Documents Required!") 
            cancel = true;
        }
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
    PMT16-00492 - has documents attached but no Construction Documents Form
    PMT16-00869 - has Construction documents attached 
*/