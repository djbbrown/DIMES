/*===================================================================*/
// Script Number: 208
// Script Name: PMT_Condition_Email.js
// Script Description: Send an email ASI field Do you need a Grease Trap or Sane/Oil Interceptor is set to a value of Yes 
// Script Run Event: ASA
// Script Parents: ASA;Permits/Commercial/NA/NA
// Testing record:  PMT16-00427
// Version   |Date      |Engineer         |Details
//  1.0      |08/29/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var vEParams = aa.util.newHashtable();
    var ToEmail = lookup("EMAIL_RECIPIENTS","Industrial_Pretreatment_Supervisor");
    var GreaseTrapFlag = 0;
    
    //Get ASIT value
    var GTrapSoil = AInfo["Is your project an Industrial, Commercial, Manufacturing, Automotive or Restaurant?"];
    if(GTrapSoil == "Yes")
        {
        GreaseTrapFlag = 1;
        }
    //Add parameters
    addParameter(vEParams,"$$RECORDID$$",capIDString);
      
    //Check and send email
    if(GreaseTrapFlag == 1)
        {
        sendNotification(FromEmail, ToEmail, "", "PMT_GREASE_TRAP_CONDITION", vEParams, null, capId); 
        addAppCondition("Planning COA","Planning","Pretreat Final Required","","Required");
        }   
    }
    catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }