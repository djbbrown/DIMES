//adHocProcess must be same as one defined in R1SERVER_CONSTANT
//adHocTask must be same as Task Name defined in AdHoc Process
//adHocNote can be variable
//Optional 4 parameters = Assigned to User ID must match an AA user
//Optional 5 parameters = CapID

function addAdHocTask(adHocProcess, adHocTask, adHocNote){
	var thisCap = capId;
	var thisUser = currentUserID;
	if (arguments.length > 3) thisUser = arguments[3];
	if (arguments.length > 4) thisCap = arguments[4];
	var userObj = aa.person.getUser(thisUser);
	if (!userObj.getSuccess()){
		logDebug("Could not find user to assign to");
		return false;
	}
	var taskObj = aa.workflow.getTasks(thisCap).getOutput()[0].getTaskItem()
	taskObj.setProcessCode(adHocProcess);
	taskObj.setTaskDescription(adHocTask);
	taskObj.setDispositionNote(adHocNote);
	taskObj.setProcessID(0);
	taskObj.setAssignmentDate(aa.util.now());
	taskObj.setDueDate(aa.util.now());
	taskObj.setAssignedUser(userObj.getOutput());
	wf = aa.proxyInvoker.newInstance("com.accela.aa.workflow.workflow.WorkflowBusiness").getOutput();
	wf.createAdHocTaskItem(taskObj);
	return true;
} 
function changeApplicantToLicenseHolder(fromCType, toCType, licCapId) {

	var conToChange = null; 
	consResult = aa.people.getCapContactByCapID(licCapId);
	if (consResult.getSuccess()) {
		logDebug("Starting "+fromCType+" to "+toCType);
		cons = consResult.getOutput();
		for (thisCon in cons) {
			if (cons[thisCon].getCapContactModel().getPeople().getContactType() == fromCType) { 
				conToChange = cons[thisCon].getCapContactModel(); 
				p = conToChange.getPeople(); 
				contactAddressListResult = aa.address.getContactAddressListByCapContact(conToChange);
				if (contactAddressListResult.getSuccess()) 
					contactAddressList = contactAddressListResult.getOutput();
				convertedContactAddressList = convertContactAddressModelArr(contactAddressList);
				p.setContactType(toCType); 
				p.setContactAddressList(convertedContactAddressList);
				conToChange.setPeople(p); 
				conToChange.setPrimaryFlag("Y");
				aa.people.editCapContactWithAttribute(conToChange);
			}
		}
	}
} 
function closeWorkflow() { //optional capId

	var itemCap = capId;
	if (arguments.length > 0)
		itemCap = arguments[0];

	// closes all tasks of a workflow. DOES NOT handleDisposition.
	var taskArray = new Array();

	var workflowResult = aa.workflow.getTasks(itemCap);
 	if (workflowResult.getSuccess())
  	 	var wfObj = workflowResult.getOutput();
  	else { 
		return false; 
		}
	
	var fTask;
	var stepnumber;
	var wftask;
	
	for (i in wfObj) {
   	fTask = wfObj[i];
		wftask = fTask.getTaskDescription();
		stepnumber = fTask.getStepNumber();
		completeFlag = fTask.getCompleteFlag();
		aa.workflow.adjustTask(itemCap,stepnumber,"N", completeFlag, null, null);
	}
}


 
function compareDatesDesc(a,b) {
       t1 = a.getTime();
       t2 = b.getTime();
       if (t2>t1) return -1;
       else if (t1>t2) return 1
       else return 0;
}
 
function compareStatusDateDesc(a,b) {
       if (a.getStatusDate() == null && b.getStatusDate() == null) return 0;
       if (a.getStatusDate() == null && b.getStatusDate() != null) return 1;
       if (a.getStatusDate() != null && b.getStatusDate() == null) return -1;
       return b.getStatusDate().compareTo(a.getStatusDate());;
       
} 
function copyAddress(srcCapId, targetCapId)
{
	//1. Get address with source CAPID.
	var capAddresses = getAddress(srcCapId);
	if (capAddresses == null || capAddresses.length == 0)
	{
		return;
	}
	//2. Get addresses with target CAPID.
	var targetAddresses = getAddress(targetCapId);
	//3. Check to see which address is matched in both source and target.
	for (loopk in capAddresses)
	{
		sourceAddressfModel = capAddresses[loopk];
		//3.1 Set target CAPID to source address.
		sourceAddressfModel.setCapID(targetCapId);
		targetAddressfModel = null;
		//3.2 Check to see if sourceAddress exist.
		if (targetAddresses != null && targetAddresses.length > 0)
		{
			for (loop2 in targetAddresses)
			{
				if (isMatchAddress(sourceAddressfModel, targetAddresses[loop2]))
				{
					targetAddressfModel = targetAddresses[loop2];
					break;
				}
			}
		}
		//3.3 It is a matched address model.
		if (targetAddressfModel != null)
		{
		
			//3.3.1 Copy information from source to target.
			aa.address.copyAddressModel(sourceAddressfModel, targetAddressfModel);
			//3.3.2 Edit address with source address information. 
			aa.address.editAddressWithAPOAttribute(targetCapId, targetAddressfModel);
			logDebug("Copying address");
		}
		//3.4 It is new address model.
		else
		{	
			//3.4.1 Create new address.
			logDebug("Copying address");
			aa.address.createAddressWithAPOAttribute(targetCapId, sourceAddressfModel);
		}
	}
} 
function copyAppSpecificRenewal(AInfo,newCap) // copy all App Specific info into new Cap, 1 optional parameter for ignoreArr
{
	var ignoreArr = new Array();
	var limitCopy = false;
	if (arguments.length > 2) 
	{
		ignoreArr = arguments[2];
		limitCopy = true;
	}
	
	for (asi in AInfo){
		//Check list
		if(limitCopy){
			var ignore=false;
		  	for(var i = 0; i < ignoreArr.length; i++)
		  		if(ignoreArr[i] == asi){
		  			ignore=true;
					logDebug("Skipping ASI Field: " + ignoreArr[i]);
		  			break;
		  		}
		  	if(ignore)
		  		continue;
		}
		//logDebug("Copying ASI Field: " + asi);
		editAppSpecific(asi,AInfo[asi],newCap);
	}
} 
function copyASIInfo(srcCapId, targetCapId)
{
	//copy ASI infomation
	var AppSpecInfo = new Array();
	loadAppSpecific(AppSpecInfo,srcCapId);
	var recordType = "";
	
	var targetCapResult = aa.cap.getCap(targetCapId);

	if (!targetCapResult.getSuccess()) {
			logDebug("Could not get target cap object: " + targetCapId);
		}
	else	{
		var targetCap = targetCapResult.getOutput();
			targetAppType = targetCap.getCapType();		//create CapTypeModel object
			targetAppTypeString = targetAppType.toString();
			logDebug(targetAppTypeString);
		}

	var ignore = lookup("EMSE:ASI Copy Exceptions",targetAppTypeString); 
	var ignoreArr = new Array(); 
	if(ignore != null) 
	{
		ignoreArr = ignore.split("|");
		copyAppSpecificRenewal(AppSpecInfo,targetCapId, ignoreArr);
	}
	else
	{
		aa.print("something");
		copyAppSpecificRenewal(AppSpecInfo,targetCapId);

	}
} 
/*--------------------------------------------------------------------------------------------------------------------/
| Start ETW 12/3/14 copyContacts3_0
/--------------------------------------------------------------------------------------------------------------------*/
function copyContacts3_0(srcCapId, targetCapId) {
    //1. Get people with source CAPID.
    var capPeoples = getPeople3_0(srcCapId);
    if (capPeoples == null || capPeoples.length == 0) {
        return;
    }
    //2. Get people with target CAPID.
    var targetPeople = getPeople3_0(targetCapId);
    //3. Check to see which people is matched in both source and target.
    for (loopk in capPeoples) {
        sourcePeopleModel = capPeoples[loopk];
        //3.1 Set target CAPID to source people.
        sourcePeopleModel.getCapContactModel().setCapID(targetCapId);
        targetPeopleModel = null;
        //3.2 Check to see if sourcePeople exist.
        if (targetPeople != null && targetPeople.length > 0) {
            for (loop2 in targetPeople) {
                if (isMatchPeople3_0(sourcePeopleModel, targetPeople[loop2])) {
                    targetPeopleModel = targetPeople[loop2];
                    break;
                }
            }
        }
        //3.3 It is a matched people model.
        if (targetPeopleModel != null) {
            //3.3.1 Copy information from source to target.
            aa.people.copyCapContactModel(sourcePeopleModel.getCapContactModel(), targetPeopleModel.getCapContactModel());
            //3.3.2 Copy contact address from source to target.
            if (targetPeopleModel.getCapContactModel().getPeople() != null && sourcePeopleModel.getCapContactModel().getPeople()) {
                targetPeopleModel.getCapContactModel().getPeople().setContactAddressList(sourcePeopleModel.getCapContactModel().getPeople().getContactAddressList());
            }
            //3.3.3 Edit People with source People information.
            aa.people.editCapContactWithAttribute(targetPeopleModel.getCapContactModel());
        }
            //3.4 It is new People model.
        else {
            //3.4.1 Create new people.
            aa.people.createCapContactWithAttribute(sourcePeopleModel.getCapContactModel());
        }
    }
}
/*--------------------------------------------------------------------------------------------------------------------/
| End ETW 12/3/14 copyContacts3_0
/--------------------------------------------------------------------------------------------------------------------*/

 
function copyContactsWithAddresses(sourceCapId, targetCapId) {
	
	var capPeoples = getPeopleWithAddresses(sourceCapId);
	if (capPeoples != null && capPeoples.length > 0) {
		for (loopk in capPeoples) {
			sourcePeopleModel = capPeoples[loopk];
			sourcePeopleModel.getCapContactModel().setCapID(targetCapId);
			aa.people.createCapContactWithAttribute(sourcePeopleModel.getCapContactModel());
			logDebug("added contact");
		}
	}
	else {
		logDebug("No peoples on source");
	}
} 

function copyKeyInfo(srcCapId, targetCapId) {
	copyAppSpecificInfoForLic(srcCapId, targetCapId);
	copyAddressForLic(srcCapId, targetCapId);
	copyAppSpecificTableForLic(srcCapId, targetCapId);
	copyParcelForLic(srcCapId, targetCapId);
	copyPeopleForLic(srcCapId, targetCapId);
	copyOwnerForLic(srcCapId, targetCapId);
	copyCapConditionForLic(srcCapId, targetCapId);
	copyAdditionalInfoForLic(srcCapId, targetCapId);
	if (vEventName == "ConvertToRealCapAfter") {
		copyEducation(srcCapId, targetCapId);
		copyContEducation(srcCapId, targetCapId);
		copyExamination(srcCapId, targetCapId);
		var currentUserID = aa.env.getValue("CurrentUserID");
		copyRenewCapDocument(srcCapId, targetCapId ,currentUserID);
	}
}

function copyRenewCapDocument(srcCapId, targetCapId,currentUserID)
{
	if(srcCapId != null && targetCapId != null)
	{
		aa.cap.copyRenewCapDocument(srcCapId, targetCapId,currentUserID);
	}
}

function copyEducation(srcCapId, targetCapId) {
	if(srcCapId != null && targetCapId != null) {
		aa.education.copyEducationList(srcCapId, targetCapId);
	}
}

function copyContEducation(srcCapId, targetCapId) {
	if(srcCapId != null && targetCapId != null) {
		aa.continuingEducation.copyContEducationList(srcCapId, targetCapId);
	}
}

function copyExamination(srcCapId, targetCapId) {
	if(srcCapId != null && targetCapId != null) {
		aa.examination.copyExaminationList(srcCapId, targetCapId);
	}
}

function copyAppSpecificInfoForLic(srcCapId, targetCapId)
{
	var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
	logDebug("Ignore = " + ignore);
	var ignoreArr = new Array();
	if(ignore != null) ignoreArr = ignore.split("|"); 
	var AppSpecInfo = new Array();
	useAppSpecificGroupName = true;
	loadAppSpecific(AppSpecInfo,srcCapId);
	copyAppSpecificForLic(AppSpecInfo,targetCapId, ignoreArr);
	useAppSpecificGroupName = false;
}
	
function copyAppSpecificForLic(AInfo,newCap) // copy all App Specific info into new Cap, 1 optional parameter for ignoreArr
{
	var ignoreArr = new Array();
	var limitCopy = false;
	if (arguments.length > 2) {
		ignoreArr = arguments[2];
		limitCopy = true;
	}
	
	for (asi in AInfo){
		if(limitCopy){
			var ignore=false;
		  	for(var i = 0; i < ignoreArr.length; i++) {
				if (asi.indexOf(ignoreArr[i]) == 0) {
		  		//if(ignoreArr[i] == asi){
					logDebug("ignoring " + asi);
		  			ignore=true;
		  			break;
		  		}
			}
			if (!ignore) editAppSpecific(asi,AInfo[asi],newCap);
		}
		else 
			editAppSpecific(asi,AInfo[asi],newCap);
	}
}

function copyAddressForLic(srcCapId, targetCapId)
{
	//1. Get address with source CAPID.
	var capAddresses = getAddressForLic(srcCapId);
	if (capAddresses == null || capAddresses.length == 0)
	{
		return;
	}
	//2. Get addresses with target CAPID.
	var targetAddresses = getAddressForLic(targetCapId);
	//3. Check to see which address is matched in both source and target.
	for (loopk in capAddresses)
	{
		sourceAddressfModel = capAddresses[loopk];
		//3.1 Set target CAPID to source address.
		sourceAddressfModel.setCapID(targetCapId);
		targetAddressfModel = null;
		//3.2 Check to see if sourceAddress exist.
		if (targetAddresses != null && targetAddresses.length > 0)
		{
			for (loop2 in targetAddresses)
			{
				if (isMatchAddress(sourceAddressfModel, targetAddresses[loop2]))
				{
					targetAddressfModel = targetAddresses[loop2];
					break;
				}
			}
		}
		//3.3 It is a matched address model.
		if (targetAddressfModel != null)
		{
		
			//3.3.1 Copy information from source to target.
			aa.address.copyAddressModel(sourceAddressfModel, targetAddressfModel);
			//3.3.2 Edit address with source address information. 
			aa.address.editAddressWithAPOAttribute(targetCapId, targetAddressfModel);
		}
		//3.4 It is new address model.
		else
		{	
			//3.4.1 Create new address.
			aa.address.createAddressWithAPOAttribute(targetCapId, sourceAddressfModel);
		}
	}
}

function isMatchAddress(addressScriptModel1, addressScriptModel2)
{
	if (addressScriptModel1 == null || addressScriptModel2 == null)
	{
		return false;
	}
	var streetName1 = addressScriptModel1.getStreetName();
	var streetName2 = addressScriptModel2.getStreetName();
	if ((streetName1 == null && streetName2 != null) 
		|| (streetName1 != null && streetName2 == null))
	{
		return false;
	}
	if (streetName1 != null && !streetName1.equals(streetName2))
	{
		return false;
	}
	return true;
}

function getAddressForLic(capId)
{
	capAddresses = null;
	var s_result = aa.address.getAddressByCapId(capId);
	if(s_result.getSuccess())
	{
		capAddresses = s_result.getOutput();
		if (capAddresses == null || capAddresses.length == 0)
		{
			logDebug("WARNING: no addresses on this CAP:" + capId);
			capAddresses = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to address: " + s_result.getErrorMessage());
		capAddresses = null;	
	}
	return capAddresses;
}

function copyAppSpecificTableForLic(srcCapId, targetCapId)
{
	var tableNameArray = getTableName(srcCapId);
	var targetTableNameArray = getTableName(targetCapId);
	if (tableNameArray == null)
	{
		logDebug("tableNameArray is null, returning");
		return;
	}
	for (loopk in tableNameArray)
	{
		var tableName = tableNameArray[loopk];
		if (IsStrInArry(tableName,targetTableNameArray)) { 
			//1. Get appSpecificTableModel with source CAPID
			var sourceAppSpecificTable = getAppSpecificTableForLic(srcCapId,tableName);
			//2. Edit AppSpecificTableInfos with target CAPID
			var srcTableModel = null;
			if(sourceAppSpecificTable == null) {
				logDebug("sourceAppSpecificTable is null");
				return;
			}
			else {
			    srcTableModel = sourceAppSpecificTable.getAppSpecificTableModel();

			    tgtTableModelResult = aa.appSpecificTableScript.getAppSpecificTableModel(targetCapId, tableName);
			    if (tgtTableModelResult.getSuccess()) {
			    	tgtTableModel = tgtTableModelResult.getOutput();
			   	if (tgtTableModel == null) {
			   	 	logDebug("target table model is null");
			 	}
				else {
			    	tgtGroupName = tgtTableModel.getGroupName();
					srcTableModel.setGroupName(tgtGroupName);
			   	 }
			    }
			    else { logDebug("Error getting target table model " + tgtTableModelResult.getErrorMessage()); }
			}
			editResult = aa.appSpecificTableScript.editAppSpecificTableInfos(srcTableModel,
								targetCapId,
								null);
			if (editResult.getSuccess()) {
				logDebug("Successfully editing appSpecificTableInfos");
			}
			else {
				logDebug("Error editing appSpecificTableInfos " + editResult.getErrorMessage());
			}
		}
		else { 
			logDebug("Table " + tableName + " is not defined on target");
		}
	}
	
}

function IsStrInArry(eVal,argArr) {
   	for (x in argArr){
   		if (eVal == argArr[x]){
   			return true;
   		}
 	  }	
	return false;
} 

function getTableName(capId)
{
	var tableName = null;
	var result = aa.appSpecificTableScript.getAppSpecificGroupTableNames(capId);
	if(result.getSuccess())
	{
		tableName = result.getOutput();
		if(tableName!=null)
		{
			return tableName;
		}
	}
	return tableName;
}

function getAppSpecificTableForLic(capId,tableName)
{
	appSpecificTable = null;
	var s_result = aa.appSpecificTableScript.getAppSpecificTableModel(capId,tableName);
	if(s_result.getSuccess())
	{
		appSpecificTable = s_result.getOutput();
		if (appSpecificTable == null || appSpecificTable.length == 0)
		{
			logDebug("WARNING: no appSpecificTable on this CAP:" + capId);
			appSpecificTable = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to appSpecificTable: " + s_result.getErrorMessage());
		appSpecificTable = null;	
	}
	return appSpecificTable;
}

function copyParcelForLic(srcCapId, targetCapId)
{
	//1. Get parcels with source CAPID.
	var copyParcels = getParcelForLic(srcCapId);
	if (copyParcels == null || copyParcels.length == 0)
	{
		return;
	}
	//2. Get parcel with target CAPID.
	var targetParcels = getParcelForLic(targetCapId);
	//3. Check to see which parcel is matched in both source and target.
	for (i = 0; i < copyParcels.size(); i++)
	{
		sourceParcelModel = copyParcels.get(i);
		//3.1 Set target CAPID to source parcel.
		sourceParcelModel.setCapID(targetCapId);
		targetParcelModel = null;
		//3.2 Check to see if sourceParcel exist.
		if (targetParcels != null && targetParcels.size() > 0)
		{
			for (j = 0; j < targetParcels.size(); j++)
			{
				if (isMatchParcel(sourceParcelModel, targetParcels.get(j)))
				{
					targetParcelModel = targetParcels.get(j);
					break;
				}
			}
		}
		//3.3 It is a matched parcel model.
		if (targetParcelModel != null)
		{
			//3.3.1 Copy information from source to target.
			var tempCapSourceParcel = aa.parcel.warpCapIdParcelModel2CapParcelModel(targetCapId, sourceParcelModel).getOutput();
			var tempCapTargetParcel = aa.parcel.warpCapIdParcelModel2CapParcelModel(targetCapId, targetParcelModel).getOutput();
			aa.parcel.copyCapParcelModel(tempCapSourceParcel, tempCapTargetParcel);
			//3.3.2 Edit parcel with sourceparcel. 
			aa.parcel.updateDailyParcelWithAPOAttribute(tempCapTargetParcel);
		}
		//3.4 It is new parcel model.
		else
		{
			//3.4.1 Create new parcel.
			aa.parcel.createCapParcelWithAPOAttribute(aa.parcel.warpCapIdParcelModel2CapParcelModel(targetCapId, sourceParcelModel).getOutput());
		}
	}
}

function isMatchParcel(parcelScriptModel1, parcelScriptModel2)
{
	if (parcelScriptModel1 == null || parcelScriptModel2 == null)
	{
		return false;
	}
	if (parcelScriptModel1.getParcelNumber().equals(parcelScriptModel2.getParcelNumber()))
	{
		return true;
	}
	return	false;
}

function getParcelForLic(capId)
{
	capParcelArr = null;
	var s_result = aa.parcel.getParcelandAttribute(capId, null);
	if(s_result.getSuccess())
	{
		capParcelArr = s_result.getOutput();
		if (capParcelArr == null || capParcelArr.length == 0)
		{
			logDebug("WARNING: no parcel on this CAP:" + capId);
			capParcelArr = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to parcel: " + s_result.getErrorMessage());
		capParcelArr = null;	
	}
	return capParcelArr;
}

function copyPeopleForLic(srcCapId, targetCapId)
{
	//1. Get people with source CAPID.
	var capPeoples = getPeopleForLic(srcCapId);
	if (capPeoples == null || capPeoples.length == 0)
	{
		return;
	}
	//2. Get people with target CAPID.
	var targetPeople = getPeopleForLic(targetCapId);
	//3. Check to see which people is matched in both source and target.
	for (loopk in capPeoples)
	{
		sourcePeopleModel = capPeoples[loopk];
		//3.1 Set target CAPID to source people.
		sourcePeopleModel.getCapContactModel().setCapID(targetCapId);
		targetPeopleModel = null;
		//3.2 Check to see if sourcePeople exist.
		if (targetPeople != null && targetPeople.length > 0)
		{
			for (loop2 in targetPeople)
			{
				if (isMatchPeople(sourcePeopleModel, targetPeople[loop2]))
				{
					targetPeopleModel = targetPeople[loop2];
					break;
				}
			}
		}
		//3.3 It is a matched people model.
		if (targetPeopleModel != null)
		{
			//3.3.1 Copy information from source to target.
			aa.people.copyCapContactModel(sourcePeopleModel.getCapContactModel(), targetPeopleModel.getCapContactModel());
			//3.3.2 Copy contact address from source to target.
			if(targetPeopleModel.getCapContactModel().getPeople() != null && sourcePeopleModel.getCapContactModel().getPeople())
			{
				targetPeopleModel.getCapContactModel().getPeople().setContactAddressList(sourcePeopleModel.getCapContactModel().getPeople().getContactAddressList());
			}			

			//3.3.3 Edit People with source People information. 
			aa.people.editCapContactWithAttribute(targetPeopleModel.getCapContactModel());
		}
		//3.4 It is new People model.
		else
		{
			//3.4.1 Create new people.
			aa.people.createCapContactWithAttribute(sourcePeopleModel.getCapContactModel());
		}
	}
}

function isMatchPeople(capContactScriptModel, capContactScriptModel2)
{
	if (capContactScriptModel == null || capContactScriptModel2 == null)
	{
		return false;
	}
	var contactType1 = capContactScriptModel.getCapContactModel().getPeople().getContactType();
	var contactType2 = capContactScriptModel2.getCapContactModel().getPeople().getContactType();
	var firstName1 = capContactScriptModel.getCapContactModel().getPeople().getFirstName();
	var firstName2 = capContactScriptModel2.getCapContactModel().getPeople().getFirstName();
	var lastName1 = capContactScriptModel.getCapContactModel().getPeople().getLastName();
	var lastName2 = capContactScriptModel2.getCapContactModel().getPeople().getLastName();
	var fullName1 = capContactScriptModel.getCapContactModel().getPeople().getFullName();
	var fullName2 = capContactScriptModel2.getCapContactModel().getPeople().getFullName();
	if ((contactType1 == null && contactType2 != null) 
		|| (contactType1 != null && contactType2 == null))
	{
		return false;
	}
	if (contactType1 != null && !contactType1.equals(contactType2))
	{
		return false;
	}
	if ((firstName1 == null && firstName2 != null) 
		|| (firstName1 != null && firstName2 == null))
	{
		return false;
	}
	if (firstName1 != null && !firstName1.equals(firstName2))
	{
		return false;
	}
	if ((lastName1 == null && lastName2 != null) 
		|| (lastName1 != null && lastName2 == null))
	{
		return false;
	}
	if (lastName1 != null && !lastName1.equals(lastName2))
	{
		return false;
	}
	if ((fullName1 == null && fullName2 != null) 
		|| (fullName1 != null && fullName2 == null))
	{
		return false;
	}
	if (fullName1 != null && !fullName1.equals(fullName2))
	{
		return false;
	}
	return	true;
}

function getPeopleForLic(capId)
{
	capPeopleArr = null;
	var s_result = aa.people.getCapContactByCapID(capId);
	if(s_result.getSuccess())
	{
		capPeopleArr = s_result.getOutput();
		if(capPeopleArr != null || capPeopleArr.length > 0)
		{
			for (loopk in capPeopleArr)	
			{
				var capContactScriptModel = capPeopleArr[loopk];
				var capContactModel = capContactScriptModel.getCapContactModel();
				var peopleModel = capContactScriptModel.getPeople();
				var contactAddressrs = aa.address.getContactAddressListByCapContact(capContactModel);
				if (contactAddressrs.getSuccess())
				{
					var contactAddressModelArr = convertContactAddressModelArr(contactAddressrs.getOutput());
					peopleModel.setContactAddressList(contactAddressModelArr);    
				}
			}
		}
		
		else
		{
			logDebug("WARNING: no People on this CAP:" + capId);
			capPeopleArr = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to People: " + s_result.getErrorMessage());
		capPeopleArr = null;	
	}
	return capPeopleArr;
}

function convertContactAddressModelArr(contactAddressScriptModelArr)
{
	var contactAddressModelArr = null;
	if(contactAddressScriptModelArr != null && contactAddressScriptModelArr.length > 0)
	{
		contactAddressModelArr = aa.util.newArrayList();
		for(loopk in contactAddressScriptModelArr)
		{
			contactAddressModelArr.add(contactAddressScriptModelArr[loopk].getContactAddressModel());
		}
	}	
	return contactAddressModelArr;
}

function copyOwnerForLic(srcCapId, targetCapId)
{
	//1. Get Owners with source CAPID.
	var capOwners = getOwnerForLic(srcCapId);
	if (capOwners == null || capOwners.length == 0)
	{
		return;
	}
	//2. Get Owners with target CAPID.
	var targetOwners = getOwnerForLic(targetCapId);
	//3. Check to see which owner is matched in both source and target.
	for (loopk in capOwners)
	{
		sourceOwnerModel = capOwners[loopk];
		//3.1 Set target CAPID to source Owner.
		sourceOwnerModel.setCapID(targetCapId);
		targetOwnerModel = null;
		//3.2 Check to see if sourceOwner exist.
		if (targetOwners != null && targetOwners.length > 0)
		{
			for (loop2 in targetOwners)
			{
				if (isMatchOwner(sourceOwnerModel, targetOwners[loop2]))
				{
					targetOwnerModel = targetOwners[loop2];
					break;
				}
			}
		}
		//3.3 It is a matched owner model.
		if (targetOwnerModel != null)
		{
			//3.3.1 Copy information from source to target.
			aa.owner.copyCapOwnerModel(sourceOwnerModel, targetOwnerModel);
			//3.3.2 Edit owner with source owner information. 
			aa.owner.updateDailyOwnerWithAPOAttribute(targetOwnerModel);
		}
		//3.4 It is new owner model.
		else
		{
			//3.4.1 Create new Owner.
			aa.owner.createCapOwnerWithAPOAttribute(sourceOwnerModel);
		}
	}
}

function isMatchOwner(ownerScriptModel1, ownerScriptModel2)
{
	if (ownerScriptModel1 == null || ownerScriptModel2 == null)
	{
		return false;
	}
	var fullName1 = ownerScriptModel1.getOwnerFullName();
	var fullName2 = ownerScriptModel2.getOwnerFullName();
	if ((fullName1 == null && fullName2 != null) 
		|| (fullName1 != null && fullName2 == null))
	{
		return false;
	}
	if (fullName1 != null && !fullName1.equals(fullName2))
	{
		return false;
	}
	return	true;
}

function getOwnerForLic(capId)
{
	capOwnerArr = null;
	var s_result = aa.owner.getOwnerByCapId(capId);
	if(s_result.getSuccess())
	{
		capOwnerArr = s_result.getOutput();
		if (capOwnerArr == null || capOwnerArr.length == 0)
		{
			logDebug("WARNING: no Owner on this CAP:" + capId);
			capOwnerArr = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to Owner: " + s_result.getErrorMessage());
		capOwnerArr = null;	
	}
	return capOwnerArr;
}

function copyCapConditionForLic(srcCapId, targetCapId)
{
	//1. Get Cap condition with source CAPID.
	var capConditions = getCapConditionByCapIDForLic(srcCapId);
	if (capConditions == null || capConditions.length == 0)
	{
		return;
	}
	//2. Get Cap condition with target CAPID.
	var targetCapConditions = getCapConditionByCapIDForLic(targetCapId);
	//3. Check to see which Cap condition is matched in both source and target.
	for (loopk in capConditions)
	{
		sourceCapCondition = capConditions[loopk];
		//3.1 Set target CAPID to source Cap condition.
		sourceCapCondition.setCapID(targetCapId);
		targetCapCondition = null;
		//3.2 Check to see if source Cap condition exist in target CAP. 
		if (targetCapConditions != null && targetCapConditions.length > 0)
		{
			for (loop2 in targetCapConditions)
			{
				if (isMatchCapCondition(sourceCapCondition, targetCapConditions[loop2]))
				{
					targetCapCondition = targetCapConditions[loop2];
					break;
				}
			}
		}
		//3.3 It is a matched Cap condition model.
		if (targetCapCondition != null)
		{
			//3.3.1 Copy information from source to target.
			sourceCapCondition.setConditionNumber(targetCapCondition.getConditionNumber());
			//3.3.2 Edit Cap condition with source Cap condition information. 
			aa.capCondition.editCapCondition(sourceCapCondition);
		}
		//3.4 It is new Cap condition model.
		else
		{
			//3.4.1 Create new Cap condition.
			aa.capCondition.createCapCondition(sourceCapCondition);
		}
	}
}

function isMatchCapCondition(capConditionScriptModel1, capConditionScriptModel2)
{
	if (capConditionScriptModel1 == null || capConditionScriptModel2 == null)
	{
		return false;
	}
	var description1 = capConditionScriptModel1.getConditionDescription();
	var description2 = capConditionScriptModel2.getConditionDescription();
	if ((description1 == null && description2 != null) 
		|| (description1 != null && description2 == null))
	{
		return false;
	}
	if (description1 != null && !description1.equals(description2))
	{
		return false;
	}
	var conGroup1 = capConditionScriptModel1.getConditionGroup();
	var conGroup2 = capConditionScriptModel2.getConditionGroup();
	if ((conGroup1 == null && conGroup2 != null) 
		|| (conGroup1 != null && conGroup2 == null))
	{
		return false;
	}
	if (conGroup1 != null && !conGroup1.equals(conGroup2))
	{
		return false;
	}
	return true;
}

function getCapConditionByCapIDForLic(capId)
{
	capConditionScriptModels = null;
	
	var s_result = aa.capCondition.getCapConditions(capId);
	if(s_result.getSuccess())
	{
		capConditionScriptModels = s_result.getOutput();
		if (capConditionScriptModels == null || capConditionScriptModels.length == 0)
		{
			logDebug("WARNING: no cap condition on this CAP:" + capId);
			capConditionScriptModels = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to get cap condition: " + s_result.getErrorMessage());
		capConditionScriptModels = null;	
	}
	return capConditionScriptModels;
}

function copyAdditionalInfoForLic(srcCapId, targetCapId)
{
	//1. Get Additional Information with source CAPID.  (BValuatnScriptModel)
	var  additionalInfo = getAdditionalInfoForLic(srcCapId);
	if (additionalInfo == null)
	{
		return;
	}
	//2. Get CAP detail with source CAPID.
	var  capDetail = getCapDetailByID(srcCapId);
	//3. Set target CAP ID to additional info.
	additionalInfo.setCapID(targetCapId);
	if (capDetail != null)
	{
		capDetail.setCapID(targetCapId);
	}
	//4. Edit or create additional infor for target CAP.
	aa.cap.editAddtInfo(capDetail, additionalInfo);
}

//Return BValuatnScriptModel for additional info.
function getAdditionalInfoForLic(capId)
{
	bvaluatnScriptModel = null;
	var s_result = aa.cap.getBValuatn4AddtInfo(capId);
	if(s_result.getSuccess())
	{
		bvaluatnScriptModel = s_result.getOutput();
		if (bvaluatnScriptModel == null)
		{
			logDebug("WARNING: no additional info on this CAP:" + capId);
			bvaluatnScriptModel = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to get additional info: " + s_result.getErrorMessage());
		bvaluatnScriptModel = null;	
	}
	// Return bvaluatnScriptModel
	return bvaluatnScriptModel;
}

function getCapDetailByID(capId) {
	capDetailScriptModel = null;
	var s_result = aa.cap.getCapDetail(capId);
	if(s_result.getSuccess()) {
		capDetailScriptModel = s_result.getOutput();
		if (capDetailScriptModel == null) {
			logDebug("WARNING: no cap detail on this CAP:" + capId);
			capDetailScriptModel = null;
		}
	}
	else {
		logDebug("ERROR: Failed to get cap detail: " + s_result.getErrorMessage());
		capDetailScriptModel = null;	
	}
	// Return capDetailScriptModel
	return capDetailScriptModel;
}

 
function countASITColumn(tObj, cNameToCount) {
	// optional params = cFilterType, cNameFilter, cValueFilter
	var retValue = 0;
	if (tObj) {
		if (arguments.length == 2) { // no filters
			for (var ea in tObj) {
				var row = tObj[ea];
				retValue++;
			}
			return retValue;
		}
		if (arguments.length == 5) {
			filterType = arguments[2];
			cNameFilter = arguments[3];
			cValueFilter = arguments[4];
			for (var ea in tObj) {
				var row = tObj[ea];
				var colValue = row[cNameToCount].fieldValue;
				var colFilter = row[cNameFilter].fieldValue;
				if (filterType == "INCLUDE") {
					if (colFilter == cValueFilter) {						
						retValue++;
					}
				}
				if (filterType == "EXCLUDE") {
					if (colFilter != cValueFilter) {
						retValue++;
					}
				}
			}
		}
	}
	return retValue;
}

 
function countASITRows(tObj, cNameFilter, cValueFilter) {
	var retValue = 0;
	if (tObj) {
	if (arguments.length == 3) {
		cNameFilter = arguments[1];
		cValueFilter = arguments[2];
		for (var ea in tObj) {
			var row = tObj[ea];
			if (row[cNameFilter].fieldValue == cValueFilter)
				retValue++;
			}
		}
	}
	return retValue;
} 
function doesScheduledInspExist() {
	inspType = null;
	if (arguments.length > 0)
		inspType = arguments[0];
    var retValue = false;
	var inspResultObj = aa.inspection.getInspections(capId);
	if (inspResultObj.getSuccess()) {
		var inspList = inspResultObj.getOutput();
		for (xx in inspList) {
			if (inspList[xx].getInspectionStatus().toUpperCase().equals("SCHEDULED") && (!inspType || inspList[xx].getInspectionType() == inspType)) {
				return true;
			}
		}
	}
	return retValue;
}
 
function doesStatusExistInTaskHistory(tName, tStatus) {

       histResult = aa.workflow.getWorkflowHistory(capId, tName, null);
       if (histResult.getSuccess()) {
              var taskHistArr = histResult.getOutput();
              for (var xx in taskHistArr) {
                     taskHist = taskHistArr[xx];
                     if (tStatus.equals(taskHist.getDisposition()))
                           return true;
              }
              return false;
              
       }
       else {
              logDebug("Error getting task history : " + histResult.getErrorMessage());
       }
       return false;

}

 
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
function feeTotalByStatus(feeStatus) {
	var statusArray = new Array(); 
	if (arguments.length > 0) {
		for (var i=0; i<arguments.length; i++) statusArray.push(arguments[i]);
	}
	var feeTotal = 0;
	var feeResult=aa.fee.getFeeItems(capId);
	if (feeResult.getSuccess()) { 
		var feeObjArr = feeResult.getOutput(); 
		for (ff in feeObjArr) {
			thisFeeStatus = "" + feeObjArr[ff].getFeeitemStatus();
			if (exists(thisFeeStatus,statusArray)) feeTotal+=feeObjArr[ff].getFee();	
		}
	}
	else { 
		logDebug( "Error getting fee items: " + feeResult.getErrorMessage()); 
	}
	return feeTotal;
} 
function getAddress(capId)
{
	capAddresses = null;
	var s_result = aa.address.getAddressByCapId(capId);
	if(s_result.getSuccess())
	{
		capAddresses = s_result.getOutput();
		if (capAddresses == null || capAddresses.length == 0)
		{
			logDebug("WARNING: no addresses on this CAP:" + capId);
			capAddresses = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to address: " + s_result.getErrorMessage());
		capAddresses = null;	
	}
	return capAddresses;
} 
/*--------------------------------------------------------------------------------------------------------------------/
| Start ETW 09/16/14 Added getAppName Function
/--------------------------------------------------------------------------------------------------------------------*/
function getAppName() {
    var itemCap = capId;
    if (arguments.length == 1) itemCap = arguments[0]; // use cap ID specified in args

    capResult = aa.cap.getCap(itemCap)

    if (!capResult.getSuccess())
    { logDebug("**WARNING: error getting cap : " + capResult.getErrorMessage()); return false }

    capModel = capResult.getOutput().getCapModel()

    return capModel.getSpecialText()
}
/*--------------------------------------------------------------------------------------------------------------------/
| End ETW 09/16/14 Added getAppName Function
/--------------------------------------------------------------------------------------------------------------------*/ 
/*--------------------------------------------------------------------------/
|	Returns number of days since the most recent worflow task (wtask) set to any status in the array (wStatusList)
/--------------------------------------------------------------------------*/
function getDaysSinceWorkflowSetTo(wTask, wStatusList) {
	var wfHistObj = aa.workflow.getHistory(capId)
	if (!wfHistObj.getSuccess()) {
		logDeubg("Could not load Worflow History for record " +capIDString)
		return 0
	}
	var wfHist = wfHistObj.getOutput()
	var today = new Date()
	today.setHours(0,0,0,0)
	var mostRecent = null
	
	for (h in wfHist) {
		if (wfHist[h].getTaskDescription() == wTask && wStatusList.indexOf(String(wfHist[h].getDisposition())) > -1) {
			dateStamp = String(wfHist[h].getStatusDate())
			dateStampStr = dateStamp.substring(5,7)+"/"+dateStamp.substring(8,10)+"/"+dateStamp.substring(0,4)
			//logDebug("Processing: " +wfHist[h].getTaskDescription() +": "+ wfHist[h].getDisposition() + " - " + dateStampStr  )
			tmpDate = new Date(dateStampStr)
			if ( mostRecent == null || tmpDate > mostRecent) mostRecent = tmpDate
		}
	}
	
	if (mostRecent == null) return 0
	
	return Math.ceil((today - mostRecent) / 86400000)
} 
function getDocumentList()  {
	// Returns an array of documentmodels if any
	// returns an empty array if no documents
	var docListArray = new Array();
	docListResult = aa.document.getCapDocumentList(capId,currentUserID);
	if (docListResult != null && docListResult.getSuccess()) {		
		docListArray = docListResult.getOutput();
	}
	return docListArray;
} 
function getHoursSpent(wfstr) { // optional process name
	var useProcess = false;
	var processName = "";
	if (arguments.length == 2) {
		processName = arguments[1]; // subprocess
		useProcess = true;
	}

	var retValue = 0;
	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	else
  	  	{ logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage()); return false; }
	
	for (i in wfObj) {
   		fTask = wfObj[i];
 		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName))) {
			if (fTask.getHoursSpent() != null)
				retValue = fTask.getHoursSpent();
			break;
		}

	}
	return retValue;
} 
function getIncompleteCapId()  {
    	var s_id1 = aa.env.getValue("PermitId1");
   	var s_id2 = aa.env.getValue("PermitId2");
    	var s_id3 = aa.env.getValue("PermitId3");

    	var result = aa.cap.getCapIDModel(s_id1, s_id2, s_id3);
    	if(result.getSuccess()) {
    		return result.getOutput();
	}  
    	else { logDebug("ERROR: Failed to get capId: " + result.getErrorMessage()); return null; }
}
 
function getNextSequence(seqType, seqName, maskName) {
	try {
		var agencySeqBiz = aa.proxyInvoker.newInstance("com.accela.sg.AgencySeqNextBusiness").getOutput();
		var params = aa.proxyInvoker.newInstance("com.accela.domain.AgencyMaskDefCriteria").getOutput();
		params.setAgencyID(aa.getServiceProviderCode());
		params.setMaskName(maskName);
		params.setRecStatus("A");
		params.setSeqType(seqType);
		params.setSeqName(seqName);
	
		var seq = agencySeqBiz.getNextMaskedSeq("ADMIN", params, null, null);
	
		return seq;
	}
	catch (err) { return null; }
} 
function getPartialCapID(capid) {
	if (capid == null || aa.util.instanceOfString(capid)) {
		return null;
	}
	//1. Get original partial CAPID  from related CAP table.
	var result = aa.cap.getProjectByChildCapID(capid, "EST", null);
	if(result.getSuccess()) {
		projectScriptModels = result.getOutput();
		if (projectScriptModels == null || projectScriptModels.length == 0) {
			logDebug("ERROR: Failed to get partial CAP with CAPID(" + capid + ")");
			return null;
		}
		//2. Get original partial CAP ID from project Model
		projectScriptModel = projectScriptModels[0];
		return projectScriptModel.getProjectID();
	}  
	else { logDebug("ERROR: Failed to get partial CAP by child CAP(" + capid + "): " + result.getErrorMessage()); return null; }
}
 
/*--------------------------------------------------------------------------------------------------------------------/
| Start ETW 12/3/14 getPeople3_0
/--------------------------------------------------------------------------------------------------------------------*/
function getPeople3_0(capId) {
    capPeopleArr = null;
    var s_result = aa.people.getCapContactByCapID(capId);
    if (s_result.getSuccess()) {
        capPeopleArr = s_result.getOutput();
        if (capPeopleArr != null || capPeopleArr.length > 0) {
            for (loopk in capPeopleArr) {
                var capContactScriptModel = capPeopleArr[loopk];
                var capContactModel = capContactScriptModel.getCapContactModel();
                var peopleModel = capContactScriptModel.getPeople();
                var contactAddressrs = aa.address.getContactAddressListByCapContact(capContactModel);
                if (contactAddressrs.getSuccess()) {
                    var contactAddressModelArr = convertContactAddressModelArr(contactAddressrs.getOutput());
                    peopleModel.setContactAddressList(contactAddressModelArr);
                }
            }
        }
        else {
            logDebug("WARNING: no People on this CAP:" + capId);
            capPeopleArr = null;
        }
    }
    else {
        logDebug("ERROR: Failed to People: " + s_result.getErrorMessage());
        capPeopleArr = null;
    }
    return capPeopleArr;
}
/*--------------------------------------------------------------------------------------------------------------------/
| End ETW 12/3/14 getPeople3_0
/--------------------------------------------------------------------------------------------------------------------*/ 
// The following function can be used when Contact Addresses are turned on.
function getPeopleWithAddresses(capId)
{
	capPeopleArr = null;
	var s_result = aa.people.getCapContactByCapID(capId);
	if(s_result.getSuccess())
	{
		capPeopleArr = s_result.getOutput();
		if(capPeopleArr != null || capPeopleArr.length > 0)
		{
			for (loopk in capPeopleArr)	
			{
				var capContactScriptModel = capPeopleArr[loopk];
				var capContactModel = capContactScriptModel.getCapContactModel();
				var peopleModel = capContactScriptModel.getPeople();
				var contactAddressrs = aa.address.getContactAddressListByCapContact(capContactModel);
				if (contactAddressrs.getSuccess())
				{
					var contactAddressModelArr = convertContactAddressModelArr(contactAddressrs.getOutput());
					peopleModel.setContactAddressList(contactAddressModelArr);    
				}
			}
		}
		
		else
		{
			capPeopleArr = null;
		}
	}
	else
	{
		logDebug("ERROR: Failed to People: " + s_result.getErrorMessage());
		capPeopleArr = null;	
	}
	return capPeopleArr;
} 
function getRenewalCapByParentCapIDForIncomplete(parentCapid)
{
	if (parentCapid == null || aa.util.instanceOfString(parentCapid))
	{
		return null;
	}
	//1. Get parent license for review
	var result = aa.cap.getProjectByMasterID(parentCapid, "Renewal", "Incomplete");
    if(result.getSuccess())
	{
		projectScriptModels = result.getOutput();
		if (projectScriptModels == null || projectScriptModels.length == 0)
		{
			aa.print("ERROR: Failed to get renewal CAP by parent CAPID(" + parentCapid + ") for review");
			return null;
		}
		//2. return parent CAPID.
		projectScriptModel = projectScriptModels[0];
		return projectScriptModel;
	}  
    else 
    {
      aa.print("ERROR: Failed to get renewal CAP by parent CAP(" + parentCapid + ") for review: " + result.getErrorMessage());
      return null;
    }
} 
function getRenewals(pcapId) {
    var vRenewalStatus = null;
    if (arguments.length > 1) {
        vRenewalStatus = arguments[1]; // use renewal status specified in args
    }
    //Get the project from the parent capId
    var PrjResult = aa.cap.getProjectByMasterID(pcapId, "Renewal", vRenewalStatus);
    if (PrjResult.getSuccess()) {
        projectScriptModels = PrjResult.getOutput();
        if (projectScriptModels == null || projectScriptModels.length == 0) {
            logDebug("ERROR: Failed to get renewal project by parent CAPID(" + pcapId + ")");
            return null;
        }
        //return  the array of renewal records
        return projectScriptModels;

    }
    else {
        logDebug("ERROR: Failed to get renewal project by parent CAPID(" + pcapId + "). " + PrjResult.getErrorMessage());
        return null;
    }
}
 

//Override standard function so that everything doesn't have to be in capital letters.
function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();
	//vScriptName = vScriptName.toUpperCase();
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
  
function getStatusDateinTaskHistory(tName, sName) {
       histResult = aa.workflow.getWorkflowHistory(capId, tName, null);
       if (histResult.getSuccess()) {
              var taskHistArr = histResult.getOutput();
              taskHistArr.sort(compareStatusDateDesc);
              for (var xx in taskHistArr) {
                     taskHist = taskHistArr[xx];
                     statusDate = taskHist.getStatusDate();
                     if ( (""+ taskHist.getDisposition()) == sName)
                           return statusDate;
              }
       }
       return null;
} 
 
function isMatchAddress(addressScriptModel1, addressScriptModel2)
{
	if (addressScriptModel1 == null || addressScriptModel2 == null)
	{
		return false;
	}
	var streetName1 = addressScriptModel1.getStreetName();
	var streetName2 = addressScriptModel2.getStreetName();
	if ((streetName1 == null && streetName2 != null) 
		|| (streetName1 != null && streetName2 == null))
	{
		return false;
	}
	if (streetName1 != null && !streetName1.equals(streetName2))
	{
		return false;
	}
	return true;
} 
/*--------------------------------------------------------------------------------------------------------------------/
| Start ETW 12/3/14 isMatchPeople3_0
/--------------------------------------------------------------------------------------------------------------------*/
function isMatchPeople3_0(capContactScriptModel, capContactScriptModel2) {
    if (capContactScriptModel == null || capContactScriptModel2 == null) {
        return false;
    }

    var contactType1 = capContactScriptModel.getCapContactModel().getPeople().getContactType();
    var contactType2 = capContactScriptModel2.getCapContactModel().getPeople().getContactType();
    var firstName1 = capContactScriptModel.getCapContactModel().getPeople().getFirstName();
    var firstName2 = capContactScriptModel2.getCapContactModel().getPeople().getFirstName();
    var lastName1 = capContactScriptModel.getCapContactModel().getPeople().getLastName();
    var lastName2 = capContactScriptModel2.getCapContactModel().getPeople().getLastName();
    var fullName1 = capContactScriptModel.getCapContactModel().getPeople().getFullName();
    var fullName2 = capContactScriptModel2.getCapContactModel().getPeople().getFullName();

    if ((contactType1 == null && contactType2 != null) || (contactType1 != null && contactType2 == null)) {
        return false;
    }

    if (contactType1 != null && !contactType1.equals(contactType2)) {
        return false;
    }

    if ((firstName1 == null && firstName2 != null) || (firstName1 != null && firstName2 == null)) {
        return false;
    }

    if (firstName1 != null && !firstName1.equals(firstName2)) {
        return false;
    }

    if ((lastName1 == null && lastName2 != null) || (lastName1 != null && lastName2 == null)) {
        return false;
    }

    if (lastName1 != null && !lastName1.equals(lastName2)) {
        return false;
    }

    if ((fullName1 == null && fullName2 != null) || (fullName1 != null && fullName2 == null)) {
        return false;
    }

    if (fullName1 != null && !fullName1.equals(fullName2)) {
        return false;
    }

    return true;
}
/*--------------------------------------------------------------------------------------------------------------------/
| End ETW 12/3/14 isMatchPeople3_0
/--------------------------------------------------------------------------------------------------------------------*/ 
function isParent(parentAltId) {
	getCapResult = aa.cap.getProjectParents(capId,1);
	if (getCapResult.getSuccess())	{
		parentArray = getCapResult.getOutput();
		if (parentArray.length && parentArray.length > 0) {
			for (pIndex in parentArray) {
				thisParentCap = parentArray[pIndex];
				if (thisParentCap.getCapID().getCustomID() == parentAltId)
					return true;
			}
		}
			
	}
	return false;
} 
function IsStrInArry(eVal,argArr) {
       for (x in argArr){
              if (eVal == argArr[x]){
                     return true;
              }
        }    
       return false;
} 
function parcelExistsOnCap()
{
	// Optional parameter, cap ID to load from
	//

	var itemCap = capId;
	if (arguments.length == 1) itemCap = arguments[0]; // use cap ID specified in args

	var fcapParcelObj = null;
	var capParcelResult = aa.parcel.getParcelandAttribute(itemCap, null);
	if (capParcelResult.getSuccess())
		var fcapParcelObj = capParcelResult.getOutput().toArray();
	else
		{ logDebug("**ERROR: Failed to get Parcel object: " + capParcelResult.getErrorType() + ":" + capParcelResult.getErrorMessage()); return false; }

	for (i in fcapParcelObj)
	{
		return true;
	}

	return false;
}

 
function removeParent(parentAppNum) 
//
// adds the current application to the parent
//
	{
	var getCapResult = aa.cap.getCapID(parentAppNum);
	if (getCapResult.getSuccess())
		{
		var parentId = getCapResult.getOutput();
		var linkResult = aa.cap.removeAppHierarchy(parentId, capId);
		if (linkResult.getSuccess())
			logDebug("Successfully unlinked to Parent Application : " + parentAppNum);
		else
			logDebug( "Error unlinking to parent application parent cap id (" + parentAppNum + "): " + linkResult.getErrorMessage());
		}
	else
		{ logDebug( "**ERROR: getting parent cap id (" + parentAppNum + "): " + getCapResult.getErrorMessage()) }
	} 
function scheduleMeeting_Mesa(vMeetingBody, vDateFrom, vDateTo, vCapId) {
	var vDuration = 0;
	var vStartTime = '';
	var vDayOfWeek = '';
	var vLocation = '';

	//aa.print(vDateFrom.getMonth() + "/" + vDateFrom.getDayOfMonth() + "/" + vDateFrom.getYear() + " : " + vDateTo.getMonth() + "/" + vDateTo.getDayOfMonth() + "/" + vDateTo.getYear());

	var vAvalMeeting = aa.calendar.getAvailableHearingItem(vMeetingBody, vDuration, vStartTime, vDateFrom, vDateTo, vDayOfWeek, vLocation).getOutput();
	vAvalMeeting.sort(function (a, b) {
		return new Date(a.getStartDate()).getTime() - new Date(b.getStartDate()).getTime()
	})
	//aa.print(vAvalMeeting.length);

	if (vAvalMeeting.length > 0) {
		var vMeeting = vAvalMeeting[0];
		var vMeetingID = vMeeting.getMeetingId();
		var vMeetingDate = vMeeting.getStartDate();
		var vMeetingGroupID = vMeeting.getMeetingGroupId();

		//aa.print(vMeetingID);
		//aa.print(vMeetingDate);
		//aa.print(vMeetingGroupID);

		var vScheduleResult = aa.calendar.scheduleHearing4V360(capId, vMeetingGroupID, vMeetingID, '', '', '').getSuccess();
		if (vScheduleResult == true) {
			return vMeetingDate;
		}
	}
	return false;
} 
function setWFDueDate_Mesa(stdChoice, vHearingDate) {
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomain(stdChoice);
	
   	if (bizDomScriptResult.getSuccess())
   		{
		var bizDomScriptObj = bizDomScriptResult.getOutput().toArray();
		for (x in bizDomScriptObj) {
			var bizDomain = bizDomScriptObj[x];
			var vBizDesc = bizDomain.getDispBizdomainValue();
			var vBizValue = bizDomain.getDescription();
			if (vBizDesc.indexOf('WF-') != -1) {
				var vWFTask = vBizDesc.substr(3,vBizDesc.length());
				var vBizValueArry = vBizValue.split(',');
				if (vBizValueArry[0] == "Today") {
					var vTaskDueDate = dateAdd(new Date(), vBizValueArry[1]);
					editTaskDueDate(vWFTask, vTaskDueDate);
				}
				else if (vBizValueArry[0] == "Hearing") {
					var vTaskDueDate = dateAdd(vHearingDate, vBizValueArry[1]);
					editTaskDueDate(vWFTask, vTaskDueDate);
				}
			}
		}
		return true;
	}
	else {
		logDebug("lookup(" + stdChoice + ") does not exist");
	}
	return false;
} 
function sumASITColumn(tObj, cNameToSum) {
	// optional params = cFilterType, cNameFilter, cValueFilter
	var retValue = 0;
	if (tObj) {
		if (arguments.length == 2) { // no filters
			for (var ea in tObj) {
				var row = tObj[ea];
				var colValue = row[cNameToSum].fieldValue;
				if (!isNaN(parseFloat(colValue))) 
					retValue += parseFloat(colValue);
			}
			return retValue;
		}
		if (arguments.length == 5) {
			filterType = arguments[2];
			cNameFilter = arguments[3];
			cValueFilter = arguments[4];
			for (var ea in tObj) {
				var row = tObj[ea];
				var colValue = row[cNameToSum].fieldValue;
				var colFilter = row[cNameFilter].fieldValue;
				if (filterType == "INCLUDE") {
					if (colFilter == cValueFilter) {
						if (!isNaN(parseFloat(colValue))) 
							retValue += parseFloat(colValue);
					}
				}
				if (filterType == "EXCLUDE") {
					if (colFilter != cValueFilter) {
						if (!isNaN(parseFloat(colValue))) 
							retValue += parseFloat(colValue);
					}
				}
			}
		}
	}
	return retValue;
}
 
/* ID-199: Criteria:
1.	On application submittal or when ASI/ASIT is updated and the record type is Enforcement/Case/NA/NA or Enforcement/Environmental/NA/NA or AnimalControl/Complaint/NA/NA

Execute Script Actions
1.	Load the ASIT "VIOLATION INFORMATION"
2.	For every row in the VIOLATION INFORMATION ASIT, retrieve the value in the column "Citation Number". 
3.	Check if a row exists in the ASIT CITATION CHECKLIST with a column "Citation Number" having the same value. If it does not, then create a new row, populating the "Citation Number" column with the value from the VIOLATION INFORMATION ASIT.
*/
function updateViolationInfoCustomList(){
try{
	logDebug("Executing updateViolationInfoCustomList().");
	if(VIOLATIONINFORMATION.length>0){
		for(row in VIOLATIONINFORMATION){
			var rowFound = false;
			for(wor in  CITATIONCHECKLIST){
				if(""+VIOLATIONINFORMATION[row]["Citation Number"]==""+CITATIONCHECKLIST[wor]["Citation Number"]){
					rowFound=true;
				}
			}
			if(!rowFound){
				var rowCiteCheck=new Array(); 
				rowCiteCheck["Citation Number"]=VIOLATIONINFORMATION[row]["Citation Number"]; 
				rowCiteCheck["Citation Issued Date"]=""; 
				rowCiteCheck["Citation Issued Time"]=""; 
				rowCiteCheck["Certified Mail Sent Date"]=""; 
				rowCiteCheck["Certified Mail BOLO Date"]=""; 
				rowCiteCheck["Certified Mail Delivered Date"]=""; 
				rowCiteCheck["Certified Mail Returned Date"]=""; 
				rowCiteCheck["Process Server Out Date"]=""; 
				rowCiteCheck["Process Server Served Date"]=""; 
				rowCiteCheck["Affidavit of Service Complete Date"]=""; 
				rowCiteCheck["Defaulted Date"]=""; 
				rowCiteCheck["Hearing Scheduled Date"]=""; 
				rowCiteCheck["Hearing Scheduled Date"]=""; 
				rowCiteCheck["Compliance Hearing Date"]=""; 
				rowCiteCheck["Fee Monitor Date"]=""; 
				rowCiteCheck["Is this a payment plan?"]=""; 
				rowCiteCheck["Amount Due Payment"]=""; 
				rowCiteCheck[" Lien Applied Date"]=""; 
				rowCiteCheck["Collections Date"]=""; 
				rowCiteCheck["Citation Comments"]=""; 
				addToASITable("CITATION CHECKLIST",rowCiteCheck);
			}
		}
	}
}catch (err){
	logDebug("A JavaScript Error occurred: updateViolationInfoCustomList: " + err.message);
}} 
function voidRemoveFee(vFeeCode){
	var feeSeqArray = new Array();
	var invoiceNbrArray = new Array();
	var feeAllocationArray = new Array();
	var itemCap = capId;
	if (arguments.length > 1){
		itemCap = arguments[1];
	}
	var targetFees = loadFees(itemCap);
	for (tFeeNum in targetFees){// for each fee found, if the fee is "NEW" remove it, if the fee is "INVOICED" void it and invoice the void
		targetFee = targetFees[tFeeNum];
		if (targetFee.code.equals(vFeeCode)){// only remove invoiced or new fees, however at this stage all AE fees should be invoiced.
			if (targetFee.status == "INVOICED"){
				var editResult = aa.finance.voidFeeItem(itemCap, targetFee.sequence);
				if (editResult.getSuccess()){
					logDebug("Voided existing Fee Item: " + targetFee.code);
				}
				else { 
					logDebug( "**ERROR: voiding fee item (" + targetFee.code + "): " + editResult.getErrorMessage());
					return false;
				}
				var feeSeqArray = new Array();
				var paymentPeriodArray = new Array();
				feeSeqArray.push(targetFee.sequence);
				paymentPeriodArray.push(targetFee.period);
				var invoiceResult_L = aa.finance.createInvoice(itemCap, feeSeqArray, paymentPeriodArray);
				if (!invoiceResult_L.getSuccess()){
					logDebug("**ERROR: Invoicing the fee items voided " + thisFee.code + " was not successful.  Reason: " +  invoiceResult_L.getErrorMessage());
					return false;
				}
			}
			if (targetFee.status == "NEW"){// delete the fee
				var editResult = aa.finance.removeFeeItem(itemCap, targetFee.sequence);
				if (editResult.getSuccess()){
					logDebug("Removed existing Fee Item: " + targetFee.code);
				}
				else {
					logDebug( "**ERROR: removing fee item (" + targetFee.code + "): " + editResult.getErrorMessage());
					return false;
				}
			}
		}
	}
}

function mesaWorkingDays(curDate, daysToAdd)
{
  var theDate = new Date(curDate);
  var dayOfWeek = theDate.getDay();
  var mesaFactor = parseInt((parseInt(daysToAdd/4))* 1);

  if (dayOfWeek == 4)
  {
    mesaFactor += 1;
  }

  var dayAdjustment = parseInt(daysToAdd) + mesaFactor;

  theDate = dateAdd(theDate, daysToAdd, 'Y');

  return theDate;
}

function doesCapConditionExist(conditionName) // optional altId
{
    var theCapID = null;
    if ( arguments.length == 2 )
    {
        theCapID = aa.cap.getCapID(arguments[1]).getOutput();
    }
    else 
    {
        theCapID = capId;
    }

    var condResult = aa.capCondition.getCapConditions(theCapID);
    if (condResult.getSuccess())
    {
        var capConds = condResult.getOutput();
		var retVal = false;
        for (cc in capConds) 
        {
            var thisCond = capConds[cc];
            var cDesc = thisCond.getConditionDescription().toUpperCase();
            if(cDesc == conditionName.toUpperCase())
            {
                retVal = true;
				break;
            }
        }
		return retVal;
    }
    else
    {
        return false;
    }
}

function getInspectorObject() // optional altId
{
    // code officer aka inspector

    if ( arguments.length == 1 )
    {
        capId = aa.cap.getCapID(arguments[0]).getOutput(); // this is expected in getGisInfo
    }

    var inspector = getGISInfo("Accela/AccelaBoundaries", "Code_Officer_Boundary", "CODE_OFFICER");
    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        var inspRes = null;
        switch (nameArray.length)
        {
            case 1:
                inspRes = aa.person.getUser(inspector);
                break;
            case 2:
                inspRes = aa.person.getUser(nameArray[0], "", nameArray[1]);
                break;
            case 3:
                inspRes = aa.person.getUser(nameArray[0], nameArray[1], nameArray[2]);
                break;
        }
        
		if (inspRes.getSuccess())
        {
			return inspRes.getOutput();
		}
        else
        {
            logDebug("Failed to create inspector object!");
            return false;
        }
    }
	else 
	{
		return false;
	}
}

function doesInspectionExist(inspectionType)
{
	var inspResultObj = aa.inspection.getInspections(capId);
	if (inspResultObj.getSuccess())
	{
		var inspList = inspResultObj.getOutput();
		for (xx in inspList)
		{
			if (String(inspectionType).equals(inspList[xx].getInspectionType()))
			{
				return true;
			}
		}
	}
	return false;
}

function scheduleInspectionDateWithInspector(iType, dateToSched, inspectorID )
{
	var inspectorObj = null;
	var inspTime = null;
	
	var inspRes = aa.person.getUser(inspectorID);
	if (inspRes.getSuccess())
	{
		inspectorObj = inspRes.getOutput();
	}
	else
	{
		logDebug("Inspector with ID = " + inspectorID + " not found!");
	}

	//Workaround Fix recommended by Accela for Error received for sync issue
	//Can't get the Service Provider Code from the I18NModel 
	com.accela.aa.util.WebThreadLocal.setServiceProviderCode("MESA");

	var schedRes = aa.inspection.scheduleInspection(capId, inspectorObj, aa.date.parseDate(dateToSched), inspTime, iType, "Scheduled via Script");

	if (schedRes.getSuccess())
	{
		logDebug("Successfully scheduled inspection: " + iType + " for " + dateToSched);
	}
	else
	{
		logDebug( "**ERROR: adding scheduling inspection (" + iType + "): " + " Inspector ID: " + inspectorID + " Date to Schedule: " + dateToSched + " " + schedRes.getErrorMessage());
	}
}

function scheduleInspectionDateWithInspectorObject(iType, dateToSched, inspectorObj )
{
	var inspTime = null;

	//Workaround Fix recommended by Accela for Error received for sync issue
	//Can't get the Service Provider Code from the I18NModel 
	com.accela.aa.util.WebThreadLocal.setServiceProviderCode("MESA");
	
	var schedRes = aa.inspection.scheduleInspection(capId, inspectorObj, aa.date.parseDate(dateToSched), inspTime, iType, "Scheduled via Script");

	if (schedRes.getSuccess())
	{
		logDebug("Successfully scheduled inspection: " + iType + " for " + dateToSched);
	}
	else
	{
		logDebug( "**ERROR: adding scheduling inspection (" + iType + "): " + schedRes.getErrorMessage());
	}
}

function getTodayAsString()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    return mm + '/' + dd + '/' + yyyy;
}

function getRecordPriority() // optional altId
{
    var theCapID = null;
    if ( arguments.length == 1 )
    {
        theCapID = aa.cap.getCapID(arguments[0]).getOutput();
    }
    else 
    {
        theCapID = capId;
    }
    var cdScriptObjResult = aa.cap.getCapDetail(theCapID);
    if (cdScriptObjResult.getSuccess())
    {
        var cdScriptObj = cdScriptObjResult.getOutput();
        if ( cdScriptObj ) 
        {
            var cd = cdScriptObj.getCapDetailModel();
            return cd.getPriority();
        }
        else
        {
            logDebug("Failed to get record priority (cdScriptObj)")
            return false;
        }
    }
    else 
    {
        logDebug("Failed to get record priority (cdScriptObjResult)")
        return false;
    }
}

function getThisInspectionId_ISA() // optional altId
{
    var theCapID = null;
    if ( arguments.length == 3 )
    {
        theCapID = aa.cap.getCapID(arguments[2]).getOutput();
    }
    else 
    {
        theCapID = capId;
    }

    var inspResultObj = aa.inspection.getInspections(capId);
    if (inspResultObj.getSuccess()) {
        var inspList = inspResultObj.getOutput();
        
        //if ( inspList.length > 1 )
        //{
            //var compareFunction = new function compareByNumber(a, b) { return a.getIdNumber() - b.getIdNumber(); }
            //inspList.sort(compareFunction);
        //}
        
        return inspList[inspList.length-1].getIdNumber();
    }
    else 
    {
        logDebug("Failed to get Inspection Id.")
        return false;
    }
}

function isTaskActive_Mesa(wfstr) // optional process name
{
	var useProcess = false;
	var processName = "";

	if (arguments.length == 2) {
		processName = arguments[1]; // subprocess
		useProcess = true;
	}

	var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, "Y");
	if (workflowResult.getSuccess())
    {
		wfObj = workflowResult.getOutput();
    }
	else 
    {
		logDebug("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
		return false;
	}

    if (wfObj.length == 0) 
    {
        logDebug("No workflow tasks returned.");
        return false;
    }
    else
    {
        for (i in wfObj)
        {
            fTask = wfObj[i];
            if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName)))
            {
                if (fTask.getActiveFlag().equals("Y"))
                {
                    logDebug(wfstr + " task is active!");
                    return true;
                }
                else
                {
                    logDebug(wfstr + " task is NOT active!");
                    return false;
                }
            }
        }
        // if we reach this point then the workflow task was not found, return false
        // this could be because the record has not reached that part in the workflow
        logDebug(wfstr + " task was not found, returning false.");
        return false;
    }
}

