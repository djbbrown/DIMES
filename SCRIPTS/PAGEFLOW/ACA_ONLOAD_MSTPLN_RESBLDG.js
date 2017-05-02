//for pageflow:
// Permits Residential Building


var showMessage = true;						// Set to true to see results in popup window
var showDebug = true;							// Set to true to see debug messages in popup window
var message =	"";								// Message String
var debug = "";									// Debug String
var br = "<BR>";								// Break Tag

var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
var servProvCode = capId.getServiceProviderCode()       		// Service Provider Code
var currentUserID = aa.env.getValue("CurrentUserID");
if (currentUserID.indexOf("PUBLICUSER") == 0) { currentUserID = "ADMIN" ; publicUser = true }  // ignore public users

var useAppSpecificGroupName = false;

var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
parentCapIdString = "" + cap.getParentCapID();
if (parentCapIdString) {
	pca = parentCapIdString .split("-");
	parentCapId = aa.cap.getCapID(pca[0],pca[1],pca[2]).getOutput();
}

var refAddress;
var refParcel;
var refGIS;
var contactList;
var applicantModel;
var valModel;
var valModelList;

if (parentCapId) {

	parentCap = aa.cap.getCapViewBySingle4ACA(parentCapId);	

	//Copy Address
	refAddress = parentCap.getAddressModel();
	cap.setAddressModel(refAddress);

	//Copy Parcel
	refParcel = parentCap.getParcelModel();
	cap.setParcelModel(refParcel);
	
	//Copy Contacts
	contactList = parentCap.getContactsGroup();
	for (i = 0; i < contactList.size(); i++) {
		contactList.get(i).getPeople().setContactSeqNumber(null);
		contactList.get(i).setComponentName(contactList.get(i).getContactType());
	}
	cap.setContactsGroup(contactList);
	
	//Get the applicant.
	applicantModel = parentCap.getApplicantModel();
	applicantModel.getPeople().setContactSeqNumber(null);
	applicantModel.setComponentName(null);
	cap.setApplicantModel(applicantModel);
	
	//Copy ASI
	copyAppSpecific4ACA(parentCap);
	
	//Copy ASIT
	//set list of possible tables
	var vASITNameArray = [];
	vASITNameArray.push('MASTER PLAN INFORMATION');
	vASITNameArray.push('OCCUPANCY INFORMATION');
	vASITNameArray.push('SUBDIVISION INFORMATION');
	vASITNameArray.push('UTILITY SERVICE INFORMATION');
	vASITNameArray.push('PLAN REVIEW INFORMATION');
	vASITNameArray.push('DEFERRED SUBMITTAL INFORMATION');
	
	var vASITName;
	var x = 0;
	var vASIT;
	var vRowCount = 0;
	var y = 0;
	var vASITData;
	
	for (x in vASITNameArray) {
		vASITName = vASITNameArray[x];
		vASIT = loadASITable(vASITName);
		vRowCount = 0;
		
		if (typeof(vASIT) == "object") {
			for (y in vASIT) {
				vRowCount = vRowCount + 1;
			}
		}
		
		if (vRowCount == 0) {
			vASITData = loadASITable(vASITName, parentCapId); 
			addASITable(vASITName, vASITData);

			var tmpCap = aa.cap.getCapViewBySingle(capId);
			cap.setAppSpecificTableGroupModel(tmpCap.getAppSpecificTableGroupModel()); 
			aa.env.setValue("CapModel", cap);			
		}
	}
	
	aa.env.setValue("CapModel",cap);
}

////////////////////////////////////// Functions below this point ////////////////////////////////////////////////////////////////
function copyAppSpecific4ACA(capFrom) { // copy all App Specific info into new Cap
	var t = capFrom.getAppSpecificInfoGroups();
	if (t == null) return;
	var i= t.iterator();

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
                            editAppSpecific4ACA(field.getCheckboxType() + "." + field.getCheckboxDesc(),field.getChecklistComment());
                    else
                            editAppSpecific4ACA(field.getCheckboxDesc(),field.getChecklistComment());
           }
        }
    }
}

function editAppSpecific4ACA(itemName, itemValue) {
	var t = cap.getAppSpecificInfoGroups();
	if (t == null) return;
    var i =t.iterator();

    while (i.hasNext()) {
        var group = i.next();
        var fields = group.getFields();
        if (fields != null) {
            var iteFields = fields.iterator();
            while (iteFields.hasNext()) {
                var field = iteFields.next();
                if ((useAppSpecificGroupName && itemName.equals(field.getCheckboxType() + "." + field.getCheckboxDesc())) || itemName.equals(field.getCheckboxDesc())) {
                    field.setChecklistComment(itemValue);
                }
            }
        }
    }
}

function loadASITable(tname) {

 	//
 	// Returns a single ASI Table array of arrays
	// Optional parameter, cap ID to load from
	//
	var itemCap = capId;
	if (arguments.length == 2) itemCap = arguments[1]; // use cap ID specified in args

	var gm = aa.appSpecificTableScript.getAppSpecificTableGroupModel(itemCap).getOutput();
	var ta = gm.getTablesArray();
	if (ta == null) return;
	var tai = ta.iterator();

	while (tai.hasNext())
	{
	  var tsm = tai.next();
	  var tn = tsm.getTableName();

      if (!tn.equals(tname)) continue;

	  if (tsm.rowIndex.isEmpty())
	  	{
			logDebug("Couldn't load ASI Table " + tname + " it is empty");
			return false;
		}

   	  var tempObject = new Array();
	  var tempArray = new Array();

  	  var tsmfldi = tsm.getTableField().iterator();
	  var tsmcoli = tsm.getColumns().iterator();
      var readOnlyi = tsm.getAppSpecificTableModel().getReadonlyField().iterator(); // get Readonly filed
	  var numrows = 1;

	  while (tsmfldi.hasNext())  // cycle through fields
		{
		if (!tsmcoli.hasNext())  // cycle through columns
			{
			var tsmcoli = tsm.getColumns().iterator();
			tempArray.push(tempObject);  // end of record
			var tempObject = new Array();  // clear the temp obj
			numrows++;
			}
		var tcol = tsmcoli.next();
		var tval = tsmfldi.next();
		var readOnly = 'N';
		if (readOnlyi.hasNext()) {
			readOnly = readOnlyi.next();
		}
		var fieldInfo = new asiTableValObj(tcol.getColumnName(), tval, readOnly);
		tempObject[tcol.getColumnName()] = fieldInfo;

		}
		
	  tempArray.push(tempObject);  // end of record
	}
	
	return tempArray;
}

function asiTableValObj(columnName, fieldValue, readOnly) {
	this.columnName = columnName;
	this.fieldValue = fieldValue;
	this.readOnly = readOnly;

	asiTableValObj.prototype.toString=function(){ return this.fieldValue }
};
	
function addASITable(tableName,tableValueArray) // optional capId
{
  	//  tableName is the name of the ASI table
  	//  tableValueArray is an array of associative array values.  All elements MUST be either a string or asiTableVal object
    var itemCap = capId
  	if (arguments.length > 2)
  		itemCap = arguments[2]; // use cap ID specified in args
  
  	var tssmResult = aa.appSpecificTableScript.getAppSpecificTableModel(itemCap,tableName)
  
  	if (!tssmResult.getSuccess())
  		{ logDebug("**WARNING: error retrieving app specific table " + tableName + " " + tssmResult.getErrorMessage()) ; return false }
  
  	var tssm = tssmResult.getOutput();
  	var tsm = tssm.getAppSpecificTableModel();
  	var fld = tsm.getTableField();
    var fld_readonly = tsm.getReadonlyField(); // get Readonly field
  
    for (thisrow in tableValueArray)
	{
  
  		var col = tsm.getColumns()
  		var coli = col.iterator();
  
  		while (coli.hasNext())
  		{
  			var colname = coli.next();
  
			if (typeof(tableValueArray[thisrow][colname.getColumnName()]) == "object")  // we are passed an asiTablVal Obj
				{
	  			fld.add(tableValueArray[thisrow][colname.getColumnName()].fieldValue);
	  			fld_readonly.add(tableValueArray[thisrow][colname.getColumnName()].readOnly);
				}
			else // we are passed a string
				{
  				fld.add(tableValueArray[thisrow][colname.getColumnName()]);
  				fld_readonly.add(null);
				}
  		}
  
  		tsm.setTableField(fld);
  
  		tsm.setReadonlyField(fld_readonly);
  
  	}
  
  	var addResult = aa.appSpecificTableScript.editAppSpecificTableInfos(tsm, itemCap, currentUserID);
  
  	 if (!addResult .getSuccess())
  		{ logDebug("**WARNING: error adding record to ASI Table:  " + tableName + " " + addResult.getErrorMessage()) ; return false }
  	else
		{
			//Refresh Cap Model (Custom Addition by Engineering, but wasn't able to submit ACA record)
			//var tmpCap = aa.cap.getCapViewBySingle(capId);
			//cap.setAppSpecificTableGroupModel(tmpCap.getAppSpecificTableGroupModel()); 

			logDebug("Successfully added record to ASI Table: " + tableName);
		}
  
}

function logDebug(dstr) {

    if (!aa.calendar.getNextWorkDay) {

		var vLevel = 1
		if (arguments.length > 1)
			vLevel = arguments[1]

		if ((showDebug & vLevel) == vLevel || vLevel == 1)
			debug += dstr + br;

		if ((showDebug & vLevel) == vLevel)
			aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr)
		}
	else {
			debug+=dstr + br;
		}

}

function appMatch(ats) // optional capId or CapID string
	{
	var matchArray = appTypeArray //default to current app
	if (arguments.length == 2) 
		{
		matchCapParm = arguments[1]
		if (typeof(matchCapParm) == "string")
			matchCapId = aa.cap.getCapID(matchCapParm).getOutput();   // Cap ID to check
		else
			matchCapId = matchCapParm;
		if (!matchCapId)
			{
			logDebug("**WARNING: CapId passed to appMatch was not valid: " + arguments[1]);
			return false
			}
		matchCap = aa.cap.getCap(matchCapId).getOutput();
		matchArray = matchCap.getCapType().toString().split("/");
		}
		
	var isMatch = true;
	var ata = ats.split("/");
	if (ata.length != 4)
		logDebug("**ERROR in appMatch.  The following Application Type String is incorrectly formatted: " + ats);
	else
		for (xx in ata)
			if (!ata[xx].equals(matchArray[xx]) && !ata[xx].equals("*"))
				isMatch = false;
	return isMatch;
	}	