//ACA_PMT_MESA_CITY_REQUIREMENT.js
/*-------------------------------------------------------------------------------------------
|	Author: TruePoint Solutions (dbrown)
|	Date: 3/27/2018
|	Purpose: This will prevent page flow continuation if the 'City' field is anything other than 'MESA' and if City field is null
|					and shows message on screen, also stops page flow processing until City is 'MESA'.
|                   
|
--------------------------------------------------------------------------------------------*/
var showMessage = false;						// Set to true to see results in popup window
var showDebug = true;
var useAppSpecificGroupName = false;	
var message = " ";							// Message String
var debug = "";								// Debug String
var br = "<BR>";
var useProductScripts = true;
var cancel = false;


function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}

eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,true));
eval(getScriptText("INCLUDES_CUSTOM",null,true)); 

var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
var capIDString = capId.getCustomID();			
var appTypeResult = cap.getCapType();	
var appTypeString = appTypeResult.toString();
var appTypeArray = appTypeString.split("/");
var AInfo = new Array();						// Create array for tokenized variables
loadAppSpecific4ACA(AInfo); 						// Add AppSpecific Info

try {
  	var addArray = new Array(); loadAddressAttributes4ACA(addArray); //aa.print("City? "+addArray["AddressAttribute.City"]);
	if(addArray["AddressAttribute.City"] == "" || addArray["AddressAttribute.City"] == null)
		{
		//showMessage = true;
		comment("You must validate the address you entered by clicking the Search button.");
		cancel = true;
		}
	
	else if(addArray["AddressAttribute.City"] != "MESA")
		{
		//showMessage = true;
		comment("You cannot submit a request online for a permit on a property that is not within the City of Mesa jurisdiction.  Please contact our office to complete your submittal.");
		cancel = true;
		}
}
catch (error)
{
	logDebug(error.message);
	showDebug=true;
	cancel=true;
	showMessage=true;
}
/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0) {
    aa.env.setValue("ErrorCode", "1");
    aa.env.setValue("ErrorMessage", debug);
}
else {
    if (cancel) {
        aa.env.setValue("ErrorCode", "-2");
        if (showMessage) aa.env.setValue("ErrorMessage", message);
        if (showDebug) aa.env.setValue("ErrorMessage", debug);
    }
    else {
    	aa.env.setValue("ScriptReturnCode", "0");
    	message += "Action is TRUE";
		//message += "<img src='/citizenaccess/Admin/images/empty.gif' onload=\"$('.ACA_Message_Error').addClass('ACA_Message_Notice').removeClass('ACA_Message_Error');\">";
    	if (showMessage) aa.env.setValue("ErrorMessage", message);

    }
}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/
