//*===================================================================
//
// Script Name: editAppSpecific_Mesa.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//      This is similar to editAppSpecific function, except that it 
//      returns a much more useful error message if the field was not updated.
//
//      itemCap (optional) = the alt id of the record you are working with, 
//          if not used it will assume that capID is available
// 
//==================================================================*/
function editAppSpecific_Mesa(itemName,itemValue)  // optional: itemCap
{
	var itemCap = capId;
	var itemGroup = null;

	if (arguments.length == 3) 
    {
        itemCap = arguments[2]; // use cap ID specified in args
    }
   	
  	if (useAppSpecificGroupName)
	{
		if (itemName.indexOf(".") < 0)
        { 
            logDebug("**WARNING: editAppSpecific requires group name prefix when useAppSpecificGroupName is true"); 
            return false; 
        }		
		
		itemGroup = itemName.substr(0,itemName.indexOf("."));
		itemName = itemName.substr(itemName.indexOf(".") + 1);
	}
   	
   	var appSpecInfoResult = aa.appSpecificInfo.editSingleAppSpecific(itemCap,itemName,itemValue,itemGroup);

	if (appSpecInfoResult.getSuccess())
	 {
	 	if(arguments.length < 3) // if no capId passed update the ASI Array
        {
            AInfo[itemName] = itemValue;
        } 
	} 	
	else
    { 
        logDebug( "WARNING: " + itemName + " was not updated. Error message: " + appSpecInfoResult.getErrorMessage()); 
    }
}