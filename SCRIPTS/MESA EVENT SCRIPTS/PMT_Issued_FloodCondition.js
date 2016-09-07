/*===================================================================
// Script Number: 130
// Script Name: PMT_Issued_FloodCondition.js
// Script Developer: Vance Smith
// Script Agency: Mesa
// Script Description: When status of Issued is applied at wf task 
// "Permit Issuance" and record is in a flood plain
 
    Add conditions:
    - Footing/Foundation Elevation
    - Elevation Certificate

// Script Run Event: WTUA

// Script Parents:
//	WTUA;Permits!~!~!~ 
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/* reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" // only for asb events!! */
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    if (taskStatus("Permit Issuance") != null && taskStatus("Permit Issuance").toUpperCase() == "ISSUED") 
    {
        logDebug("found record");
        // see if record is in a flood plain
        tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
        if (tagFieldArray && tagFieldArray.length > 0) 
        {            
            if (IsStrInArry("FLDP", tagFieldArray)) 
            {
                logDebug("record is in flood plain")
                addStdCondition("Building Permit", "Footing/Foundation Elevation");
                addStdCondition("Building Permit", "Elevation Certificate");
                logDebug("added conditions")
            }
            else
            {
                logDebug("Not in flood plan");
                for ( tag in tagFieldArray)
                {
                    logDebug(tagFieldArray[tag])
                }
            }
        }
    }
    else
    {
        logDebug("Criteria not met.")
    }
	/*
    pseudocode
    DONE 1) get wftask = "Permit Issuance"
    DONE 2) check if wftask status = "Issued"
    DONE 3) check if record is in a flood plain
    DONE 4) add conditions
            - Footing/Foundation Elevation
            - Elevation Certificate
    */
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: PMT16-00428

*/