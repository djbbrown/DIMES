/*===================================================================
// Script Name: ENG_UTL_SWF_Received.js
// Script Description: 	setting initial application submittal default
// ie: due date
// Author: Suzanna Majchrzak
// Initial Date: January 9, 2018
//
// Task Status: Received
// Event: ASA
//
/*==================================================================*/
try {  

    var dueDateDefault = lookup("ENG_SWF_CONSTANTS", "APPLICATION_RECEIPT_DUEDATE");   

    var futureDate = new Date(dateAdd(new Date(), dueDateDefault));
    
    //future date based on the mesa working days if needed.
    //var futureDate = new Date(mesaWorkingDays(new Date(), dueDateDefault));

    editTaskDueDate("Application Submittal", jsDateToASIDate(futureDate));

    }
    catch (err)
    {
     logDebug("A JavaScript Error occured in ENG_UTL_SWF_Received: " + err.message);
    }
    

  

