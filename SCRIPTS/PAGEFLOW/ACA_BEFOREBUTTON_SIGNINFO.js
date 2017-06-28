var showMessage = false;						// Set to true to see results in popup window

var useAppSpecificGroupName = false;	
var message = " ";							// Message String
var debug = "";								// Debug String
var br = "<BR>";							// Break Tag
var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
var capIDString = capId.getCustomID();			
var appTypeResult = cap.getCapType();		
var AInfo = new Array();						// Create array for tokenized variables
loadAppSpecific4ACA(AInfo); 						// Add AppSpecific Information
var totSignVal = AInfo["TOTAL SIGN VALUATION"];


if(totSignVal != null && loadASIT())
{
	//count the rows in the SIGN INFO table
	var countSignInfoRows = TotalASITRows("SIGN INFO",capId);
		
	if(countSignInfoRows != "false" && countSignInfoRows < 1) 
	{
		logMessage("**ERROR Must have at least 1 Sign Info row");
	}				
}

if (message.indexOf("**ERROR") > 0) {
	aa.env.setValue("ErrorCode", "1");
	aa.env.setValue( "ErrorMessage", message.replace(/\**ERROR /g,"") );
}
else {
	aa.env.setValue("ErrorCode", "0");
	if (showMessage) aa.env.setValue("ErrorMessage", message);
}

function getCapId()  
{
    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      logMessage("**ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
      return null;
    }
}

function logDebug(dstr)
{
	debug+=dstr + br;
}
function logMessage(dstr) 
{
	message+=dstr + br;
}
//------Start----Validate Number of Units
function TotalASITRows(tname,capId) 
{
 	// tname: ASI table name
	// Returns a ASI Table row number
	var numrows = false; //stays false if we don't even find the table; otherwise a number
	
	//Find the right ASI table
	var itemCap = capId;
	if (arguments.length == 1)
	{
		itemCap = arguments[0]; // use cap ID specified in args
		var gm = aa.appSpecificTableScript.getAppSpecificTableGroupModel(itemCap).getOutput();
	}
	else
	{
		var gm = cap.getAppSpecificTableGroupModel()
	}
	
	var ta = gm.getTablesMap();
	var tai = ta.values().iterator();
	var theTableWeWant = null;
	while (tai.hasNext())
	{
		var tsm = tai.next();
		
		if (tsm.getTableName().equals(tname)) 
	  	{   
			theTableWeWant = tsm;
	  	}		
	}
	
	//If we found the table, get the row count
	if (theTableWeWant != null) {
		if (theTableWeWant.rowIndex.isEmpty()) {
			numrows = 0;
		} else {
			var countFields = theTableWeWant.getTableField().size();
			var countColumns = theTableWeWant.getColumns().size();
			numrows = countFields/countColumns;
		}
	}
	return numrows;
}

function loadAppSpecific4ACA(thisArr) 
{
	//
	// Returns an associative array of App Specific Info
	// Optional second parameter, cap ID to load from
	//
	// uses capModel in this event

	var itemCap = capId;
	if (arguments.length >= 2)
	{
		itemCap = arguments[1]; // use cap ID specified in args
   		var fAppSpecInfoObj = aa.appSpecificInfo.getByCapID(itemCap).getOutput();
		for (loopk in fAppSpecInfoObj)
			{
			if (useAppSpecificGroupName)
				thisArr[fAppSpecInfoObj[loopk].getCheckboxType().toUpperCase() + "." + fAppSpecInfoObj[loopk].checkboxDesc.toUpperCase()] = fAppSpecInfoObj[loopk].checklistComment;
			else
				thisArr[fAppSpecInfoObj[loopk].checkboxDesc.toUpperCase()] = fAppSpecInfoObj[loopk].checklistComment;
			}
	}
	else
	{
	  var i= cap.getAppSpecificInfoGroups().iterator();
	  while (i.hasNext())
	    {
	     var group = i.next();
	     var fields = group.getFields();
	     if (fields != null)
	        {
	        var iteFields = fields.iterator();
	        while (iteFields.hasNext())
	            {
	             var field = iteFields.next();
       			if (useAppSpecificGroupName)
		     		thisArr[field.getCheckboxType().toUpperCase() + "." + field.getCheckboxDesc().toUpperCase()] = field.getChecklistComment();
		     	else
		     		thisArr[field.getCheckboxDesc().toUpperCase()] = field.getChecklistComment();
		    	}
	        }
	     }
	}
}
function loadASIT() 
{
	//Verify Page flow has ASI Table
	var itemCap = capId;
	if (arguments.length == 1)
	{
		itemCap = arguments[0]; // use cap ID specified in args
		var gm = aa.appSpecificTableScript.getAppSpecificTableGroupModel(itemCap).getOutput();
	}
	else
	{
		var gm = cap.getAppSpecificTableGroupModel()
	}
	if(!gm)
	{
		return false;
	}
	else
	{
		return true;
	}	
}