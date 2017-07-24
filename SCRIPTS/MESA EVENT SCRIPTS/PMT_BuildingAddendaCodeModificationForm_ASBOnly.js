/*===================================================================
// Script Number: 310
// Script Name: PMT_BuildingAddendaCodeModificationForm_ASBOnly.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
When ASI field "Type of Work" = "Code Modification", require document "Code Modification Form".

** user mod **
When ASI field "Type of Work" is anything besides "Code Modification", require "Construction Documents" 

// Script Run Event: ASB

// Script Parents:

//	ASB;Permits!Addenda or Deferred!NA!NA
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
        var docListCount = 0;
        var passed = true;

        //MRK - 10.25.2016 - Modified the script to use the suggested method for getting documents from a record that has not been
        //submiited yet

        //MRK - 11.07.2016 - fixed docList call by replacing "DocumentModeList" with "DocumentModelList" 

        //get the document list for the record
        var docList = aa.env.getValue("DocumentModelList");

        if((docList == null) || (docList == "")) {
            docList = aa.document.getDocumentListByEntity(capId.toString(), "TMP_CAP").getOutput();
            docListCount = docList.size();
        }
        else
            docListCount = docList.size();

        //MRK 11.07.2016 - Fixed bug where it was not firing when there was no documents attached to record
        //MRK 11.07.2016 - fixed another bug where the getDocCategory call was incorrect

        //if there are no documents attached to the record, failed validation
        if(docListCount > 0)
        {
            var isMatch = false;

            //loop through document list and check the document category to see if is a Code Modification Form
            for(x = 0; x < docListCount; x++) {
                if((docList.get(x) != null) && (docList.get(x).getDocCategory() == "Code Modification Form"))
                {
                    isMatch = true;
                    break;
                }
            }

            if(!isMatch) passed = false;
        }
        else 
            passed = false;

        //if there are no documents attached or if code modification form not attached
        //display message to user that "Construction Documents" required.
        if(!passed)
        {
            if (publicUser) { showDebug=false; }
            showMessage = true;
            comment("Code Modification Form Required!") 
            cancel = true;
        }
    }
    else
    {
        // (bodell) Heather requested the requirement of "Construction Documents" on all other "Type of Work" selections
        // cut/paste (dup'ed) the code from above. not the cleanest, but wanted to get complete. refactor later

        var docListCount = 0;
        var passed = true;

        //get the document list for the record
        var docList = aa.env.getValue("DocumentModelList");

        if((docList == null) || (docList == "")) 
        {
            docList = aa.document.getDocumentListByEntity(capId.toString(), "TMP_CAP").getOutput();
            docListCount = docList.size();
        }
        else
        {
            docListCount = docList.size();

            //if there are no documents attached to the record, failed validation
            if(docListCount > 0)
            {
                var isMatch = false;
    
                //loop through document list and check the document category to see if it is a Construction Documents
                for(x = 0; x < docListCount; x++) {
                    if((docList.get(x) != null) && (docList.get(x).getDocCategory() == "Construction Documents"))
                    {
                        isMatch = true;
                        break;
                    }
                }

                if(!isMatch) passed = false;
            }
            else 
                passed = false;

            //if there are no documents attached or if code modification form not attached
            //display message to user that "Construction Documents" required.
            if(!passed)
            {
                if (publicUser) { showDebug=false; }
                showMessage = true;
                comment("Construction Documents is required for this record type") 
                cancel = true;
            }

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