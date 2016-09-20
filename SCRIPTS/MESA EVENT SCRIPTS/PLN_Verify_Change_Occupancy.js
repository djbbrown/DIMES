/*===================================================================
// Script Number: 255
// Script Name: PLN_Verify_Change_Occupancy.js
// Script Description: If ASI field Has the number of clients capable of self-preservation changed? or ASI field Has the number of clients changed? 
// Has a value of Yes then add adhoc workflow task Group Home Discuss With Applicant.
// Script Run Event: ASIUA
// Script Parents:ASIUA;Planning/Group Home/Renewal/!~.js
// Test Record: GHRN16-00167
// Version   |Date      |Engineer         |Details
//  1.0      |09/20/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
    var ClientsFlag = 0;
    var CapableFlag = 0;
    var Clients;
    var Capable;

    //Get ASIT value
    var Clients = AInfo["Has the number of clients changed?"];
    if(Clients == "Yes")
        {
        ClientsFlag = 1;
        }
    
    //Get Other ASIT value
    var Capable = AInfo["Has the number of clients capable of self-preservation changed?"];
    if(Capable == "Yes")
        {
        CapableFlag = 1;
        }
    
    //Check flags
    if(ClientsFlag == 1 || CapableFlag == 1)
        {
        //Create Adhoc Workflow
        addAdHocTask("WFADHOC_PROCESS", "Group Home Discuss With Applicant", "");
        }               
                   
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }