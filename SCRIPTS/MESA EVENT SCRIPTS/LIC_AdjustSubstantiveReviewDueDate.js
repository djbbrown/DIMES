/*===================================================================
// Script Number: 009
// Script Name: LIC_AdjustSubstantiveReviewDueDate.js
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description:  When any of the review workflow tasks (Business Services Review, Building Services Review, 
*Collection Review, Recovered Property Unit Review, Planning-Zoning Review, Police Department Review, Fire Review, 
*Police Investigator Review)  is set to a status of "Additional Info Received" and none of the other review tasks are 
*set to a status of "Additonal Info Requested", adjust the Substantive Review Due Date. Adjust the date by adding the 
*number of days between the current date (the date the info was received) and the date the info was first requested
* by any of the reviewers (the earliest date the status was set to "Additional Info Requested" on any of the review tasks).
// Script Run Event: WTUA: 	Licenses!General!*!Application
// 12/6/2016 nalbert - removed task "Administrative Review" which was incorrectly applying date to field for Bingo Hall app on Addtl Info Received
/*==================================================================*/


    	var subRevDate = getAppSpecific ("Substantive Review Due",capId);
        possibleTasks = ["Administrative Review", "Building Safety Review", "Building Services Review", "Business Services Review",
                      "Collections Review", "Department of Sustainability Review", "Downtown Light Rail Review", "Fire Prevention Review",
                      "Fire Review", "Initial Supervisor Review", "License Administrator Review", "License Adminstrator Review", "License Review", 
                      "Parks and Recreation Review", "Planning-Zoning Review", "Police Department Alarm Review", "Police Investigator Review",
                      "Police Lieutenant Review", "Police Review", "Recovered Property Review", "Risk Management Review", 
                      "Solid Waste Review", "Supervisor Review", "Traffic Engineering Review", "Zoning Review"];


       tasksToCheck = new Array();
       var daysDiff  = 0;
       if (IsStrInArry(wfTask, possibleTasks) && wfStatus == "Additional Info Received") {
              for (var tIndex in possibleTasks) {
                     if (doesTaskExist(""+possibleTasks[tIndex])) {
                           tasksToCheck.push(possibleTasks[tIndex]);
                     }
              }

              //logDebug("Array = " + tasksToCheck);
              // make sure none of the tasks are set to Additional Info Requested or Additional Info Needed
              otherTasksOk = true;
              for (var tIndex in tasksToCheck) {
                     if ((isTaskStatus(tasksToCheck[tIndex], "Additional Info Requested") || isTaskStatus(tasksToCheck[tIndex], "Additional Information Needed")|| 
                                  isTaskStatus(tasksToCheck[tIndex], "Additional Info Needed"))) {
                           otherTasksOk = false;             // don't adjust date yet
                           logDebug(tasksToCheck[tIndex] + " fails");
                     }
              }
              if (otherTasksOk) {
                     // find earliest date any of the tasks to check was last set to status of "Additional Info Requested"
            	     //logDebug("Adjusting the date");
                     
                     // get the dates each task was last set to status of 
                     requestedDates = new Array();
                     for (var tIndex in tasksToCheck) {
                           tmpStatusDate = getStatusDateinTaskHistory(tasksToCheck[tIndex], "Additional Info Requested");
                           if (tmpStatusDate != null)
                                  requestedDates.push(tmpStatusDate);
                           tmpStatusDate = getStatusDateinTaskHistory(tasksToCheck[tIndex], "Additional Info Needed");
                           if (tmpStatusDate != null)
                                  requestedDates.push(tmpStatusDate);
                           tmpStatusDate = getStatusDateinTaskHistory(tasksToCheck[tIndex], "Additional Information Needed");
                           if (tmpStatusDate != null)
                                  requestedDates.push(tmpStatusDate);
                     }
                 
                     requestedDates.sort(compareDatesDesc);
                     earliestDate = requestedDates[0];
                     daysDiff = Math.round(dateDiff(new Date(earliestDate.getTime()), wfDateMMDDYYYY));
                     logDebug(daysDiff);
                     
              }
              else { logDebug("Other tasks need additional info");}
              
              // This code should be inside of the check for wf task.
              if(subRevDate == null){
				 editAppSpecific("Substantive Review Due", dateAdd(null, daysDiff)); 
				 logDebug("subRevDate null: " + subRevDate + "," + wfTask + "," + wfStatus);
			  } else {
				  editAppSpecific("Substantive Review Due", dateAdd(subRevDate, daysDiff));
				  logDebug("subRevDate not null: " + subRevDate + "," + wfTask + "," + wfStatus);
			  }
       }
