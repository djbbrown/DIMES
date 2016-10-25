/*===================================================================
// Script Number: 310
// Script Name: PMT_BuildingAddendaCodeModificationForm_ASBOnly.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
When ASI field "Type of Work" = "Code Modification", require document "Code Modification Form".

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

        //get the document list for the record
        var docList = aa.env.getValue("DocumentModeList");

        if((docList == null) || (docList == "")) {
            docList = aa.document.getDocumentListByEntity(capId.toString(), "TMP_CAP").getOutput();
            docListCount = docList.size();
        }
        else
            docListCount = docList.size();

        //if there are no documents attached to the record, failed validation
        if(docListCount > 0)
            passed = false;
        else
        {
            var isMatch = false;

            //loop through document list and check the document category to see if is a Code Modification Form
            for(x = 0; x < docListCount; x++) {
                if((docList.get(x) != null) && (docList.get(x).getDocCategory == "Code Modification Form"))
                {
                    isMatch = true;
                    break;
                }
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
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
     PMT16-01147 - has documents attached but no Code Modification Form
     PMT16-00986 - has Code Modification Form attached 
*/