/*===================================================================
// SP Issue: 73
// Script Name: TRA_TTC_SetRecordPermitExpirationDate.js
// Script Description: 	When the workflow task Permit Issuance is set to a status Issued or workflow task Inspections is set to Extend permit
//                      copy the permit expiration date from ASI field Permit Expiration date to system expiration date field
//                      set Permit Expiration Date as follows:
//						   Transportation!Temporary Traffic Control!NA!NA - ASI field
//
// Script Run Event: WTUA
// Script Parents:   WTUA;Transportation!Temporary Traffic Control!NA!NA
//
// Version   |Date      |Engineer         |Details
//  1.0      |10/11/17  |Mong Ward        |Created
//           
/*==================================================================*/
try {
	
	var expDate = AInfo["Permit Expiration Date"];
	
	
       if ((wfTask == "Permit Issuance" && wfStatus == "Issued") || (wfTask == "Inspections" && wfStatus == "Extend Permit"))	
	    {       
            licEditExpInfo("Active", expDate); 
		}
			                
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }