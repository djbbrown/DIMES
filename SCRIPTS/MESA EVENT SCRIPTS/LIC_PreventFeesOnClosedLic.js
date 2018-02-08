/*===================================================================
// Script Number: 
// Script Name: LIC_PreventFeesOnClosedLic
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: Prevent a fee from being added to a closed license
// Script Run Event: FAB
/*==================================================================*/


try
{
    if(capStatus == "Closed")
    {
        cancel = true;
    }
}
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}