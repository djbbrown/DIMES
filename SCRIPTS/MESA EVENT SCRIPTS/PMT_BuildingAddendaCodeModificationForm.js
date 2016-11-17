/*===================================================================
// Script Number: 310
// Script Name: PMT_BuildingAddendaCodeModificationForm.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
When ASI field "Type of Work" = "Code Modification", require document "Code Modification Form".

** user mod **
When ASI field "Type of Work" is anything besides "Code Modification", require "Construction Documents" 

// Script Run Event: ASIUB

// Script Parents:

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

    //MRK - 10.25.2016 - based on Jody Bearden suggestion, replaced getAppSpecific with AInfo[]
    if(AInfo["Type of Work"] == "Code Modification")
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
                //MRK - 10.18.2016 - I guess i never changed to the correct required document "Code Modification Form" (facepalm) 
                if(docCategory.equals("Code Modification Form"))
                    isMatch = true;
            }

            if(!isMatch) passed = false;
        }

        //if there are no documents attached or if code modification form not attached
        //display message to user that "Construction Documents" required.
        if(!passed)
        {
            showMessage = true;
            comment("Code Modification Form Required!") 
            cancel = true;
        }
    }
    else  
    {

      // (bodell) Heather requested the requirement of "Construction Documents" on all other "Type of Work" selections
      // cut/paste (dup'ed) the code from above. not the cleanest, but wanted to get complete. refactor later

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

            //loop through document list and check the document category to see if is a Construction Documents
            for(doc in docList)
            {
                var currentDoc = docList[doc];
                var docCategory = currentDoc.getDocCategory();

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
            comment("Construction Documents are required for ths record type") 
            cancel = true;
        }

    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
     PMT16-01147 - has documents attached but no Code Modification Form
     PMT16-00986 - has Code Modification Form attached 
*/