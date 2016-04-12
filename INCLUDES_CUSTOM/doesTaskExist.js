function doesTaskExist(wfstr) { // optional process name
       var useProcess = false;
       var processName = "";
       if (arguments.length == 2) {
              processName = arguments[1]; // subprocess
              useProcess = true;
       }
       var workflowResult = aa.workflow.getTaskItems(capId,wfstr,processName,null,null,null);
       if (workflowResult.getSuccess())
              wfObj = workflowResult.getOutput();
       else          { logDebug(workflowResult.getErrorMessage());  return false; }

       for (i in wfObj) {
              fTask = wfObj[i];
              if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName)))
                     return true;
       }
       return false;
}