function isInFloodZone() 
{
    var tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    if (tagFieldArray && tagFieldArray.length > 0) 
    {
        if (IsStrInArry("FLDP", tagFieldArray)) 
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

function getBuildingInspectorObject() // optional altId
{
    // code officer aka inspector

    if ( arguments.length == 1 )
    {
        capId = aa.cap.getCapID(arguments[0]).getOutput(); // this is expected in getGisInfo
    }

    var inspector = getGISInfo("Accela/AccelaBoundaries", "Building_Inspection_Areas", "NAME");
    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        var inspRes = null;
        switch (nameArray.length)
        {
            case 1:
                inspRes = aa.person.getUser(inspector);
                break;
            case 2:
                inspRes = aa.person.getUser(nameArray[0], "", nameArray[1]);
                break;
            case 3:
                inspRes = aa.person.getUser(nameArray[0], nameArray[1], nameArray[2]);
                break;
        }
        
		if (inspRes.getSuccess())
        {
			return inspRes.getOutput();
		}
        else
        {
            logDebug("Failed to create building inspector object!");
            return false;
        }
    }
	else 
	{
		return false;
	}
}

function getEnforcementInspectorObject() // optional altId
{
    // code officer aka inspector

    if ( arguments.length == 1 )
    {
        capId = aa.cap.getCapID(arguments[0]).getOutput(); // this is expected in getGisInfo
    }

    var inspector = getGISInfo("Accela/AccelaBoundaries", "Code_Officer_Boundary", "CODE_OFFICER");
    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        var inspRes = null;
        switch (nameArray.length)
        {
            case 1:
                inspRes = aa.person.getUser(inspector);
				logDebug("1");
                break;
            case 2:
                inspRes = aa.person.getUser(nameArray[0], "", nameArray[1]);
				logDebug("2");
                break;
            case 3:
                inspRes = aa.person.getUser(nameArray[0], nameArray[1], nameArray[2]);
				logDebug("3");
                break;
        }
        
		if (inspRes.getSuccess())
        {
			return inspRes.getOutput();
		}
        else
        {
            logDebug("Failed to create enforcement inspector object!");
            return false;
        }
    }
	else 
	{
		return false;
	}
}

