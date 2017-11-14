/*===================================================================
// Script Number: 
// Script Name: TRA_TTC_ClosePermit.js
// Script Description: 	Update WF Task Inspections with WF Status "Final Inspection Compelte" when the Final Inspection is status as "OK".  This will close the record. 
// Script Parents:IRSA;Transportation!~!~!~.js
// Test Record:       
// Version   |Date      |Engineer         |Details
//  1.0      |11/14/17  |Mong Ward	      |Initial Release
//  
/*==================================================================*/

try {
        var inspResultComment = "";
		
		if  (inspType == "Final Inspection" && inspResult == "OK" && isTaskActive('Inspections'))
        {

            updateTask("Inspections", "Final Inspection Complete", inspResultComment, "Updated by WTUA event");
			//potentially send email
            showMessage = true;
            comment("The TTC Permit has been closed.");
  
        }
      
    }
    
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }