/*------------------------------------------------------------------------------------------------------/
| Author: SuzannaM
| Script Name: ENG_SendEmail_SWF_On15DaysLateNotice.js
| Date: January 24th, 2018
| Purpose: Sends an email notification for Small Wireless Facility Records that have not been address  
| within 15 days of submittal.
| Records that have not been Issued, Incomplete, Closed or Voided
| 
----------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------/
| Initialize the include scripts.
--------------------------------------------------------------------------------------------------------*/
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_BATCH"));
eval(getScriptText("INCLUDES_CUSTOM"));

function getScriptText(vScriptName) {
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
	return emseScript.getScriptText() + "";
}

/*------------------------------------------------------------------------------------------------------/
| Start Main Processing and sending of email
--------------------------------------------------------------------------------------------------------*/
try {
    logDebug("Starting the Batch Process : ENG_SendEmail_SWF_On15DaysLateNoticeTo");
    
    capId = "";
    var showDebug = true;
    var emailText = "";
    var initialContext = aa.proxyInvoker.newInstance("javax.naming.InitialContext", null).getOutput();
    var ds = initialContext.lookup("java:/AA");
    var conn = ds.getConnection();
    var selectString = "SELECT B1_ALT_ID, B1_APPL_STATUS,B1_FILE_DD FROM b1permit WHERE b1_per_group like 'Engineering' AND b1_per_type = 'Utilities' \
            AND B1_ALT_ID not like '%TMP%' \
            AND B1_PER_SUB_TYPE = 'Non-City' and B1_PER_CATEGORY = 'Small Wireless Facility' \
            AND SERV_PROV_CODE = 'MESA'\
            AND TO_DATE(B1_FILE_DD,'DD-MON-YYYY') <= TO_DATE(SYSDATE-15, 'DD-MON-YYYY') \
            AND B1_APPL_STATUS not like 'Issued'  \
            AND B1_APPL_STATUS not like 'Closed'";
        
    var SQLStatement = conn.prepareStatement(selectString);
    var rSet = SQLStatement.executeQuery();
    var emailString  = "";

    while (rSet.next()) {
        var permitNumber =rSet.getString("B1_ALT_ID");
        var permitStatus =rSet.getString("B1_APPL_STATUS");
        var permitFileDate = rSet.getString("B1_FILE_DD");
        emailString = emailString + "ID: "+permitNumber + " Status : "+permitStatus+ " File Date: "+ permitFileDate+ " ** ";

        }

    var params = aa.util.newHashtable();
    emailTo = lookup("EMAIL_RECIPIENTS","ENG_UTL_SWF_EMAIL");
        
    //If records are found send email high importance
    if (emailString != null && emailString != ""){
        params.put("$$LISTPMTS$$", emailString );
        logDebug("Emailing: To: "+emailTo+" Following Records" +emailString);
        sendNotification("NoReply@MesaAz.gov",emailTo,"","ENG_UTL_SWF_15DAYS_NOTICE",params,null);
    }
    //If no records found send email low importance.
    else {
        logDebug("Emailing: To: "+emailTo+" No record found" +emailString);
        sendNotification("NoReply@MesaAz.gov",emailTo,"","ENG_UTL_SWF_15DAYS_OKAY",params,null);
    }
    
    logDebug("Completed the Batch Process : ENG_SendEmail_SWF_On15DaysLateNoticeTo");
    
}
catch (e) {
    aa.print("Exception getting data from ENG_SendEmail_SWF_On15DaysLateNotice: " + e.message);
  
}
finally {
    initialContext.close();
    SQLStatement.close();
    rSet.close();    
    conn.close();
}