function getDocs()
{
    // works after a record has been submitted.
    // if run during ASB, will return a zero length array
    logDebug("PLN_PlanningAndZoningSitePlanReview - getDocs()");

    var docArray = [];
    var getResult = aa.document.getCapDocumentList(capId ,currentUserID);

    if (getResult && getResult.getSuccess()){
        // copy data from [object JavaArray]  to javascript array of strings
        var objArray = getResult.getOutput();
        for(i in objArray){
            var xx = objArray[i].getDocCategory();
            // logDebug("xx = " + xx);
            docArray.push(xx);
        }
    } else{
        // method failed, so try method for ASB event
        return getDocsAsb();
    } 
    return docArray;
}

function getDocsAsb()
{
    // works before a record has been submitted
    // to test, create a record and save without submitting 
    logDebug("PLN_PlanningAndZoningSitePlanReview - getDocsAsb()");
    var docArray = [];
    //logDebug("trying aa.env.getValue..");
    var getResult = aa.env.getValue("DocumentModelList");

    if(!getResult || getResult == ""){
        //logDebug("trying aa.document.getDoc..");
        getResult = aa.document.getDocumentListByEntity(capId.toString(),"TMP_CAP").getOutput();
    }

    // note: this getResult object does not support getSuccess()
    if (getResult) {
        //logDebug("have docs!");
        // copy data from [object JavaObject]  to javascript array of strings
        var arrCount = getResult.size();
        for(i=0; i<arrCount; i++)
        { 
            if(getResult.get(i) != null){
                var xx = getResult.get(i).getDocCategory()
                //logDebug("xx = " + xx);
                docArray.push(xx);
            }
        }
    } 
    return docArray; 
}

