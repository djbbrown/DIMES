/*===================================================================
// Script Number:
// Related Issue: SP - Dimes Open List #12
// Script Name: LIC_PeddlerFilingCheck.js
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: 
//          Prevent worktask 'Issue License' from being resulted to 'Issued'
//          if a filing type hasn't been selected.
// Script Run Event: WTUB
// Script Parents:
//            WTUB;Licenses!~!Peddler!Application
/*==================================================================*/

try
{
    if(wfTask == 'Issue License' && wfStatus == 'Issued')
    {
        var filing = AInfo["Filing Type"];
        
        if(filing != 'Annually' && filing != 'Quarterly')
        {
            comment("Filing Type is required before issuing license. Current Value: " + filing);
            cancel = true;
        }
    }
}
catch(err)
{
    logDebug("Error: " + err.message);
}