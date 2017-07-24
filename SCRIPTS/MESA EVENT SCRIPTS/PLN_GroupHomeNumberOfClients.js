/*===================================================================
// Script Number: 342
// Script Name: PLN_GroupHomeNumberOfClients.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
	
Based on value selected for "Number of Clients", display error message to user. 
 
If “Number of Clients" = '1 - 5'
and "Clients Will Be” = ‘Incapable of Self-Preservation’
and "Does the house have fire sprinklers” = 'No', 
display message to user 'In order to have clients incapable of self-preservation, the home must have fire sprinklers'.
 
If “Number of Clients" = '6 - 10'
and “Clients Will Be” = ‘Incapable of Self-Preservation’, 
display message to user “If home will have 6-10 clients, all clients must be capable of self-preservation”.
 
If “Number of Clients" = '6 - 10'
and “Clients Will Be” = ‘Capable of Self-Preservation’
and “Does the house have fire sprinklers” = ‘No’, 
display message to user “In order to have 6-10 clients, the home must have fire sprinklers”.
 
If "Number of Clients" not in ('1 - 5', '6 - 10'), display message to user 'A value for Number of Clients must be selected.'

// Script Run Event: ASB and ASIUB

// Script Parents: 

//	ASB;Planning!Group Home!Application!NA
//  ASB;Planning!Group Home!Renewal!NA
//  ASIUB;Planning!Group Home!Application!NA
//  ASIUB;Planning!Group Home!Renewal!NA
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    //check to see if record type is one of the following record types:
    //Planning/Group Home/Application/NA
    //Planning/Group Home/Renewal/NA
    if(appMatch("Planning/Group Home/Application/NA") || appMatch("Planning/Group Home/Renewal/NA"))
    {
        var validationErrMsg = "";
        var passedCriteria = false;
        //get the value from the ASI field "Number of Clients"
        var numberOfClients = "" + AInfo["Number of Clients"];

        if(numberOfClients != "null" && numberOfClients.length > 0) {
            //get the value from the ASI field "Clients Will Be"
            var clientsWillBe = "" + AInfo["Clients Will Be:"].toUpperCase();
            var doesTheHouseHaveFireSprinklers = "" + AInfo["Does the house have fire sprinklers?"].toUpperCase();

            switch(numberOfClients)  {
                case "1 - 5":
                    if(clientsWillBe == "INCAPABLE OF SELF-PRESERVATION" && doesTheHouseHaveFireSprinklers == "NO") {
                        validationErrMsg = "In order to have clients incapable of self-preservation, the home must have fire sprinklers.";
                    }
                    else 
                        passedCriteria = true;
                    
                    break;

                case "6 - 10":
                    if(clientsWillBe == "INCAPABLE OF SELF-PRESERVATION") {
                        validationErrMsg = "If home will have 6-10 clients, all clients must be capable of self-preservation.";
                    }
                    else if(clientsWillBe == "CAPABLE OF SELF-PRESERVATION" && doesTheHouseHaveFireSprinklers == "NO") {
                        validationErrMsg = "In order to have 6-10 clients, the home must have fire sprinklers.";
                    }
                    else
                        passedCriteria = true;
                    
                    break;

                default:
                    validationErrMsg = "A value for 'Number of Clients' must be selected";
                    break;
            }
        }
        else {
            validationErrMsg = "A value for 'Number of Clients' must be selected";
        }

        if(!passedCriteria) {
            if (publicUser) { showDebug=false; }

            showMessage = true;
            comment(validationErrMsg);
            cancel = true;
        }
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* Test Record: 
    GHAP16-00192: Number of Clients: 1 - 5, Clients Will Be: Incapable of Self-Preservation, Does the house have fire sprinkers: No
    GHAP16-00244: Number of Clients: 6 - 10, Clients Will Be: Incapable of Self-Preservation 
    GHAP16-00206: Number of Clients: 6 - 10, Clients Will Be: Capable of Self-Preservation, Does the house have fire sprinklers: No
*/