function getTaskAssignedStaff(wfstr) // optional process name.
{
	var useProcess = false;
	var processName = "";
	if (arguments.length == 2) {
		processName = arguments[1]; // subprocess
		useProcess = true;
	}

	var taskDesc = wfstr;
	if (wfstr == "*") {
		taskDesc = "";
	}
	var workflowResult = aa.workflow.getTaskItems(capId, taskDesc, processName, null, null, null);
	if (workflowResult.getSuccess())
		wfObj = workflowResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
		return false;
	}

	for (i in wfObj) {
		var fTask = wfObj[i];
		if ((fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) || wfstr == "*") && (!useProcess || fTask.getProcessCode().equals(processName))) {
			var vStaffUser = aa.cap.getStaffByUser(fTask.getAssignedStaff().getFirstName(),fTask.getAssignedStaff().getMiddleName(),fTask.getAssignedStaff().getLastName(),fTask.getAssignedStaff().toString()).getOutput(); 
			if (vStaffUser != null) {			
				return vStaffUser.getUserID();
			}
		}
	}
	return false;
}

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
function getWFHours(capId) {
	// array to hold the tasks that were passed as extra parameters(arguments)
	var tasks = new Array;
	// variable for sum of hours
	var hoursSpent = 0;
	// Parse the tasks
	for(var x = 1;x < arguments.length; x++){
		tasks.push(arguments[x]);
	}
	
	// Get the workflow history
	var workflowResult = aa.workflow.getWorkflowHistory(capId, null);

	// Working with the workflow result
	if(workflowResult.getSuccess()){
		wfResult = workflowResult.getOutput(); // Get the output
		for(x in wfResult){ // Parse through each process in the workflow
			if(exists(wfResult[x].getTaskDescription(), tasks)){
				// add the hours spent.
				hoursSpent += Number(wfResult[x].getHoursSpent());
			}
		}
	}
	else {
		logDebug("getWFHours could not get a workflow history")
	}
	return hoursSpent;
}

