/*=================================================================\
// Script Name: Council Agenda Date Check
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: Prevent WF 'Licensing SUpervisor' from being finalized if
//                      ASI 'Council Agenda Date' is blank.
//
// Related Issue: SP #11 - Liquor Fee Prorated
//
// Script Run Event: WTUB - Workflow Task Update Before
// Script Parents:
//            WTUB;Licenses!Liquor!Liquor!Application.js
//
// Updates:
// ------------------------------------------------------------------
// | BY         |    DATE      |  NOTES
// ------------------------------------------------------------------
// | M VanWie   |  12/06/2017  | Initial script creation
/*==================================================================*/


try
{
    var agendaDate = '' + getAppSpecific("Council Agenda Date");
    var taskActive = isTaskActive("Licensing Supervisor");
    
    if(taskActive && (agendaDate == '' || agendaDate == null))
    {
        showMessage = true;
        comment('Cannot result Licensing Supervisor Workflow until a Council Agenda Date is entered.')
        cancel = true;
    }
}
catch(err)
{
    logDebug("Java Error: " + err);
}