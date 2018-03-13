/*===================================================================
// Script Number:
// Related Issue: SP - Dimes Open List #12
// Script Name: LIC_PeddlerFilingCheck.js
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: 
//          Prevent worktask 'Issue License' from being resulted to 'Issued'
//          if a Renewal Frequency hasn't been selected.
// Script Run Event: WTUB
// Script Parents:
//            WTUB;Licenses!~!Peddler!Application
/*==================================================================*/

try
{
    if(wfTask == 'Issue License' && wfStatus == 'Issued')
    {
        var filing = AInfo["Renewal Frequency"];
        
        if(filing != 'Annually' && filing != 'Quarterly')
        {
            comment("Renewal Frequency is required before issuing license. Current Value: " + filing);
            cancel = true;
        }
    }
}
catch(err)
{
    
    logDebug('Error in LIC_PeddlerFilingCheck: ' + err.message + "   ***StackTrace: " + err.stack);
}