/*function sendNotificationAndSaveInRecord(from, to, cc, templateName, templateParameters, fileNames)
{
    // can pass in a capId as an optional parameter
    if (arguments.length == 7) 
    {
        capId = arguments[6];
    }

    if (typeof (templateName) == "undefined" || templateName == null) 
    {
        logDebug("Could not send email. No nofification template specified.");
        return;
    }

    if (typeof (to) == "undefined" || to == null) 
    {
        to = "";
    }

    if (typeof (cc) == "undefined" || cc == null) 
    {
        cc = "";
    }

    if (typeof (fileNames) == "undefined" || fileNames == null) 
    {
        fileNames = [];
    }

    var capId4Email = aa.cap.createCapIDScriptModel(capId.getID1(), capId.getID2(), capId.getID3());

    aa.document.sendEmailAndSaveAsDocument(from, to, cc, templateName, templateParameters, capId4Email, fileNames);
}*/

function getUnpaidFeeBalance() { // optional capId
	// Searches payment fee items and returns the unpaid balance of a fee item
	// Sums fee items if more than one exists.  
	var amtFee = 0;
	var amtPaid = 0;
	var feeSch;
    var thisCapId;

	if (arguments.length == 1)
    {
		thisCapId = arguments[0];
    }
    else {
        thisCapId = capId;
    }

	var feeResult = aa.fee.getFeeItems(thisCapId);

	if (feeResult.getSuccess()) 
    {
		var feeObjArr = feeResult.getOutput();
	} 
    else 
    {
		logDebug("**ERROR: getting fee items: " + capContResult.getErrorMessage());
		return false
	}

	for (ff in feeObjArr)
    {
		if (feeObjArr[ff].getFeeitemStatus() != "INVOICED" ) {
			amtFee += feeObjArr[ff].getFee();
			var pfResult = aa.finance.getPaymentFeeItems(thisCapId, null);
			if (pfResult.getSuccess()) {
				var pfObj = pfResult.getOutput();
				for (ij in pfObj)
                {
					if (feeObjArr[ff].getFeeSeqNbr() == pfObj[ij].getFeeSeqNbr())
                    {
						amtPaid += pfObj[ij].getFeeAllocation()
                    }
                }
			}
		}
    }
	return amtFee - amtPaid;
}

function getUnpaidFeeBalance() { // optional capId
	// Searches payment fee items and returns the unpaid balance of a fee item
	// Sums fee items if more than one exists.  
	var amtFee = 0;
	var amtPaid = 0;
	var feeSch;
    var thisCapId;

	if (arguments.length == 1)
    {
		thisCapId = arguments[0];
    }
    else {
        thisCapId = capId;
    }

	var feeResult = aa.fee.getFeeItems(thisCapId);

	if (feeResult.getSuccess()) 
    {
		var feeObjArr = feeResult.getOutput();
	} 
    else 
    {
		logDebug("**ERROR: getting fee items: " + capContResult.getErrorMessage());
		return false
	}

	for (ff in feeObjArr)
    {
		if (feeObjArr[ff].getFeeitemStatus() != "INVOICED" ) {
			amtFee += feeObjArr[ff].getFee();
			var pfResult = aa.finance.getPaymentFeeItems(thisCapId, null);
			if (pfResult.getSuccess()) {
				var pfObj = pfResult.getOutput();
				for (ij in pfObj)
                {
					if (feeObjArr[ff].getFeeSeqNbr() == pfObj[ij].getFeeSeqNbr())
                    {
						amtPaid += pfObj[ij].getFeeAllocation()
                    }
                }
			}
		}
    }
	return amtFee - amtPaid;
}

function getLastRecordDateInWorkflowHistory()
{ // optional capId
    var thisCapId;

	if (arguments.length == 1)
    {
		thisCapId = arguments[0];
    }
    else {
        thisCapId = capId;
    }

    var retDate = false;

	// get the workflow history
	var workflowResult = aa.workflow.getWorkflowHistory(thisCapId, null);

	// working with the workflow result
	if(workflowResult.getSuccess())
    {
		wfResult = workflowResult.getOutput(); // get the output
		for(x in wfResult){ // parse through each process in the workflow
            var audDate = new Date( wfResult[x].taskItem.auditDateString.replace("T", " ").replace(".0", "").replace("-", "/"));
            if ( retDate == false )
            {
                retDate = audDate;
            }
            else if ( retDate < audDate )
            {
                retDate = audDate;
            }
		}
	}
	else {
		logDebug("getLastRecordDateInWorkflowHistory() could not get a workflow history")
	}
	return retDate;
}

function getEnforcementInspectorId() // optional altId
{
    // code officer aka inspector

    if ( arguments.length == 1 )
    {
        capId = aa.cap.getCapID(arguments[0]).getOutput(); // this is expected in getGisInfo
    }

    var inspector = getGISInfo("Accela/AccelaBoundaries", "Code_Officer_Boundary", "CODE_OFFICER");  //Code
    
    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        if (inspector != "undefined" || inspector != null) {
			// have to re-grab the user since the id won't show up in this object.
			inspUserObj = aa.person.getUser(nameArray[0],"",nameArray[1]).getOutput();
			if (inspUserObj != null){
			return inspUserObj.getUserID();
				}
			}
		return null;
	}
}

function getBuildingInspectorId() // optional altId
{
    // code officer aka inspector

    if ( arguments.length == 1 )
    {
        capId = aa.cap.getCapID(arguments[0]).getOutput(); // this is expected in getGisInfo
    }

    var inspector = getGISInfo("Accela/AccelaBoundaries", "Building_Inspection_Areas", "NAME");  //Building

    if (inspector) 
    {
        logDebug("Inspector: " + inspector);
        var nameArray = inspector.split(" ");
        if (inspector != "undefined" || inspector != null) {
			// have to re-grab the user since the id won't show up in this object.
			inspUserObj = aa.person.getUser(nameArray[0],"",nameArray[1]).getOutput();
			if (inspUserObj != null){
			return inspUserObj.getUserID();
				}
			}
		return null;
	}
}

function addDays(date, days) 
{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}