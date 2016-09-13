/*
This file if a referance of avalible methods and classes in refernce to Accela scripting API.  Do Not Compile or eval,
best use leave open when programming w/ Atom IO or another IDE that can autocomplete from any open buffer.
*/
/*Methods of aa
var aa = function() { 
  hashCode = new function(){};
  return {
    hashCode: hashCode
  };
}();*/

/*
aa.hashCode()
aa.runAdHoc();
aa.runOracleReport();
aa.log();
aa.getHashtable();
aa.getClass();
aa.print();
aa.sendEmail();
aa.debug();
aa.sendMail();
aa.equals();
aa.runScriptInNewTransaction();
aa.wait();
aa.timerStart();
aa.runAsyncScript();
aa.getAuditID();
aa.runScript();
aa.toString();
aa.timerEnd();
aa.sendEmailWithAttachedFiles();
aa.notify();
aa.abortScript();
aa.getServiceProviderCode();
aa.notifyAll();
aa.getDebugOutput();
aa.sleep();
//aa properties that are classes
aa.bizDomain;
aa.serviceProvider;
aa.guidesheet;
aa.inspection;
aa.specialSearch;
aa.licenseProfessional;
aa.m_licenseProfessional;
aa.gStructure;
aa.parcel;
aa.asset;
aa.gis;
aa.messageResources;
aa.tagStart;
aa.calendar;
aa.eventLog;
aa.globalSearch;
aa.cashier;
aa.serviceProviderCode;
aa.date;
aa.person;
aa.invoice;
aa.activitySpecInfo;
aa.reconciliationScript;
aa.structEstabScript;
aa.partTransaction;
aa.addressCondition;
aa.env;
aa.parcelCondition;
aa.wsConsumer;
aa.set;
aa.bStructure;
aa.ePayment;
aa.additionalInfo;
aa.smartNotice;
aa.exchange;
aa.document;
aa.education;
aa.condition;
aa.cap;
aa.shoppingCart;
aa.proxyInvoker;
aa.ownerCondition;
aa.commonCondition;
aa.trustAccount;
aa.licenseScript;
aa.capCondition;
aa.batchJob;
aa.httpClient;
aa.ratingFormula;
aa.owner;
aa.assetCA;
aa.userright;
aa.people;
aa.util;
aa.appSpecificInfo;
aa.appSpecificTableScript;
aa.genericTemplate;
aa.reportManager;
aa.expiration;
aa.taskSpecificInfo;
aa.timeStart;
aa.oAuthClient;
aa.fee;
aa.caeCondition;
aa.contractorLicense;
aa.timeAccounting;
aa.publicUser;
aa.examination;
aa.workflow;
aa.continuingEducation;
aa.finance;
aa.address;
*/

//class methods
function BizDomainScript() {
  this.getBizDomainByDescription = function () {/*
ScriptResult getBizDomainByDescription(java.lang.String,java.lang.String,java.lang.String)
*/};


  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getBizDomainsBySuperAgency = function () {/*
ScriptResult getBizDomainsBySuperAgency(java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getBizDomainByValue = function () {/*
ScriptResult getBizDomainByValue(java.lang.String,java.lang.String,java.lang.String)
ScriptResult getBizDomainByValue(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.createBizDomain = function () {/*
ScriptResult createBizDomain(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult createBizDomain(com.accela.aa.aamain.systemConfig.BizDomainModel)
*/};

  this.editBizDomain = function () {/*
ScriptResult editBizDomain(com.accela.aa.aamain.systemConfig.BizDomainModel,java.lang.String)
ScriptResult editBizDomain(com.accela.aa.aamain.systemConfig.BizDomainModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getBizDomain = function () {/*
ScriptResult getBizDomain(java.lang.String)
*/};

  this.getSpecialHandle = function () {/*
ScriptResult getSpecialHandle()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function ServiceProviderScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getInspectionListForReschedule = function () {/*
ScriptResult getInspectionListForReschedule(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getInspMilestoneByCapID = function () {/*
ScriptResult getInspMilestoneByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.deleteInspectionDiscipline = function () {/*
ScriptResult deleteInspectionDiscipline(java.lang.String,java.lang.String)
*/};

  this.assignAppForEvent = function () {/*
ScriptResult assignAppForEvent(java.lang.String,java.lang.String,java.lang.String,com.accela.aa.calendar.calendar.CalendarEventModel)
ScriptResult assignAppForEvent(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.updateInspectionForSuperVisor = function () {/*
ScriptResult updateInspectionForSuperVisor(com.accela.aa.inspection.inspection.InspectionModel)
*/};

  this.needDDA = function () {/*
ScriptResult needDDA(InspectionScriptModel)
*/};

  this.cancelInspection = function () {/*
ScriptResult cancelInspection(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.getNextAvailableTime = function () {/*
ScriptResult getNextAvailableTime(java.lang.String,java.lang.String,java.lang.String,long[],ScriptDateTime)
ScriptResult getNextAvailableTime(long[],ScriptDateTime)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getDiscipline = function () {/*
ScriptResult getDiscipline(java.lang.String)
*/};

  this.getInspectionListForSchedule = function () {/*
ScriptResult getInspectionListForSchedule(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.reschedule = function () {/*
ScriptResult reschedule(InspectionScriptModel)
ScriptResult reschedule(com.accela.aa.aamain.cap.CapIDModel,long,com.accela.aa.aamain.people.SysUserModel,ScriptDateTime,java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getInspectorsWorkload = function () {/*
ScriptResult getInspectorsWorkload(long[],com.accela.aa.aamain.cap.CapIDModel,ScriptDateTime)
*/};

  this.checkAssignAppForEvent = function () {/*
ScriptResult checkAssignAppForEvent(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult checkAssignAppForEvent(java.lang.String,java.lang.String,java.lang.String,com.accela.aa.calendar.calendar.CalendarEventModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};
}

function InspectionScript() {
  this.notify = function () {/*
void notify()
*/};

  this.newInspectionScriptModel = function () {/*
InspectionScriptModel newInspectionScriptModel(java.lang.String,java.lang.String)
*/};

  this.deleteRecurrings = function () {/*
ScriptResult deleteRecurrings(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.saveCarryOverItems = function () {/*
ScriptResult saveCarryOverItems(java.util.List,com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.reScheduleInspection = function () {/*
ScriptResult reScheduleInspection(com.accela.aa.inspection.inspection.InspectionModel,com.accela.aa.aamain.people.SysUserModel)
*/};

  this.copyInspectionWithGuideSheet = function () {/*
ScriptResult copyInspectionWithGuideSheet(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.inspection.inspection.InspectionModel)
*/};

  this.autoAssignInspectorForMultiInspection = function () {/*
ScriptResult autoAssignInspectorForMultiInspection(java.lang.String,java.lang.String,java.lang.String,long[],java.lang.String)
*/};

  this.findByInspectorDateRange = function () {/*
ScriptResult findByInspectorDateRange(com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String)
*/};

  this.editInspection = function () {/*
ScriptResult editInspection(InspectionScriptModel)
*/};

  this.getInspectionScriptModel = function () {/*
ScriptResult getInspectionScriptModel()
*/};

  this.resultInspection = function () {/*
ScriptResult resultInspection(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getInspections = function () {/*
ScriptResult getInspections(com.accela.aa.aamain.cap.CapIDModel)
ScriptResult getInspections(java.lang.String,java.lang.String)
*/};

  this.getWorkflowCalendarEvents = function () {/*
ScriptResult getWorkflowCalendarEvents(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getInspection = function () {/*
ScriptResult getInspection(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getInspectionDiscipline = function () {/*
ScriptResult getInspectionDiscipline(java.lang.String)
*/};

  this.getUnassignedInspections = function () {/*
ScriptResult getUnassignedInspections(java.lang.String,java.lang.String)
ScriptResult getUnassignedInspections()
*/};

  this.updateInspectionMilestone = function () {/*
ScriptResult updateInspectionMilestone(com.accela.aa.inspection.flow.GInspProcessModel[])
*/};

  this.findByInspectorDaily = function () {/*
ScriptResult findByInspectorDaily(com.accela.aa.aamain.people.SysUserModel,java.lang.String)
*/};

  this.scheduleInspection = function () {/*
ScriptResult scheduleInspection(com.accela.aa.inspection.inspection.InspectionModel,com.accela.aa.aamain.people.SysUserModel)
ScriptResult scheduleInspection(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.people.SysUserModel,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.addInspectionDiscipline = function () {/*
ScriptResult addInspectionDiscipline(java.lang.String,java.lang.String)
*/};

  this.pendingInspection = function () {/*
ScriptResult pendingInspection(com.accela.aa.inspection.inspection.InspectionModel)
*/};

  this.carryOverGSItems = function () {/*
ScriptResult carryOverGSItems(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.updateInspectionType = function () {/*
ScriptResult updateInspectionType(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.autoAssignInspector = function () {/*
ScriptResult autoAssignInspector(java.lang.String,java.lang.String,java.lang.String,long,java.lang.String)
*/};

  this.validateFailGuidesheetItems = function () {/*
ScriptResult validateFailGuidesheetItems(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getInspectionType = function () {/*
ScriptResult getInspectionType(java.lang.String,java.lang.String)
*/};

  this.checkAvailableTime = function () {/*
ScriptResult checkAvailableTime(java.lang.String,java.lang.String,java.lang.String,long[],ScriptDateTime)
ScriptResult checkAvailableTime(long[],ScriptDateTime)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getPureEnglishText = function () {/*
ScriptResult getPureEnglishText(java.lang.String)
*/};

  this.createSearchData = function () {/*
ScriptResult createSearchData(com.accela.aa.aamain.people.GenericSearchModel)
*/};

  this.updateSearchDataStatusByCapID = function () {/*
ScriptResult updateSearchDataStatusByCapID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.newSearchDataModel = function () {/*
ScriptResult newSearchDataModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.isTradeNameExist = function () {/*
ScriptResult isTradeNameExist(java.lang.String,java.lang.String)
*/};
}

function SpecialSearchScript() {
  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getSearchDataList = function () {/*
ScriptResult getSearchDataList(com.accela.aa.aamain.people.GenericSearchModel)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.recreateBatchSearchData = function () {/*
ScriptResult recreateBatchSearchData(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.people.GenericSearchModel[])
*/};

  this.getPureArabicText = function () {/*
ScriptResult getPureArabicText(java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.removeSearchDataByCapID = function () {/*
ScriptResult removeSearchDataByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createBatchSearchData = function () {/*
ScriptResult createBatchSearchData(com.accela.aa.aamain.people.GenericSearchModel[])
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getLicensedProfessionalsByPK = function () {/*
ScriptResult getLicensedProfessionalsByPK(LicenseProfessionalScriptModel)
*/};

  this.getLicensedProfessionalsByCapID = function () {/*
ScriptResult getLicensedProfessionalsByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createLicensedProfessional = function () {/*
ScriptResult createLicensedProfessional(LicenseProfessionalScriptModel)
*/};

  this.removeLicensedProfessional = function () {/*
ScriptResult removeLicensedProfessional(LicenseProfessionalScriptModel)
*/};

  this.removeRefInfoTableGroupCode = function () {/*
ScriptResult removeRefInfoTableGroupCode(LicenseProfessionalScriptModel)
*/};

  this.getRefLicProfByOnlineUser = function () {/*
ScriptResult getRefLicProfByOnlineUser(java.lang.String)
*/};

  this.updateRefInfoTableValues = function () {/*
ScriptResult updateRefInfoTableValues(LicenseProfessionalScriptModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.copyLicenseProfessionalScriptModel = function () {/*
ScriptResult copyLicenseProfessionalScriptModel(LicenseProfessionalScriptModel,LicenseProfessionalScriptModel)
*/};

  this.createRefInfoTable = function () {/*
ScriptResult createRefInfoTable(LicenseProfessionalScriptModel)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function LicenseProfessionalScript() {
  this.getRefInfoTableGroupCode = function () {/*
ScriptResult getRefInfoTableGroupCode(LicenseProfessionalScriptModel)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.removeInfoTableGroupCode = function () {/*
ScriptResult removeInfoTableGroupCode(LicenseProfessionalScriptModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.getContactAttributeScriptModel = function () {/*
ScriptResult getContactAttributeScriptModel()
*/};

  this.getInfoTableGroupCode = function () {/*
ScriptResult getInfoTableGroupCode(LicenseProfessionalScriptModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.copyInfoTable = function () {/*
ScriptResult copyInfoTable(LicenseProfessionalScriptModel)
*/};

  this.getLicenseProf = function () {/*
ScriptResult getLicenseProf(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createInfoTable = function () {/*
ScriptResult createInfoTable(LicenseProfessionalScriptModel)
*/};

  this.editLicensedProfessional = function () {/*
ScriptResult editLicensedProfessional(LicenseProfessionalScriptModel)
*/};

  this.getLicenseProfessionScriptModel = function () {/*
ScriptResult getLicenseProfessionScriptModel()
ScriptResult getLicenseProfessionScriptModel(com.accela.aa.aamain.people.LicenseProfessionalModel)
*/};

  this.createLicensedProfessionals = function () {/*
ScriptResult createLicensedProfessionals(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.deleteStrucutureRelation = function () {/*
ScriptResult deleteStrucutureRelation(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureModel,java.lang.String)
*/};

  this.getStrucutureLocation = function () {/*
ScriptResult getStrucutureLocation(long,java.lang.String,java.lang.String,java.lang.String)
ScriptResult getStrucutureLocation(com.accela.aa.structure.structure.StructureModel,java.lang.String)
*/};

  this.addAttribute = function () {/*
ScriptResult addAttribute(long,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addAttribute(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.AttributeModel,java.lang.String)
*/};

  this.deleteStrucutureOwner = function () {/*
ScriptResult deleteStrucutureOwner(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureOwnerModel,java.lang.String)
ScriptResult deleteStrucutureOwner(long,long,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.updateAttribute = function () {/*
ScriptResult updateAttribute(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.AttributeModel,java.lang.String)
ScriptResult updateAttribute(long,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getStructure = function () {/*
ScriptResult getStructure(long,java.lang.String)
*/};

  this.getStrucutureOwners = function () {/*
ScriptResult getStrucutureOwners(com.accela.aa.structure.structure.StructureModel,java.lang.String)
ScriptResult getStrucutureOwners(long,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.deleteAttribute = function () {/*
ScriptResult deleteAttribute(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.AttributeModel,java.lang.String)
ScriptResult deleteAttribute(long,long,java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getChildStructures = function () {/*
ScriptResult getChildStructures(long,java.lang.String,java.lang.String,java.lang.String)
ScriptResult getChildStructures(com.accela.aa.structure.structure.StructureModel,java.lang.String)
*/};

  this.addStrucutureOwner = function () {/*
ScriptResult addStrucutureOwner(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureOwnerModel,java.lang.String)
ScriptResult addStrucutureOwner(long,long,java.lang.String)
*/};
}

function GStructureScript() {
  this.addStrucutureRelation = function () {/*
ScriptResult addStrucutureRelation(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureModel,java.lang.String)
ScriptResult addStrucutureRelation(long,long,java.lang.String,java.lang.String)
*/};

  this.getStructures = function () {/*
ScriptResult getStructures(com.accela.aa.util.QueryFormat,java.lang.String)
ScriptResult getStructures(java.lang.String)
*/};

  this.getAttributes = function () {/*
ScriptResult getAttributes(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult getAttributes(com.accela.aa.structure.structure.StructureModel,java.lang.String)
*/};

  this.updateStructure = function () {/*
ScriptResult updateStructure(com.accela.aa.structure.structure.StructureModel,java.lang.String)
ScriptResult updateStructure(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult updateStructure(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.deleteStructure = function () {/*
ScriptResult deleteStructure(com.accela.aa.structure.structure.StructureModel,java.lang.String)
ScriptResult deleteStructure(long,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.addStrucutureLocation = function () {/*
ScriptResult addStrucutureLocation(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureLocationModel,java.lang.String)
ScriptResult addStrucutureLocation(long,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.deleteStrucutureLocation = function () {/*
ScriptResult deleteStrucutureLocation(com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureLocationModel,java.lang.String)
ScriptResult deleteStrucutureLocation(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getAttribute = function () {/*
ScriptResult getAttribute(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String)
*/};

  this.removeStrucutureRelation = function () {/*
ScriptResult removeStrucutureRelation(long,long,java.lang.String,java.lang.String)
*/};

  this.getParentStructures = function () {/*
ScriptResult getParentStructures(long,java.lang.String,java.lang.String,java.lang.String)
ScriptResult getParentStructures(com.accela.aa.structure.structure.StructureModel,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.addStructure = function () {/*
ScriptResult addStructure(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addStructure(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.util.Date,java.lang.String)
ScriptResult addStructure(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String)
ScriptResult addStructure(com.accela.aa.structure.structure.StructureModel,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.warpCapIdParcelModel2CapParcelModel = function () {/*
ScriptResult warpCapIdParcelModel2CapParcelModel(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.parcel.ParcelModel)
*/};

  this.updateDailyParcelWithAPOAttribute = function () {/*
ScriptResult updateDailyParcelWithAPOAttribute(com.accela.aa.aamain.parcel.CapParcelModel)
*/};

  this.createCapParcelWithAPOAttribute = function () {/*
ScriptResult createCapParcelWithAPOAttribute(com.accela.aa.aamain.parcel.CapParcelModel)
*/};

  this.getParcelListByCollection = function () {/*
ScriptResult getParcelListByCollection(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapTypeModel,com.accela.aa.aamain.people.PersonModel,com.accela.aa.aamain.address.AddressModel,java.util.ArrayList,java.util.Date,java.util.Date,com.accela.aa.util.QueryFormat,com.accela.aa.gis.gis.GISObjectModel[])
*/};

  this.addParceDistrictForDaily = function () {/*
ScriptResult addParceDistrictForDaily(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.addParceDistrictForAdmin = function () {/*
ScriptResult addParceDistrictForAdmin(java.lang.String,java.lang.String)
*/};

  this.getCapParcelModel = function () {/*
ScriptResult getCapParcelModel()
*/};

  this.createCapParcel = function () {/*
ScriptResult createCapParcel(com.accela.aa.aamain.parcel.CapParcelModel)
*/};

  this.getParcelByCapId = function () {/*
ScriptResult getParcelByCapId(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function ParcelScript() {
  this.moveAssociatedObjs2TargetParcel = function () {/*
ScriptResult moveAssociatedObjs2TargetParcel(com.accela.aa.aamain.parcel.ParcelGenealogyModel)
ScriptResult moveAssociatedObjs2TargetParcel(java.lang.String,java.lang.String)
*/};

  this.getPrimaryParcelByRefAddressID = function () {/*
ScriptResult getPrimaryParcelByRefAddressID(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getParcelGenealogy = function () {/*
ScriptResult getParcelGenealogy(java.lang.String,java.lang.String,java.util.Date,java.util.Date)
*/};

  this.getParcelandAttribute = function () {/*
ScriptResult getParcelandAttribute(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.deleteParceDistrictForDaily = function () {/*
ScriptResult deleteParceDistrictForDaily(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.deleteParceDistrictForAdmin = function () {/*
ScriptResult deleteParceDistrictForAdmin(java.lang.String,java.lang.String)
*/};

  this.getParcelDistrictForDaily = function () {/*
ScriptResult getParcelDistrictForDaily(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.copyAssociatedObjs2TargetParcel = function () {/*
ScriptResult copyAssociatedObjs2TargetParcel(java.lang.String,java.lang.String)
ScriptResult copyAssociatedObjs2TargetParcel(com.accela.aa.aamain.parcel.ParcelGenealogyModel)
*/};

  this.getParceListForAdmin = function () {/*
ScriptResult getParceListForAdmin(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getParceDistrictForAdmin = function () {/*
ScriptResult getParceDistrictForAdmin(java.lang.String)
*/};

  this.getParcelListByGisObject = function () {/*
ScriptResult getParcelListByGisObject(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapTypeModel,com.accela.aa.aamain.people.PersonModel,com.accela.aa.aamain.address.AddressModel,java.util.ArrayList,java.util.Date,java.util.Date,com.accela.aa.util.QueryFormat,com.accela.aa.xml.model.gis.GISObjects)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.copyCapParcelModel = function () {/*
ScriptResult copyCapParcelModel(com.accela.aa.aamain.parcel.CapParcelModel,com.accela.aa.aamain.parcel.CapParcelModel)
*/};

  this.getParcelDailyByCapID = function () {/*
ScriptResult getParcelDailyByCapID(java.lang.String,java.lang.String,java.lang.String)
ScriptResult getParcelDailyByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.createWorkOrderAsset = function () {/*
ScriptResult createWorkOrderAsset(com.accela.ams.workorder.WorkOrderAssetModel)
*/};

  this.newAssetScriptModel = function () {/*
ScriptResult newAssetScriptModel()
*/};

  this.editAsset = function () {/*
ScriptResult editAsset(com.accela.ams.asset.AssetDataModel)
*/};

  this.removeWorkOrderAssetByPK = function () {/*
ScriptResult removeWorkOrderAssetByPK(com.accela.ams.workorder.WorkOrderAssetModel)
*/};

  this.getWorkOrderListByAsset = function () {/*
ScriptResult getWorkOrderListByAsset(com.accela.ams.asset.AssetMasterPK,com.accela.aa.util.QueryFormat)
*/};

  this.getAssetDataList = function () {/*
ScriptResult getAssetDataList(com.accela.ams.asset.AssetMasterModel,java.util.Collection,com.accela.aa.util.QueryFormat)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function AssetScript() {
  this.getAssetData = function () {/*
ScriptResult getAssetData(java.lang.String)
*/};

  this.removeAssetData = function () {/*
ScriptResult removeAssetData(com.accela.ams.asset.AssetMasterPK)
*/};

  this.getAssetListByWorkOrder = function () {/*
ScriptResult getAssetListByWorkOrder(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.newWorkOrderAssetScriptModel = function () {/*
ScriptResult newWorkOrderAssetScriptModel()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.cloneAssets = function () {/*
ScriptResult cloneAssets(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createAsset = function () {/*
ScriptResult createAsset(com.accela.ams.asset.AssetDataModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getGISObjectsByFeatures = function () {/*
ScriptResult getGISObjectsByFeatures(java.lang.String)
*/};

  this.getGISType = function () {/*
ScriptResult getGISType(java.lang.String,java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function GISScript() {
  this.getBufferByRadius = function () {/*
ScriptResult getBufferByRadius(GISTypeScriptModel,double,java.lang.String,GISTypeScriptModel)
*/};

  this.getParcelGISObjects = function () {/*
ScriptResult getParcelGISObjects(java.lang.String)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.removeAllCapGISObjects = function () {/*
ScriptResult removeAllCapGISObjects(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCapGISObjects = function () {/*
ScriptResult getCapGISObjects(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getGISObjectDetails = function () {/*
ScriptResult getGISObjectDetails(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getGISObjectAttributes = function () {/*
ScriptResult getGISObjectAttributes(GISTypeScriptModel)
*/};

  this.addCapGISObject = function () {/*
ScriptResult addCapGISObject(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,boolean)
ScriptResult addCapGISObject(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String)
*/};

  curObj = aa.proxyInvoker.newInstance("EMSETextMessageResourcesScript").getOutput();
  for (var i in curObj) {
    //var curObj = aa.proxyInvoker.newInstance(obj[i]).getOutput();
    aa.print(curObj[i]);
  }

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getEventByEventID = function () {/*
ScriptResult getEventByEventID(long,long)
*/};

  this.addInspectorCalendar = function () {/*
ScriptResult addInspectorCalendar(long,long,java.lang.String,java.lang.String)
*/};

  this.scheduleHearing = function () {/*
ScriptResult scheduleHearing(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.getCalendars = function () {/*
ScriptResult getCalendars(java.lang.String,java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.scheduleHearing4V360 = function () {/*
ScriptResult scheduleHearing4V360(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getCalendar = function () {/*
ScriptResult getCalendar(long)
*/};

  this.getAvailableHearing = function () {/*
ScriptResult getAvailableHearing(java.lang.String,double,java.lang.String,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String)
*/};

  this.getAvailableHearingItem = function () {/*
ScriptResult getAvailableHearingItem(java.lang.String,double,java.lang.String,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String)
*/};
}

function CalendarScript() {
  this.deleteInspectorCalendar = function () {/*
ScriptResult deleteInspectorCalendar(long)
*/};

  this.getNextWorkDay = function () {/*
ScriptResult getNextWorkDay()
ScriptResult getNextWorkDay(ScriptDateTime)
*/};

  this.getEventSeriesByCalendarID = function () {/*
ScriptResult getEventSeriesByCalendarID(long,int,int)
*/};

  this.updateEvent = function () {/*
ScriptResult updateEvent(long,long,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getCalendarNames = function () {/*
ScriptResult getCalendarNames()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.addEvent = function () {/*
ScriptResult addEvent(long,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getInspectorCalendars = function () {/*
ScriptResult getInspectorCalendars(long,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.deleteEventByEventID = function () {/*
ScriptResult deleteEventByEventID(long,long)
*/};

  this.addCalendar = function () {/*
ScriptResult addCalendar(long,java.lang.String,com.accela.aa.calendar.calendar.XGStructureCalendarModel,java.lang.String)
ScriptResult addCalendar(java.lang.String,com.accela.aa.calendar.calendar.XGStructureCalendarModel,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function EventLogScript() {
  this.createEventLog = function () {/*
ScriptResult createEventLog(java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String)
ScriptResult createEventLog(java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,long)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.editPaymentUDFAndReceivedType = function () {/*
ScriptResult editPaymentUDFAndReceivedType(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.invoiceAgeing = function () {/*
ScriptResult invoiceAgeing()
*/};

  this.createInvoices = function () {/*
ScriptResult createInvoices(java.lang.String,java.lang.String,java.lang.String,java.lang.String[])
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function CashierScript() {
  this.editInvoice = function () {/*
ScriptResult editInvoice(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.finance.invoice.F4InvoiceModel,ScriptDateTime)
*/};

  this.getTotalFeeAmount = function () {/*
ScriptResult getTotalFeeAmount(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.clrInvoicePrntFlg = function () {/*
ScriptResult clrInvoicePrntFlg()
*/};

  this.getTotalPay = function () {/*
ScriptResult getTotalPay(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getSumNotAllocated = function () {/*
ScriptResult getSumNotAllocated(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.setInvoiceDueDate = function () {/*
ScriptResult setInvoiceDueDate(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.createInvoice = function () {/*
ScriptResult createInvoice(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.getCountOfPermits = function () {/*
ScriptResult getCountOfPermits(long)
*/};

  this.getInvoice = function () {/*
ScriptResult getInvoice(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getCurrentUser = function () {/*
ScriptResult getCurrentUser()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function PersonScript() {
  this.getUser = function () {/*
ScriptResult getUser(java.lang.String,java.lang.String,java.lang.String)
ScriptResult getUser(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult getUser(java.lang.String)
ScriptResult getUser(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getFeeItemInvoiceByCustomizedNbr = function () {/*
ScriptResult getFeeItemInvoiceByCustomizedNbr(java.lang.String)
*/};

  this.getUnpaidInvoices = function () {/*
ScriptResult getUnpaidInvoices()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function InvoiceScript() {
  this.editInvoice = function () {/*
ScriptResult editInvoice(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.finance.invoice.F4InvoiceModel)
*/};

  this.getFeeItemInvoiceByInvoiceNbr = function () {/*
ScriptResult getFeeItemInvoiceByInvoiceNbr(long)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.createInvoiceWithEvent = function () {/*
ScriptResult createInvoiceWithEvent(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.deleteRefActivity = function () {/*
ScriptResult deleteRefActivity(java.lang.String,java.lang.String,java.util.List)
*/};
}

function ActivitySpecInfoScript() {
  this.editRefActivity = function () {/*
ScriptResult editRefActivity(com.accela.aa.aamain.activityspecinfo.RefActivityModel)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.createRefActivity = function () {/*
ScriptResult createRefActivity(com.accela.aa.aamain.activityspecinfo.RefActivityModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.generateFailedTransactionFile = function () {/*
ScriptResult generateFailedTransactionFile()
*/};

  this.setSubject = function () {/*
void setSubject(java.lang.String)
*/};

  this.setMessageResources = function () {/*
void setMessageResources(java.util.Map)
*/};

  this.setWSProjectId = function () {/*
void setWSProjectId(int)
*/};

  this.getTransStartDate = function () {/*
java.util.Date getTransStartDate()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.setTestMode = function () {/*
void setTestMode(boolean)
*/};

  this.setFileNamePrefix = function () {/*
void setFileNamePrefix(java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.setWSUserName = function () {/*
void setWSUserName(java.lang.String)
*/};

  this.setContent = function () {/*
void setContent(java.lang.String)
*/};

  this.setLocalDiskFolder = function () {/*
void setLocalDiskFolder(java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.setSuccessFileFieldValues = function () {/*
void setSuccessFileFieldValues(java.lang.String[])
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.setWSPassword = function () {/*
void setWSPassword(java.lang.String)
*/};
}

function ReconciliationScript() {
  this.notify = function () {/*
void notify()
*/};

  this.setToMailAddress = function () {/*
void setToMailAddress(java.lang.String)
*/};

  this.setSuccessFileFieldTitles = function () {/*
void setSuccessFileFieldTitles(java.lang.String[])
*/};

  this.setUploadToFTP = function () {/*
void setUploadToFTP(boolean)
*/};

  this.setSuccessFileFieldNames = function () {/*
void setSuccessFileFieldNames(java.lang.String[])
*/};

  this.getTransEndDate = function () {/*
java.util.Date getTransEndDate()
*/};

  this.setFtpSite = function () {/*
void setFtpSite(java.lang.String)
*/};

  this.getCustomContentByType = function () {/*
java.lang.String getCustomContentByType(java.lang.String,java.util.Hashtable)
*/};

  this.setFailedFileFieldValues = function () {/*
void setFailedFileFieldValues(java.lang.String[])
*/};

  this.generateApprovedTransactionFile = function () {/*
ScriptResult generateApprovedTransactionFile()
*/};

  this.getCurrentDate = function () {/*
java.lang.String getCurrentDate()
*/};

  this.setFailedFileFieldNames = function () {/*
void setFailedFileFieldNames(java.lang.String[])
*/};

  this.getServiceProviderCode = function () {/*
java.lang.String getServiceProviderCode()
*/};

  this.setProvider = function () {/*
void setProvider(java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.setTransStartDate = function () {/*
void setTransStartDate(java.lang.String)
*/};

  this.setFailedFileFieldTitles = function () {/*
void setFailedFileFieldTitles(java.lang.String[])
*/};

  this.uploadTransactionFile = function () {/*
ScriptResult uploadTransactionFile()
*/};

  this.updateUploadStatusLog = function () {/*
ScriptResult updateUploadStatusLog(java.lang.String)
*/};

  this.setFtpUserName = function () {/*
void setFtpUserName(java.lang.String)
*/};

  this.sendMail = function () {/*
ScriptResult sendMail()
*/};


  this.setWSDateStoreId = function () {/*
void setWSDateStoreId(int)
*/};

  this.setFromMailAddress = function () {/*
void setFromMailAddress(java.lang.String)
*/};

  this.setFtpFolder = function () {/*
void setFtpFolder(java.lang.String)
*/};

  this.setFtpPassword = function () {/*
void setFtpPassword(java.lang.String)
*/};

  this.setTransEndDate = function () {/*
void setTransEndDate(java.lang.String)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.setWSEndPoint = function () {/*
void setWSEndPoint(java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.setCcMailAddress = function () {/*
void setCcMailAddress(java.lang.String)
*/};

  this.setFtpPort = function () {/*
void setFtpPort(java.lang.String)
*/};

  this.recoverTransactionFile = function () {/*
ScriptResult recoverTransactionFile(java.lang.String)
*/};

  this.newStructEstab = function () {/*
ScriptResult newStructEstab(StructureEstablishmentScriptModel)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getStructureEstablishmentModeData = function () {/*
StructureEstablishmentScriptModel getStructureEstablishmentModeData(java.lang.String[])
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getStructEstablList = function () {/*
ScriptResult getStructEstablList(StructureEstablishmentScriptModel)
*/};

  this.getStructEstablByPK = function () {/*
ScriptResult getStructEstablByPK(java.lang.Long,java.lang.Long)
*/};
}

function StructureEstablishmentScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getStructEStablByCapId = function () {/*
ScriptResult getStructEStablByCapId(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.updateStructEstabl = function () {/*
ScriptResult updateStructEstabl(StructureEstablishmentScriptModel)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.disableStructEstabl = function () {/*
ScriptResult disableStructEstabl(java.lang.Long,java.lang.Long,java.lang.String)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.createCondition = function () {/*
ScriptResult createCondition(ConditionScriptModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel[],com.accela.aa.condition.condition.ConditionModel)
*/};

  this.getFields4TemplateForm = function () {/*
ScriptResult getFields4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getNewOwnerConditionScriptModel = function () {/*
ScriptResult getNewOwnerConditionScriptModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function AddressConditionScript() {
  this.createAddressCondition = function () {/*
ScriptResult createAddressCondition(AddressConditionScriptModel)
*/};

  this.addAddressCondition = function () {/*
ScriptResult addAddressCondition(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addAddressCondition(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addAddressCondition(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel)
*/};

  this.createConditionFromStdCondition = function () {/*
ScriptResult createConditionFromStdCondition(ConditionScriptModel,java.lang.String)
ScriptResult createConditionFromStdCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
*/};

  this.getNewConditionScriptModel = function () {/*
ScriptResult getNewConditionScriptModel()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getAssetCondition = function () {/*
ScriptResult getAssetCondition(long,long)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.editField4TemplateForm = function () {/*
ScriptResult editField4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.createConditionWithMulLangs = function () {/*
ScriptResult createConditionWithMulLangs(ConditionScriptModel[],ConditionScriptModel)
*/};

  this.getOwnerCondition = function () {/*
ScriptResult getOwnerCondition(long,long)
*/};

  this.getAddressCondition = function () {/*
ScriptResult getAddressCondition(java.lang.String,long)
*/};

  this.editAddressCondition = function () {/*
ScriptResult editAddressCondition(AddressConditionScriptModel)
*/};

  this.getAddressConditions = function () {/*
ScriptResult getAddressConditions(java.lang.String)
*/};

  this.getNewAssetConditionScriptModel = function () {/*
ScriptResult getNewAssetConditionScriptModel()
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.editTableValue4TemplateTable = function () {/*
ScriptResult editTableValue4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String,java.lang.Long)
*/};

  this.getCondition = function () {/*
ScriptResult getCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
ScriptResult getCondition(ConditionScriptModel,java.lang.String)
*/};

  this.removeAddressCondition = function () {/*
ScriptResult removeAddressCondition(long,long)
*/};

  this.getFields4TemplateTable = function () {/*
ScriptResult getFields4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.createCondition = function () {/*
ScriptResult createCondition(ConditionScriptModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel[],com.accela.aa.condition.condition.ConditionModel)
*/};

  this.getFields4TemplateForm = function () {/*
ScriptResult getFields4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.editParcelCondition = function () {/*
ScriptResult editParcelCondition(ParcelConditionScriptModel)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.addParcelCondition = function () {/*
ScriptResult addParcelCondition(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.Integer)
ScriptResult addParcelCondition(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel)
ScriptResult addParcelCondition(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addParcelCondition(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addParcelCondition(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.Integer)
ScriptResult addParcelCondition(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.Integer)
*/};

  this.createParcelCondition = function () {/*
ScriptResult createParcelCondition(ParcelConditionScriptModel)
*/};

  this.getParcelCondition = function () {/*
ScriptResult getParcelCondition(java.lang.String,long)
*/};

  this.getNewOwnerConditionScriptModel = function () {/*
ScriptResult getNewOwnerConditionScriptModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function ParcelConditionScript() {
  this.createConditionFromStdCondition = function () {/*
ScriptResult createConditionFromStdCondition(ConditionScriptModel,java.lang.String)
ScriptResult createConditionFromStdCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
*/};

  this.getNewConditionScriptModel = function () {/*
ScriptResult getNewConditionScriptModel()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getAssetCondition = function () {/*
ScriptResult getAssetCondition(long,long)
*/};

  this.getParcelConditions = function () {/*
ScriptResult getParcelConditions(java.lang.String,java.lang.String)
ScriptResult getParcelConditions(java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.editField4TemplateForm = function () {/*
ScriptResult editField4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.createConditionWithMulLangs = function () {/*
ScriptResult createConditionWithMulLangs(ConditionScriptModel[],ConditionScriptModel)
*/};

  this.removeParcelCondition = function () {/*
ScriptResult removeParcelCondition(long,java.lang.String)
*/};

  this.getOwnerCondition = function () {/*
ScriptResult getOwnerCondition(long,long)
*/};

  this.getNewAssetConditionScriptModel = function () {/*
ScriptResult getNewAssetConditionScriptModel()
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.editTableValue4TemplateTable = function () {/*
ScriptResult editTableValue4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String,java.lang.Long)
*/};

  this.getCondition = function () {/*
ScriptResult getCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
ScriptResult getCondition(ConditionScriptModel,java.lang.String)
*/};

  this.getFields4TemplateTable = function () {/*
ScriptResult getFields4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  curObj = aa.proxyInvoker.newInstance("SetScript").getOutput();
  for (var i in curObj) {
    //var curObj = aa.proxyInvoker.newInstance(obj[i]).getOutput();
    aa.print(curObj[i]);
  } this.addAttribute = function () {/*
ScriptResult addAttribute(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.AttributeModel)
ScriptResult addAttribute(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.updateAttribute = function () {/*
ScriptResult updateAttribute(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.AttributeModel)
ScriptResult updateAttribute(java.lang.String,com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getCapIDByStructure = function () {/*
ScriptResult getCapIDByStructure(java.lang.String,com.accela.aa.util.QueryFormat)
ScriptResult getCapIDByStructure(com.accela.aa.structure.structure.StructureModel,com.accela.aa.util.QueryFormat)
*/};

  this.getStructure = function () {/*
ScriptResult getStructure(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.removeStructure = function () {/*
ScriptResult removeStructure(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel)
ScriptResult removeStructure(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.deleteAttribute = function () {/*
ScriptResult deleteAttribute(com.accela.aa.aamain.cap.CapIDModel,long,long)
ScriptResult deleteAttribute(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.AttributeModel)
*/};

  this.cloneStructure = function () {/*
ScriptResult cloneStructure(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getChildStructures = function () {/*
ScriptResult getChildStructures(com.accela.aa.aamain.cap.CapIDModel,long)
ScriptResult getChildStructures(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel)
*/};
}

function BStructureScript() {
  this.getCapIDByComponentType = function () {/*
ScriptResult getCapIDByComponentType(java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.addStrucutureRelation = function () {/*
ScriptResult addStrucutureRelation(java.lang.String,com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureModel,java.lang.String)
ScriptResult addStrucutureRelation(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String)
*/};

  this.getStructures = function () {/*
ScriptResult getStructures(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getCapIDByComponentGroup = function () {/*
ScriptResult getCapIDByComponentGroup(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getAttributes = function () {/*
ScriptResult getAttributes(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel,com.accela.aa.util.QueryFormat)
ScriptResult getAttributes(com.accela.aa.aamain.cap.CapIDModel,long,com.accela.aa.util.QueryFormat)
*/};

  this.updateStructure = function () {/*
ScriptResult updateStructure(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime)
ScriptResult updateStructure(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getAttribute = function () {/*
ScriptResult getAttribute(com.accela.aa.aamain.cap.CapIDModel,long,long)
*/};

  this.removeStrucutureRelation = function () {/*
ScriptResult removeStrucutureRelation(java.lang.String,com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String)
ScriptResult removeStrucutureRelation(java.lang.String,com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel,com.accela.aa.structure.structure.StructureModel,java.lang.String)
*/};

  this.getParentStructures = function () {/*
ScriptResult getParentStructures(com.accela.aa.aamain.cap.CapIDModel,long)
ScriptResult getParentStructures(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.addStructure = function () {/*
ScriptResult addStructure(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.structure.structure.StructureModel)
ScriptResult addStructure(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime)
*/};
  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function EPaymentScript() {
  this.getEPaymentValue = function () {/*
ScriptResult getEPaymentValue(java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function AdditionalInfoScript() {
  this.getAppStatusGroupByPK = function () {/*
ScriptResult getAppStatusGroupByPK(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.editAppStatusGroup = function () {/*
ScriptResult editAppStatusGroup(com.accela.aa.aamain.cap.AppStatusGroupModel)
*/};

  this.createAppStatusGroup = function () {/*
ScriptResult createAppStatusGroup(com.accela.aa.aamain.cap.AppStatusGroupModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getCheckboxByPK = function () {/*
ScriptResult getCheckboxByPK(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getAppStatusGroupByGroup = function () {/*
ScriptResult getAppStatusGroupByGroup(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getAppSpecificInfoGroupByCapID = function () {/*
ScriptResult getAppSpecificInfoGroupByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.addNotice = function () {/*
ScriptResult addNotice(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addNotice(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function SmartNoticeScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.parseDate = function () {/*
ScriptResult parseDate(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.sendNewAppointment = function () {/*
ScriptResult sendNewAppointment(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.incrementDateByMinutes = function () {/*
ScriptResult incrementDateByMinutes(java.util.Date,int)
*/};
}

function ExchangeScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.formatDateForExchange = function () {/*
ScriptResult formatDateForExchange(java.util.Date)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.init = function () {/*
ScriptResult init(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.createCondition = function () {/*
ScriptResult createCondition(ConditionScriptModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel[],com.accela.aa.condition.condition.ConditionModel)
*/};

  this.getFields4TemplateForm = function () {/*
ScriptResult getFields4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getNewOwnerConditionScriptModel = function () {/*
ScriptResult getNewOwnerConditionScriptModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function ConditionScript() {
  this.createConditionFromStdCondition = function () {/*
ScriptResult createConditionFromStdCondition(ConditionScriptModel,java.lang.String)
ScriptResult createConditionFromStdCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
*/};

  this.getNewConditionScriptModel = function () {/*
ScriptResult getNewConditionScriptModel()
*/};

  this.getAssetCondition = function () {/*
ScriptResult getAssetCondition(long,long)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.editField4TemplateForm = function () {/*
ScriptResult editField4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.createConditionWithMulLangs = function () {/*
ScriptResult createConditionWithMulLangs(ConditionScriptModel[],ConditionScriptModel)
*/};

  this.getOwnerCondition = function () {/*
ScriptResult getOwnerCondition(long,long)
*/};

  this.getNewAssetConditionScriptModel = function () {/*
ScriptResult getNewAssetConditionScriptModel()
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.editTableValue4TemplateTable = function () {/*
ScriptResult editTableValue4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String,java.lang.Long)
*/};

  this.getCondition = function () {/*
ScriptResult getCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
ScriptResult getCondition(ConditionScriptModel,java.lang.String)
*/};

  this.getFields4TemplateTable = function () {/*
ScriptResult getFields4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.parseStr2Date = function () {/*
ScriptResult parseStr2Date(java.lang.String,java.lang.String)
*/};

  this.editCapWorkDes = function () {/*
ScriptResult editCapWorkDes(com.accela.aa.aamain.cap.CapWorkDesModel)
*/};

  this.createCapWorkDes = function () {/*
ScriptResult createCapWorkDes(com.accela.aa.aamain.cap.CapWorkDesModel)
*/};

  this.copyContact = function () {/*
ScriptResult copyContact(CapScriptModel,CapScriptModel)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.updateProject = function () {/*
ScriptResult updateProject(ProjectScriptModel)
*/};

  this.copyParcel = function () {/*
ScriptResult copyParcel(CapScriptModel,CapScriptModel)
*/};

  this.newCapScriptModel = function () {/*
ScriptResult newCapScriptModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getCapBasicInfo = function () {/*
ScriptResult getCapBasicInfo(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.convertAppSpecificInfoGroups2appSpecificInfos4ACA = function () {/*
ScriptResult convertAppSpecificInfoGroups2appSpecificInfos4ACA(com.accela.aa.aamain.cap.CapModel)
*/};

  this.getCapIDListByCapModel = function () {/*
ScriptResult getCapIDListByCapModel(com.accela.aa.aamain.cap.CapModel)
*/};

  this.runEMSEScriptAfterPaymentReceive = function () {/*
ScriptResult runEMSEScriptAfterPaymentReceive(com.accela.aa.aamain.cap.CapModel,PaymentScriptModel)
*/};

  this.deleteCapComment = function () {/*
ScriptResult deleteCapComment(com.accela.aa.aamain.cap.CapCommentModel)
*/};

  this.getCapPrimaryContact = function () {/*
ScriptResult getCapPrimaryContact(CapIDScriptModel)
*/};

  this.createCapDetail = function () {/*
ScriptResult createCapDetail(com.accela.aa.aamain.cap.CapDetailModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.getCapWorkDesByPK = function () {/*
ScriptResult getCapWorkDesByPK(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCapViewBySingle = function () {/*
com.accela.aa.aamain.cap.CapModel getCapViewBySingle(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getTradeNameByTradeLicense = function () {/*
com.accela.aa.aamain.cap.CapIDModel getTradeNameByTradeLicense(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getByAppType = function () {/*
ScriptResult getByAppType(java.lang.String,java.lang.String,java.lang.String,java.lang.String,int,int)
ScriptResult getByAppType(java.lang.String,java.lang.String)
ScriptResult getByAppType(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getBValuatn4AddtInfo = function () {/*
ScriptResult getBValuatn4AddtInfo(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createCheckbox = function () {/*
ScriptResult createCheckbox(com.accela.aa.aamain.cap.AppSpecificInfoModel)
*/};

  this.getCapIDModel = function () {/*
ScriptResult getCapIDModel(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.editComment = function () {/*
ScriptResult editComment(com.accela.aa.aamain.cap.CommentModel)
*/};

  this.createCap = function () {/*
ScriptResult createCap(java.lang.String,java.lang.String,com.accela.aa.aamain.cap.CapModel,java.lang.StringBuffer,java.lang.String)
*/};

  this.createAppHierarchy = function () {/*
ScriptResult createAppHierarchy(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getPrimaryTrustAccountByCapID = function () {/*
ScriptResult getPrimaryTrustAccountByCapID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getCapIDByIDValue = function () {/*
ScriptResult getCapIDByIDValue(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.createStatusHistory = function () {/*
ScriptResult createStatusHistory(com.accela.aa.aamain.cap.StatusHistoryModel)
*/};

  this.getStatusHistoryByCap = function () {/*
ScriptResult getStatusHistoryByCap(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.requestCreateCap = function () {/*
ScriptResult requestCreateCap(java.lang.String,java.lang.String)
*/};

  this.getProjectChildren = function () {/*
ScriptResult getProjectChildren(com.accela.aa.aamain.cap.CapIDModel,int)
*/};

  this.getFunctionContentByPK = function () {/*
ScriptResult getFunctionContentByPK(com.accela.aa.aamain.cap.UserTempDataModel)
*/};

  this.getStaffByUser = function () {/*
ScriptResult getStaffByUser(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getChildCapByParentCapId = function () {/*
ScriptResult getChildCapByParentCapId(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getRelatedCapTypes = function () {/*
ScriptResult getRelatedCapTypes(com.accela.aa.aamain.cap.CapTypeModel)
*/};

  this.createTemplateAttributes = function () {/*
ScriptResult createTemplateAttributes(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.cap.CapModel)
*/};

  this.getCapScriptModel = function () {/*
ScriptResult getCapScriptModel(com.accela.aa.aamain.cap.CapModel)
*/};

  this.createRenewalRecord = function () {/*
ScriptResult createRenewalRecord(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.updateRenewalCapStatus = function () {/*
ScriptResult updateRenewalCapStatus(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.copyAddress = function () {/*
ScriptResult copyAddress(CapScriptModel,CapScriptModel)
*/};

  this.createComment = function () {/*
ScriptResult createComment(com.accela.aa.aamain.cap.CommentModel)
*/};

  this.createGuideItemComment = function () {/*
ScriptResult createGuideItemComment(com.accela.aa.aamain.cap.CommentModel)
*/};

  this.createPartialRecord = function () {/*
ScriptResult createPartialRecord(com.accela.aa.aamain.cap.CapModel)
*/};

  this.copyRenewCapDocument = function () {/*
ScriptResult copyRenewCapDocument(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.copyOwner = function () {/*
ScriptResult copyOwner(CapScriptModel,CapScriptModel)
*/};

  this.getStandardComment = function () {/*
ScriptResult getStandardComment(com.accela.aa.util.QueryFormat)
*/};

  this.getCapList = function () {/*
ScriptResult getCapList(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getProjectByChildCapID = function () {/*
ScriptResult getProjectByChildCapID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.removeAppHierarchy = function () {/*
ScriptResult removeAppHierarchy(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCapIDsByAPOAttributeDateRange = function () {/*
ScriptResult getCapIDsByAPOAttributeDateRange(java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime)
*/};

  this.combineDateTime = function () {/*
ScriptResult combineDateTime(java.util.Date,java.lang.String)
*/};

  this.updateTotalFees = function () {/*
ScriptResult updateTotalFees(com.accela.aa.aamain.cap.CapIDModel,double)
ScriptResult updateTotalFees(java.lang.String,java.lang.String,java.lang.String,double)
*/};

  this.addProjectChild = function () {/*
ScriptResult addProjectChild(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.parseStr2Double = function () {/*
ScriptResult parseStr2Double(java.lang.String)
*/};

  this.removeComment = function () {/*
ScriptResult removeComment(com.accela.aa.aamain.cap.CommentModel)
*/};

  this.getCapTypeDetailByPK = function () {/*
ScriptResult getCapTypeDetailByPK(com.accela.aa.aamain.cap.CapTypeModel)
*/};

  this.getCapViewBySingle4ACA = function () {/*
com.accela.aa.aamain.cap.CapModel getCapViewBySingle4ACA(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.updateCreatedAccessBy4ACA = function () {/*
ScriptResult updateCreatedAccessBy4ACA(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String)
*/};
}

function CapScript() {
  this.removeCommentByActivity = function () {/*
ScriptResult removeCommentByActivity(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getCAEConditions = function () {/*
ScriptResult getCAEConditions(long,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getAssociatedCapsByOnlineUser = function () {/*
ScriptResult getAssociatedCapsByOnlineUser(java.lang.String)
*/};

  this.editCapDetail = function () {/*
ScriptResult editCapDetail(com.accela.aa.aamain.cap.CapDetailModel)
*/};

  this.getCapListByCollection = function () {/*
ScriptResult getCapListByCollection(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.address.AddressModel,java.lang.String,ScriptDateTime,ScriptDateTime,com.accela.aa.util.QueryFormat,com.accela.aa.xml.model.gis.GISObjects)
ScriptResult getCapListByCollection(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.address.AddressModel,java.lang.String,ScriptDateTime,ScriptDateTime,com.accela.aa.util.QueryFormat,com.accela.aa.gis.gis.GISObjectModel[])
*/};

  this.removeCapWorkDes = function () {/*
ScriptResult removeCapWorkDes(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createAssociatedFormsHierarchy = function () {/*
ScriptResult createAssociatedFormsHierarchy(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getCapIDsByAPOAttribute = function () {/*
ScriptResult getCapIDsByAPOAttribute(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getStaffModel = function () {/*
ScriptResult getStaffModel()
*/};

  this.getCapListByParcelID = function () {/*
ScriptResult getCapListByParcelID(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getCapModel = function () {/*
ScriptResult getCapModel()
*/};

  this.runEMSEScriptBeforeApplicationSubmit = function () {/*
ScriptResult runEMSEScriptBeforeApplicationSubmit(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.copyComments = function () {/*
ScriptResult copyComments(CapScriptModel,CapScriptModel)
*/};

  this.createCommentScriptModel = function () {/*
CommentScriptModel createCommentScriptModel()
*/};

  this.getCapIDByInspGroup = function () {/*
ScriptResult getCapIDByInspGroup(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getCapListByDetailAddress = function () {/*
ScriptResult getCapListByDetailAddress(java.lang.String,java.lang.Integer,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getCapID = function () {/*
ScriptResult getCapID(java.lang.String,java.lang.String,java.lang.String)
ScriptResult getCapID(long)
ScriptResult getCapID(java.lang.String,java.lang.String,java.lang.String,java.lang.String,long)
ScriptResult getCapID(java.lang.String)
*/};

  this.updateAppStatus = function () {/*
ScriptResult updateAppStatus(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
ScriptResult updateAppStatus(com.accela.aa.aamain.cap.StatusHistoryModel,java.lang.String)
*/};

  this.createCapIDScriptModel = function () {/*
CapIDScriptModel createCapIDScriptModel(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getCapComment = function () {/*
ScriptResult getCapComment(com.accela.aa.aamain.cap.CapCommentModel)
*/};

  this.getCapWithTemplateAttributes = function () {/*
ScriptResult getCapWithTemplateAttributes(com.accela.aa.aamain.cap.CapModel)
*/};

  this.runEMSEScriptAfterApplicationSubmit = function () {/*
ScriptResult runEMSEScriptAfterApplicationSubmit(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.editAddtInfo = function () {/*
ScriptResult editAddtInfo(CapDetailScriptModel,BValuatnScriptModel)
*/};

  this.getCapTypeModelByCapID = function () {/*
ScriptResult getCapTypeModelByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCapDetailModel = function () {/*
ScriptResult getCapDetailModel()
*/};

  this.getCapTypeList = function () {/*
ScriptResult getCapTypeList(java.lang.String,com.accela.aa.util.QueryFormat)
ScriptResult getCapTypeList(com.accela.aa.util.QueryFormat)
*/};

  this.getCapsByTaskItem = function () {/*
ScriptResult getCapsByTaskItem(long,int,java.lang.String)
*/};

  this.transferRenewCapDocument = function () {/*
ScriptResult transferRenewCapDocument(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,boolean)
ScriptResult transferRenewCapDocument(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.runEMSEScriptBeforePaymentReceive = function () {/*
ScriptResult runEMSEScriptBeforePaymentReceive(com.accela.aa.aamain.cap.CapModel,PaymentScriptModel)
*/};

  this.isRenewalInProgess = function () {/*
ScriptResult isRenewalInProgess(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.runEMSEScriptBeforeCreateRealCap = function () {/*
ScriptResult runEMSEScriptBeforeCreateRealCap(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCapDetail = function () {/*
ScriptResult getCapDetail(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.editCapByPK = function () {/*
ScriptResult editCapByPK(com.accela.aa.aamain.cap.CapModel)
*/};

  this.removeExpiredIncompleteCAP = function () {/*
ScriptResult removeExpiredIncompleteCAP()
*/};

  this.getCapIDList = function () {/*
ScriptResult getCapIDList()
*/};

  this.getProjectByMasterID = function () {/*
ScriptResult getProjectByMasterID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.updateCapAltID = function () {/*
ScriptResult updateCapAltID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.updateAccessByACA = function () {/*
ScriptResult updateAccessByACA(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getCapTypeFilterName = function () {/*
ScriptResult getCapTypeFilterName(com.accela.aa.aamain.cap.CapTypeModel)
*/};

  this.getCapTypeListByModule = function () {/*
ScriptResult getCapTypeListByModule(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.editCapComment = function () {/*
ScriptResult editCapComment(com.accela.aa.aamain.cap.CapCommentModel)
*/};

  this.createCapComment = function () {/*
ScriptResult createCapComment(com.accela.aa.aamain.cap.CapCommentModel)
*/};

  this.copyCapWorkDesInfo = function () {/*
void copyCapWorkDesInfo(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCapIDsByAppSpecificInfoField = function () {/*
ScriptResult getCapIDsByAppSpecificInfoField(java.lang.String,java.lang.String)
*/};

  this.createRenewalCap = function () {/*
ScriptResult createRenewalCap(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,boolean)
*/};

  this.runEMSEScriptBeforeApplicationDetailUpdate = function () {/*
ScriptResult runEMSEScriptBeforeApplicationDetailUpdate(com.accela.aa.aamain.cap.CapModel)
*/};

  this.getCaps = function () {/*
ScriptResult getCaps(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.batchCreateChildRecords = function () {/*
ScriptResult batchCreateChildRecords(com.accela.aa.aamain.cap.CapIDModel,java.util.List,java.util.List)
*/};

  this.createAmendmentCap = function () {/*
ScriptResult createAmendmentCap(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,boolean)
*/};

  this.getCapIDsByAppSpecificInfoDateRange = function () {/*
ScriptResult getCapIDsByAppSpecificInfoDateRange(java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime)
*/};

  this.removeProjectChild = function () {/*
ScriptResult removeProjectChild(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCapTypeModel = function () {/*
ScriptResult getCapTypeModel()
*/};

  this.getCapWorkDesModel = function () {/*
ScriptResult getCapWorkDesModel()
*/};

  this.getTrustAccountsByCapID = function () {/*
ScriptResult getTrustAccountsByCapID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.updateTotalPayment = function () {/*
ScriptResult updateTotalPayment(java.lang.String,java.lang.String,java.lang.String,double)
*/};

  this.convertAppSpecTableField2Value4ACA = function () {/*
ScriptResult convertAppSpecTableField2Value4ACA(com.accela.aa.aamain.cap.CapModel)
*/};

  this.createAppWithModel = function () {/*
ScriptResult createAppWithModel(CapScriptModel)
*/};

  this.createCapCommentScriptModel = function () {/*
CapCommentScriptModel createCapCommentScriptModel()
*/};

  this.getChildByMasterID = function () {/*
ScriptResult getChildByMasterID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.runEMSEScriptAfterCreateRealCap = function () {/*
ScriptResult runEMSEScriptAfterCreateRealCap(com.accela.aa.aamain.cap.CapModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.copyCapDetailInfo = function () {/*
void copyCapDetailInfo(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getCap = function () {/*
ScriptResult getCap(com.accela.aa.aamain.cap.CapIDModel)
ScriptResult getCap(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getCapViewByID = function () {/*
ScriptResult getCapViewByID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getChildrenCaps = function () {/*
ScriptResult getChildrenCaps(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapTypeModel)
*/};

  this.getProjectTypeList = function () {/*
ScriptResult getProjectTypeList(com.accela.aa.util.QueryFormat)
*/};

  this.createSimplePartialRecord = function () {/*
ScriptResult createSimplePartialRecord(com.accela.aa.aamain.cap.CapTypeModel,java.lang.String,java.lang.String)
*/};

  this.updateAppWithModel = function () {/*
ScriptResult updateAppWithModel(CapScriptModel)
*/};

  this.getGuideItemComment = function () {/*
ScriptResult getGuideItemComment(long)
*/};

  this.transferCapDoc4EMSEPay = function () {/*
ScriptResult transferCapDoc4EMSEPay(com.accela.aa.finance.cashier.onlinePayment.util.ACAModel,com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getProjectParents = function () {/*
ScriptResult getProjectParents(com.accela.aa.aamain.cap.CapIDModel,int)
*/};

  this.createApp = function () {/*
ScriptResult createApp(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getCommentByPK = function () {/*
ScriptResult getCommentByPK(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String)
*/};

  this.getCapByPK = function () {/*
ScriptResult getCapByPK(com.accela.aa.aamain.cap.CapIDModel,boolean)
*/};

  this.runEMSEScriptAfterApplicationDetailUpdate = function () {/*
ScriptResult runEMSEScriptAfterApplicationDetailUpdate(com.accela.aa.aamain.cap.CapModel)
*/};

  this.createRegularCapModel4ACA = function () {/*
ScriptResult createRegularCapModel4ACA(com.accela.aa.aamain.cap.CapModel,java.lang.String,boolean,boolean)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function ProxyInvoker() {
  this.invoke = function () {/*
ScriptResult invoke(java.lang.String,java.lang.String,java.lang.Object[])
ScriptResult invoke(java.lang.Object,java.lang.String,java.lang.Object[])
ScriptResult invoke(java.lang.Object,java.lang.String,java.lang.String[],java.lang.Object[])
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.newInstance = function () {/*
ScriptResult newInstance(java.lang.String)
ScriptResult newInstance(java.lang.String,java.lang.Object[])
ScriptResult newInstance(java.lang.String,java.lang.String[],java.lang.Object[])
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.createCondition = function () {/*
ScriptResult createCondition(ConditionScriptModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel[],com.accela.aa.condition.condition.ConditionModel)
*/};

  this.getFields4TemplateForm = function () {/*
ScriptResult getFields4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.editOwnerCondition = function () {/*
ScriptResult editOwnerCondition(OwnerConditionScriptModel)
*/};

  this.getNewOwnerConditionScriptModel = function () {/*
ScriptResult getNewOwnerConditionScriptModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.removeOwnerCondition = function () {/*
ScriptResult removeOwnerCondition(long,long)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function OwnerConditionScript() {
  this.createConditionFromStdCondition = function () {/*
ScriptResult createConditionFromStdCondition(ConditionScriptModel,java.lang.String)
ScriptResult createConditionFromStdCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
*/};

  this.getNewConditionScriptModel = function () {/*
ScriptResult getNewConditionScriptModel()
*/};

  this.getOwnerConditions = function () {/*
ScriptResult getOwnerConditions(long)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getAssetCondition = function () {/*
ScriptResult getAssetCondition(long,long)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.editField4TemplateForm = function () {/*
ScriptResult editField4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.createConditionWithMulLangs = function () {/*
ScriptResult createConditionWithMulLangs(ConditionScriptModel[],ConditionScriptModel)
*/};

  this.getOwnerCondition = function () {/*
ScriptResult getOwnerCondition(long,long)
*/};

  this.getNewAssetConditionScriptModel = function () {/*
ScriptResult getNewAssetConditionScriptModel()
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.editTableValue4TemplateTable = function () {/*
ScriptResult editTableValue4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String,java.lang.Long)
*/};

  this.createOwnerCondition = function () {/*
ScriptResult createOwnerCondition(OwnerConditionScriptModel)
*/};

  this.getCondition = function () {/*
ScriptResult getCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
ScriptResult getCondition(ConditionScriptModel,java.lang.String)
*/};

  this.getFields4TemplateTable = function () {/*
ScriptResult getFields4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.transferTrustAccount = function () {/*
ScriptResult transferTrustAccount(com.accela.aa.finance.trustAccount.TransactionModel)
*/};

  this.getPrimaryTrustAccountByCAP = function () {/*
ScriptResult getPrimaryTrustAccountByCAP(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createCapIDScriptModel = function () {/*
CapIDScriptModel createCapIDScriptModel()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getTrustAccountPeopleListByAccount = function () {/*
ScriptResult getTrustAccountPeopleListByAccount(java.lang.Long)
ScriptResult getTrustAccountPeopleListByAccount(java.lang.String,java.lang.Long)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getTransactionByPK = function () {/*
ScriptResult getTransactionByPK(java.lang.Long)
ScriptResult getTransactionByPK(java.lang.Long,java.lang.String)
*/};
}

function TrustAccountScript() {
  this.notify = function () {/*
void notify()
*/};

  this.autoCreateTrustAccount = function () {/*
ScriptResult autoCreateTrustAccount(java.lang.String,java.lang.String)
*/};

  this.createTrustAccountScriptModel = function () {/*
TrustAccountScriptModel createTrustAccountScriptModel()
*/};

  this.getTrustAccountByPK = function () {/*
ScriptResult getTrustAccountByPK(java.lang.Long)
ScriptResult getTrustAccountByPK(java.lang.Long,java.lang.String)
*/};

  this.adjustTrustAccount = function () {/*
ScriptResult adjustTrustAccount(com.accela.aa.finance.trustAccount.TransactionModel)
*/};

  this.getTrustAccountList = function () {/*
ScriptResult getTrustAccountList(com.accela.aa.util.QueryFormat)
ScriptResult getTrustAccountList(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getPeopleCountInfoByTrustAccount = function () {/*
ScriptResult getPeopleCountInfoByTrustAccount(java.lang.String,java.lang.Long)
ScriptResult getPeopleCountInfoByTrustAccount(java.lang.Long)
*/};

  this.getTrustAccountIDListByCAPID = function () {/*
ScriptResult getTrustAccountIDListByCAPID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.removeTrustAccountPeople = function () {/*
ScriptResult removeTrustAccountPeople(java.lang.Long,java.lang.String,java.lang.Long)
ScriptResult removeTrustAccountPeople(java.lang.Long,java.lang.String,java.lang.Long,java.lang.Integer,java.lang.String)
ScriptResult removeTrustAccountPeople(java.lang.String,java.lang.Long,java.lang.String,java.lang.Long)
*/};

  this.createTrustAccount = function () {/*
ScriptResult createTrustAccount(com.accela.aa.finance.trustAccount.TrustAccountModel)
*/};

  this.getPrimaryTrustAccountID = function () {/*
ScriptResult getPrimaryTrustAccountID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getTransactionListByCondition = function () {/*
ScriptResult getTransactionListByCondition(com.accela.aa.finance.trustAccount.TransactionModel)
*/};

  this.withdrawTrustAccount = function () {/*
ScriptResult withdrawTrustAccount(com.accela.aa.finance.trustAccount.TransactionModel)
*/};

  this.editTrustAccount = function () {/*
ScriptResult editTrustAccount(com.accela.aa.finance.trustAccount.TrustAccountModel)
*/};

  this.depositTrustAccount = function () {/*
ScriptResult depositTrustAccount(com.accela.aa.finance.trustAccount.TransactionModel)
*/};

  this.createTrustAccountTransactionScriptModel = function () {/*
TrustAccountTransactionScriptModel createTrustAccountTransactionScriptModel()
*/};

  this.createTrustAccountAssociation = function () {/*
ScriptResult createTrustAccountAssociation(com.accela.aa.finance.trustAccount.TrustAccountAssociationModel)
*/};

  this.getTrustAccountListWithNegativeBalance = function () {/*
ScriptResult getTrustAccountListWithNegativeBalance()
ScriptResult getTrustAccountListWithNegativeBalance(java.lang.String)
*/};

  this.getTrustAccountIDListBySetID = function () {/*
ScriptResult getTrustAccountIDListBySetID(java.lang.String,com.accela.aa.util.QueryFormat)
ScriptResult getTrustAccountIDListBySetID(java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat,java.lang.String)
*/};

  this.closeTrustAccountByPK = function () {/*
ScriptResult closeTrustAccountByPK(java.lang.Long)
ScriptResult closeTrustAccountByPK(java.lang.Long,java.lang.String)
*/};

  this.getTrustAccountListByAccountStatus = function () {/*
ScriptResult getTrustAccountListByAccountStatus(java.lang.String,java.lang.String)
ScriptResult getTrustAccountListByAccountStatus(java.lang.String)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.createTrustAccountPeopleScriptModel = function () {/*
TrustAccountPeopleScriptModel createTrustAccountPeopleScriptModel()
*/};

  this.getTrustAccountByAccountID = function () {/*
ScriptResult getTrustAccountByAccountID(java.lang.String,java.lang.String)
ScriptResult getTrustAccountByAccountID(java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getTrustAccountListByCondition = function () {/*
ScriptResult getTrustAccountListByCondition(com.accela.aa.finance.trustAccount.TrustAccountModel,com.accela.aa.finance.trustAccount.TrustAccountPeopleModel,com.accela.aa.aamain.address.RefAddressModel,com.accela.aa.aamain.parcel.ParcelModel)
ScriptResult getTrustAccountListByCondition(com.accela.aa.finance.trustAccount.TrustAccountModel,com.accela.aa.finance.trustAccount.TrustAccountPeopleModel)
*/};

  this.getTransactionListByAccountSeq = function () {/*
ScriptResult getTransactionListByAccountSeq(java.lang.Long)
ScriptResult getTransactionListByAccountSeq(java.lang.Long,java.lang.String)
*/};

  this.getTrustAccountListByCAPID = function () {/*
ScriptResult getTrustAccountListByCAPID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.createTrustAccountPeople = function () {/*
ScriptResult createTrustAccountPeople(com.accela.aa.finance.trustAccount.TrustAccountPeopleModel)
*/};

  this.getNewConditionScriptModel = function () {/*
ScriptResult getNewConditionScriptModel()
*/};

  this.getCapConditionByStdConditionNum = function () {/*
ScriptResult getCapConditionByStdConditionNum(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getFields4TemplateTable = function () {/*
ScriptResult getFields4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.createCapConditionFromStdCondition = function () {/*
ScriptResult createCapConditionFromStdCondition(com.accela.aa.aamain.cap.CapIDModel,RefStdConditionScriptModel)
ScriptResult createCapConditionFromStdCondition(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getCondition = function () {/*
ScriptResult getCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
ScriptResult getCondition(ConditionScriptModel,java.lang.String)
*/};

  this.getCapConditions = function () {/*
ScriptResult getCapConditions(java.lang.String,java.lang.String,java.lang.String)
ScriptResult getCapConditions(com.accela.aa.aamain.cap.CapIDModel)
ScriptResult getCapConditions(java.lang.String)
ScriptResult getCapConditions(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getCapCondition = function () {/*
ScriptResult getCapCondition(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.createCapCondition = function () {/*
ScriptResult createCapCondition(CapConditionScriptModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getStandardConditionsByGroup = function () {/*
ScriptResult getStandardConditionsByGroup(java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getNewAssetConditionScriptModel = function () {/*
ScriptResult getNewAssetConditionScriptModel()
*/};
}

function CapConditionScript() {
  this.editCapCondition = function () {/*
ScriptResult editCapCondition(CapConditionScriptModel)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getStandardConditions = function () {/*
ScriptResult getStandardConditions(java.lang.String,java.lang.String,java.lang.String)
ScriptResult getStandardConditions(java.lang.String,java.lang.String)
*/};

  this.createConditionFromStdCondition = function () {/*
ScriptResult createConditionFromStdCondition(ConditionScriptModel,java.lang.String)
ScriptResult createConditionFromStdCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
*/};

  this.editTableValue4TemplateTable = function () {/*
ScriptResult editTableValue4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String,java.lang.Long)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.deleteCapCondition = function () {/*
ScriptResult deleteCapCondition(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.addCapCondition = function () {/*
ScriptResult addCapCondition(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addCapCondition(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addCapCondition(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,java.lang.String,java.lang.Integer,java.lang.String)
ScriptResult addCapCondition(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addCapCondition(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long)
*/};

  this.createConditionWithMulLangs = function () {/*
ScriptResult createConditionWithMulLangs(ConditionScriptModel[],ConditionScriptModel)
*/};

  this.getNewOwnerConditionScriptModel = function () {/*
ScriptResult getNewOwnerConditionScriptModel()
*/};

  this.getOwnerCondition = function () {/*
ScriptResult getOwnerCondition(long,long)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getFields4TemplateForm = function () {/*
ScriptResult getFields4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.getAssetCondition = function () {/*
ScriptResult getAssetCondition(long,long)
*/};

  this.createCondition = function () {/*
ScriptResult createCondition(ConditionScriptModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel[],com.accela.aa.condition.condition.ConditionModel)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.cloneCapCondition = function () {/*
ScriptResult cloneCapCondition(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.editField4TemplateForm = function () {/*
ScriptResult editField4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String)
*/};

  this.editBatchJobStatus = function () {/*
ScriptResult editBatchJobStatus(java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function BatchJobScript() {
  this.getJobID = function () {/*
ScriptResult getJobID()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.get = function () {/*
ScriptResult get(java.lang.String)
*/};
}

function HttpClientScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initPostParameters = function () {/*
java.util.Map initPostParameters()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.post = function () {/*
ScriptResult post(java.lang.String,java.util.Map)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.setServiceProviderCode = function () {/*
void setServiceProviderCode(java.lang.String)
*/};

  this.getCallerID = function () {/*
java.lang.String getCallerID()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.setValue = function () {/*
void setValue(java.lang.String,com.accela.ams.rating.RatingFormulaFieldModel)
*/};

  this.getValue = function () {/*
com.accela.ams.rating.RatingFormulaFieldModel getValue(java.lang.String)
*/};

  this.setCallerID = function () {/*
void setCallerID(java.lang.String)
*/};

  this.runExpression = function () {/*
java.lang.Double runExpression(java.lang.String,java.util.List)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.setInputParams = function () {/*
void setInputParams(java.util.HashMap)
*/};
}

function RatingFormulaScript() {
  this.setReturnRating = function () {/*
void setReturnRating(java.lang.Double)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getScriptText = function () {/*
java.lang.String getScriptText()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.diffDate = function () {/*
long diffDate(java.lang.String,java.lang.String)
*/};

  this.getServiceProviderCode = function () {/*
java.lang.String getServiceProviderCode()
*/};

  this.addDate = function () {/*
java.lang.String addDate(java.lang.String,long)
*/};

  this.setScriptText = function () {/*
void setScriptText(java.lang.String)
*/};

  { }
  this.createParamList = function () {/*
java.util.List createParamList()
*/};

  this.getReturnRating = function () {/*
java.lang.Double getReturnRating()
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getInputParams = function () {/*
java.util.HashMap getInputParams()
*/};

  this.parseDate = function () {/*
java.util.Date parseDate(java.lang.String)
*/};

  this.getCapOwnerScriptModel = function () {/*
ScriptResult getCapOwnerScriptModel()
*/};

  this.updateDailyOwnerWithAPOAttribute = function () {/*
ScriptResult updateDailyOwnerWithAPOAttribute(CapOwnerScriptModel)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getParcelOwnersByCap = function () {/*
ScriptResult getParcelOwnersByCap(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function OwnerScript() {
  this.getOwnersByParcel = function () {/*
ScriptResult getOwnersByParcel(ParcelScriptModel)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.removeCapOwnerModel = function () {/*
ScriptResult removeCapOwnerModel(CapOwnerScriptModel)
*/};

  this.copyCapOwnerModel = function () {/*
ScriptResult copyCapOwnerModel(CapOwnerScriptModel,CapOwnerScriptModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.createCapOwnerWithAPOAttribute = function () {/*
ScriptResult createCapOwnerWithAPOAttribute(CapOwnerScriptModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getOwnerByCapId = function () {/*
ScriptResult getOwnerByCapId(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getUserRight = function () {/*
ScriptResult getUserRight(java.lang.String,java.lang.String)
*/};

  this.isSupervisor = function () {/*
ScriptResult isSupervisor(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function UserRightScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.updateUserProfileValue = function () {/*
ScriptResult updateUserProfileValue(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getUserProfileValue = function () {/*
ScriptResult getUserProfileValue(java.lang.String,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getCapContactByContactID = function () {/*
ScriptResult getCapContactByContactID(long)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getPeopleAttributeByPeople = function () {/*
ScriptResult getPeopleAttributeByPeople(long,java.lang.String)
*/};

  this.getCapContactByRefPeopleModel = function () {/*
ScriptResult getCapContactByRefPeopleModel(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.people.PeopleModel)
*/};

  this.getPeopleByPhone1 = function () {/*
ScriptResult getPeopleByPhone1(java.lang.String)
*/};

  this.getPeopleByFullName = function () {/*
ScriptResult getPeopleByFullName(java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getSysUserByID = function () {/*
ScriptResult getSysUserByID(java.lang.String)
*/};

  this.getCapContactByPK = function () {/*
ScriptResult getCapContactByPK(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getContactType = function () {/*
ScriptResult getContactType(com.accela.aa.util.QueryFormat)
*/};

  this.deleteUserDiscipline = function () {/*
ScriptResult deleteUserDiscipline(java.lang.String,java.lang.String)
*/};

  this.createPeopleAttributeModel = function () {/*
ScriptResult createPeopleAttributeModel()
*/};

  this.createPeopleModel = function () {/*
ScriptResult createPeopleModel()
*/};

  this.editPeopleWithAttribute = function () {/*
ScriptResult editPeopleWithAttribute(com.accela.aa.aamain.people.PeopleModel,java.util.Collection)
*/};

  this.getUserGroups = function () {/*
ScriptResult getUserGroups()
*/};

  this.autoAssignReviewers = function () {/*
ScriptResult autoAssignReviewers(com.accela.aa.aamain.cap.CapIDModel,java.util.List,int,java.lang.String)
*/};

  this.getPeopleByOthers = function () {/*
ScriptResult getPeopleByOthers(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.newContactByCapContact = function () {/*
ScriptResult newContactByCapContact(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.createPeopleWithAttribute = function () {/*
ScriptResult createPeopleWithAttribute(com.accela.aa.aamain.people.PeopleModel,java.util.Collection)
*/};

  this.getPeopleByBusinessName = function () {/*
ScriptResult getPeopleByBusinessName(java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getDepartmentList = function () {/*
ScriptResult getDepartmentList(java.lang.String)
*/};

  this.editPeople = function () {/*
ScriptResult editPeople(com.accela.aa.aamain.people.PeopleModel)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.editOtherContactsWithCurrentContact = function () {/*
ScriptResult editOtherContactsWithCurrentContact(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.editCapContact = function () {/*
ScriptResult editCapContact(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.createCapContactWithAttribute = function () {/*
ScriptResult createCapContactWithAttribute(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.getPeople = function () {/*
ScriptResult getPeople(long)
*/};

  this.createPeople = function () {/*
ScriptResult createPeople(com.accela.aa.aamain.people.PeopleModel)
*/};

  this.getDisciplines = function () {/*
ScriptResult getDisciplines(java.lang.String)
*/};

  this.getFIDList = function () {/*
ScriptResult getFIDList(java.lang.String,java.lang.String)
*/};

  this.removeCapContact = function () {/*
ScriptResult removeCapContact(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getCapContactByCapID = function () {/*
ScriptResult getCapContactByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getPeopleByAddress = function () {/*
ScriptResult getPeopleByAddress(com.accela.aa.aamain.address.CompactAddressModel)
ScriptResult getPeopleByAddress(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getPeopleByOthersForDaily = function () {/*
ScriptResult getPeopleByOthersForDaily(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getSysUserListByDepartment = function () {/*
ScriptResult getSysUserListByDepartment(com.accela.aa.aamain.organization.DepartmentModel)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.updateUserWorkload = function () {/*
ScriptResult updateUserWorkload(java.lang.String,java.lang.String)
*/};

  this.copyCapContactModel = function () {/*
ScriptResult copyCapContactModel(com.accela.aa.aamain.people.CapContactModel,com.accela.aa.aamain.people.CapContactModel)
*/};

  this.getUserModules = function () {/*
ScriptResult getUserModules(java.lang.String)
*/};

  this.addUserDiscipline = function () {/*
ScriptResult addUserDiscipline(java.lang.String,java.lang.String)
*/};

  this.getContactTypeAll = function () {/*
ScriptResult getContactTypeAll(com.accela.aa.util.QueryFormat)
*/};

  this.removePeople = function () {/*
ScriptResult removePeople(java.lang.String)
ScriptResult removePeople(com.accela.aa.aamain.people.PeopleModel)
*/};

  this.editPeopleAttribute = function () {/*
ScriptResult editPeopleAttribute(com.accela.aa.aamain.people.PeopleAttributeModel)
*/};

  this.getPeopleByPeopleModel = function () {/*
ScriptResult getPeopleByPeopleModel(com.accela.aa.aamain.people.PeopleModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.editContactByCapContact = function () {/*
ScriptResult editContactByCapContact(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.getDepartmentBySeqID = function () {/*
ScriptResult getDepartmentBySeqID(java.lang.String)
*/};

  this.createCapContact = function () {/*
ScriptResult createCapContact(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.getPeopleByFMLName = function () {/*
ScriptResult getPeopleByFMLName(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getSysUserList = function () {/*
ScriptResult getSysUserList(com.accela.aa.util.QueryFormat)
*/};

  this.createPeopleAttribute = function () {/*
ScriptResult createPeopleAttribute(com.accela.aa.aamain.people.PeopleAttributeModel)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.removePeopleWithAttribute = function () {/*
ScriptResult removePeopleWithAttribute(com.accela.aa.aamain.people.PeopleModel)
*/};

  this.getSysUserListByDiscipline = function () {/*
ScriptResult getSysUserListByDiscipline(java.lang.String)
*/};

  this.newContactByCapContacts = function () {/*
ScriptResult newContactByCapContacts(java.util.List)
*/};

  this.editContactByRefContact = function () {/*
ScriptResult editContactByRefContact(com.accela.aa.aamain.people.PeopleModel)
*/};

  this.getCapIDsByRefContact = function () {/*
ScriptResult getCapIDsByRefContact(PeopleScriptModel)
*/};

  this.editContactByCapContacts = function () {/*
ScriptResult editContactByCapContacts(java.util.List)
*/};
}

function PeopleScript() {
  this.editCapContactWithAttribute = function () {/*
ScriptResult editCapContactWithAttribute(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.getSysUserListByDepartmentName = function () {/*
ScriptResult getSysUserListByDepartmentName(java.lang.String)
*/};

  this.getUsersByUserIdAndName = function () {/*
ScriptResult getUsersByUserIdAndName(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.addUserDistrict = function () {/*
ScriptResult addUserDistrict(java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.isExisted = function () {/*
ScriptResult isExisted(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.people.PeopleModel)
*/};

  this.getUserDistricts = function () {/*
ScriptResult getUserDistricts(java.lang.String)
*/};

  this.getPeoplesByAttrs = function () {/*
ScriptResult getPeoplesByAttrs(com.accela.aa.aamain.people.PeopleModel,java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getUserDisciplines = function () {/*
ScriptResult getUserDisciplines(java.lang.String)
*/};

  this.getDistricts = function () {/*
ScriptResult getDistricts(java.lang.String)
*/};

  this.deleteUserDistrict = function () {/*
ScriptResult deleteUserDistrict(java.lang.String,java.lang.String)
*/};

  this.createCapContactWithRefPeopleModel = function () {/*
ScriptResult createCapContactWithRefPeopleModel(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.people.PeopleModel)
*/};

  this.toObjectArray = function () {/*
ScriptResult toObjectArray(java.lang.Object)
*/};

  this.httpPostToSoapWebService = function () {/*
ScriptResult httpPostToSoapWebService(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.parseDate = function () {/*
java.util.Date parseDate(java.lang.String)
*/};

  this.add = function () {/*
double add(double,double)
*/};

  this.getValueFromXML = function () {/*
java.lang.String getValueFromXML(java.lang.String,java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.newQueryFormat = function () {/*
com.accela.aa.util.QueryFormat newQueryFormat()
*/};

  this.getLogger = function () {/*
com.accela.util.AVLogger getLogger()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getCustomContentByType4InspScheAfter = function () {/*
java.lang.String getCustomContentByType4InspScheAfter(java.lang.String,com.accela.aa.inspection.inspection.InspectionModel,com.accela.aa.aamain.cap.CapIDModel,java.util.Hashtable)
*/};

  this.doubleFormat = function () {/*
java.lang.Double doubleFormat(java.lang.Double)
*/};

  this.subtract = function () {/*
double subtract(double,double)
*/};

  this.compare = function () {/*
int compare(double,double)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.newArrayList = function () {/*
java.util.ArrayList newArrayList()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.parseInt = function () {/*
java.lang.Integer parseInt(java.lang.String)
*/};

  this.getDeadlineDay = function () {/*
ScriptResult getDeadlineDay(java.util.Date,java.util.Date,java.lang.String)
*/};
}

function UtilScript() {
  this.notify = function () {/*
void notify()
*/};

  this.getCustomContentByType = function () {/*
java.lang.String getCustomContentByType(java.lang.String,java.util.Hashtable)
*/};

  this.multiply = function () {/*
double multiply(double,double)
*/};

  this.instanceOfString = function () {/*
boolean instanceOfString(java.lang.Object)
*/};

  this.divide = function () {/*
double divide(double,double)
double divide(double,double,int)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.formatFee = function () {/*
java.lang.String formatFee(double)
*/};

  this.getCalendar = function () {/*
java.util.Calendar getCalendar()
*/};

  this.parseLong = function () {/*
java.lang.Long parseLong(java.lang.String)
*/};

  this.dateDiff = function () {/*
java.util.Date dateDiff(java.util.Date,java.lang.String,int)
*/};

  this.newHashtable = function () {/*
java.util.Hashtable newHashtable()
*/};

  this.formatDate = function () {/*
java.lang.String formatDate(java.util.Date,java.lang.String)
*/};

  this.now = function () {/*
java.util.Date now()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.round = function () {/*
double round(double,int)
*/};

  this.httpPost = function () {/*
ScriptResult httpPost(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult httpPost(java.lang.String,java.lang.String)
ScriptResult httpPost(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.newHashMap = function () {/*
java.util.HashMap newHashMap()
*/};

  this.writeToFile = function () {/*
java.io.File writeToFile(java.lang.Object,java.lang.String)
*/};

  this.newStringBuffer = function () {/*
java.lang.StringBuffer newStringBuffer()
*/};

  this.parseDouble = function () {/*
java.lang.Double parseDouble(java.lang.String)
*/};

  this.numberFormat = function () {/*
java.lang.String numberFormat(java.lang.Double)
*/};

  this.deleteFile = function () {/*
void deleteFile(java.lang.String)
*/};

  this.getCustomDescAsSubjectByType = function () {/*
java.lang.String getCustomDescAsSubjectByType(java.lang.String,java.util.Hashtable)
*/};

  this.createRefAppSpecDropDown = function () {/*
ScriptResult createRefAppSpecDropDown(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getByFeeIndicator = function () {/*
ScriptResult getByFeeIndicator(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.addRefASISubgroupsToCAP = function () {/*
ScriptResult addRefASISubgroupsToCAP(java.lang.String,java.lang.String[],com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getByCapID = function () {/*
ScriptResult getByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.editSingleAppSpecific = function () {/*
ScriptResult editSingleAppSpecific(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getCheckboxByCapIDAndGroup = function () {/*
ScriptResult getCheckboxByCapIDAndGroup(com.accela.aa.aamain.cap.CapIDModel,long,int,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getRefAppSpecInfoWithFieldList = function () {/*
ScriptResult getRefAppSpecInfoWithFieldList(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.removeASISubgroupsFromCAP = function () {/*
ScriptResult removeASISubgroupsFromCAP(com.accela.aa.aamain.cap.CapIDModel,java.lang.String[])
*/};

  this.editAppSpecificInfo = function () {/*
ScriptResult editAppSpecificInfo(com.accela.aa.aamain.cap.AppSpecificInfoModel[])
*/};
}

function AppSpecificInfoScript() {
  this.getByList = function () {/*
ScriptResult getByList(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getRefASISubgroups = function () {/*
ScriptResult getRefASISubgroups(java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.copyASISubGroups = function () {/*
ScriptResult copyASISubGroups(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,java.lang.String[])
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.editAppSpecInfos = function () {/*
ScriptResult editAppSpecInfos(com.accela.aa.aamain.cap.AppSpecificInfoModel[])
*/};

  this.getCAPASISubgroups = function () {/*
ScriptResult getCAPASISubgroups(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getAppSpecificInfos = function () {/*
ScriptResult getAppSpecificInfos(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
ScriptResult getAppSpecificInfos(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getAppSpecificInfoByCap = function () {/*
ScriptResult getAppSpecificInfoByCap(com.accela.aa.aamain.cap.CapModel)
*/};

  this.getByType = function () {/*
ScriptResult getByType(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.editAppSpecInfoValue = function () {/*
ScriptResult editAppSpecInfoValue(com.accela.aa.aamain.cap.AppSpecificInfoModel)
*/};

  this.getRefAppSpecDropDownList = function () {/*
ScriptResult getRefAppSpecDropDownList(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getAppSpecificTableGroupModel = function () {/*
ScriptResult getAppSpecificTableGroupModel(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.editAppSpecificTableInfos = function () {/*
ScriptResult editAppSpecificTableInfos(com.accela.aa.aamain.appspectable.AppSpecificTableModel,com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};
}

function AppSpecificTableScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.createCapIDScriptModel = function () {/*
CapIDScriptModel createCapIDScriptModel()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getAppSpecificGroupTableNames = function () {/*
ScriptResult getAppSpecificGroupTableNames(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.removeAppSpecificTableInfos = function () {/*
ScriptResult removeAppSpecificTableInfos(java.lang.String,com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getAppSpecificTableModel = function () {/*
ScriptResult getAppSpecificTableModel(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
ScriptResult getAppSpecificTableModel(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.createTemplateRow = function () {/*
com.accela.aa.template.subgroup.TemplateRow createTemplateRow(java.lang.Long,java.util.List)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function GenericTemplateScript() {
  this.getTemplate = function () {/*
ScriptResult getTemplate(com.accela.aa.template.entity.EntityPKModel)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getTemplateStructureByGroupName = function () {/*
ScriptResult getTemplateStructureByGroupName(java.lang.String)
*/};

  this.createGenericTemplateTableValue = function () {/*
com.accela.aa.template.field.GenericTemplateTableValue createGenericTemplateTableValue(java.lang.Long,com.accela.aa.template.field.GenericTemplateAttribute,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getReportModelByName = function () {/*
ScriptResult getReportModelByName(java.lang.String)
*/};

  this.getReportDetailModel = function () {/*
ScriptResult getReportDetailModel()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getReportScriptModel = function () {/*
ScriptResult getReportScriptModel(com.accela.v360.reports.ReportDetailModel)
*/};

  this.storeReportToDisk = function () {/*
ScriptResult storeReportToDisk(ReportResultScriptModel)
*/};

  this.getReportInfoModelByName = function () {/*
ScriptResult getReportInfoModelByName(java.lang.String)
*/};

  this.sendReportInEmail = function () {/*
ScriptResult sendReportInEmail(ReportInfoScriptModel,ReportResultScriptModel)
*/};

  this.runReport = function () {/*
ScriptResult runReport(java.util.HashMap,ReportScriptModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function RunReportScript() {
  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.hasPermission = function () {/*
ScriptResult hasPermission(java.lang.String,java.lang.String)
*/};

  this.getReportResult = function () {/*
ScriptResult getReportResult(ReportInfoScriptModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.isAboutToExpireStatus = function () {/*
ScriptResult isAboutToExpireStatus(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.sendAutoIssueLicenseEmail = function () {/*
ScriptResult sendAutoIssueLicenseEmail(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getLicensesByStatus = function () {/*
ScriptResult getLicensesByStatus(java.lang.String)
*/};

  this.getLicensesByCapID = function () {/*
ScriptResult getLicensesByCapID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
ScriptResult getLicensesByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.sendDeniedNoticeEmailToCitizenUser = function () {/*
ScriptResult sendDeniedNoticeEmailToCitizenUser(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.isExpiredLicenses = function () {/*
ScriptResult isExpiredLicenses(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function ExpirationScript() {
  this.activeLicensesByCapID = function () {/*
ScriptResult activeLicensesByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.sendNoAutoIssueLicenseEmail = function () {/*
ScriptResult sendNoAutoIssueLicenseEmail(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.editB1Expiration = function () {/*
ScriptResult editB1Expiration(com.accela.aa.license.expiration.B1ExpirationModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.sendApprovedNoticEmailToCitizenUser = function () {/*
ScriptResult sendApprovedNoticEmailToCitizenUser(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getLicensesByDate = function () {/*
ScriptResult getLicensesByDate(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};
}

function TaskSpecificInfoScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getTaskSpecificInfoScriptModel = function () {/*
ScriptResult getTaskSpecificInfoScriptModel()
*/};

  this.editTaskSpecInfos = function () {/*
ScriptResult editTaskSpecInfos(com.accela.aa.aamain.cap.TaskSpecificInfoModel[])
*/};

  this.getTaskSpecificInfoByTask = function () {/*
ScriptResult getTaskSpecificInfoByTask(com.accela.aa.aamain.cap.CapIDModel,long,int)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getTaskSpecifiInfoByDesc = function () {/*
ScriptResult getTaskSpecifiInfoByDesc(com.accela.aa.aamain.cap.CapIDModel,long,int,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.get = function () {/*
ScriptResult get(java.lang.String,java.lang.String)
*/};
}

function OAuthClientScript() {
  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initPostParameters = function () {/*
java.util.Map initPostParameters()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.post = function () {/*
ScriptResult post(java.lang.String,java.lang.String,java.util.Map)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.getConfiguration = function () {/*
java.util.Map getConfiguration(java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getFeeItemByPK = function () {/*
ScriptResult getFeeItemByPK(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getRefFeeItemByFeeCodeVersion = function () {/*
ScriptResult getRefFeeItemByFeeCodeVersion(java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime)
*/};

  this.getRefFeeItemByFeeCode = function () {/*
ScriptResult getRefFeeItemByFeeCode(java.lang.String,java.lang.String,java.lang.String,ScriptDateTime)
*/};

  this.createF4FeeItemScriptModel = function () {/*
F4FeeItemScriptModel createF4FeeItemScriptModel()
*/};

  this.editFeeNotes = function () {/*
ScriptResult editFeeNotes(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,long)
*/};

  this.addFeeItem = function () {/*
ScriptResult addFeeItem(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,double,java.lang.String,double,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addFeeItem(java.util.Collection)
ScriptResult addFeeItem(FeeItemScriptModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function FeeScript() {
  this.getFeeItems = function () {/*
ScriptResult getFeeItems(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getScriptF4FeeItemModel = function () {/*
ScriptResult getScriptF4FeeItemModel(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,double,java.lang.String,double,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getRefFeeScheduleVersionsByDate = function () {/*
ScriptResult getRefFeeScheduleVersionsByDate(java.lang.String,ScriptDateTime)
*/};

  this.isFullPaid4Renewal = function () {/*
ScriptResult isFullPaid4Renewal(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getFeeItemOfInvoicedByCapID = function () {/*
ScriptResult getFeeItemOfInvoicedByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getFeeTotal = function () {/*
ScriptResult getFeeTotal(com.accela.aa.aamain.cap.CapIDModel)
ScriptResult getFeeTotal(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.createCondition = function () {/*
ScriptResult createCondition(ConditionScriptModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel)
ScriptResult createCondition(com.accela.aa.condition.condition.ConditionModel[],com.accela.aa.condition.condition.ConditionModel)
*/};

  this.getFields4TemplateForm = function () {/*
ScriptResult getFields4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.createCAECondition = function () {/*
ScriptResult createCAECondition(CAEConditionScriptModel)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getCAEConditions = function () {/*
ScriptResult getCAEConditions(long)
*/};

  this.getNewOwnerConditionScriptModel = function () {/*
ScriptResult getNewOwnerConditionScriptModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getCAECondition = function () {/*
ScriptResult getCAECondition(long,long)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function CAEConditionScript() {
  this.createConditionFromStdCondition = function () {/*
ScriptResult createConditionFromStdCondition(ConditionScriptModel,java.lang.String)
ScriptResult createConditionFromStdCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
*/};

  this.getNewConditionScriptModel = function () {/*
ScriptResult getNewConditionScriptModel()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getAssetCondition = function () {/*
ScriptResult getAssetCondition(long,long)
*/};

  this.editCAECondition = function () {/*
ScriptResult editCAECondition(CAEConditionScriptModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.editField4TemplateForm = function () {/*
ScriptResult editField4TemplateForm(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.createConditionWithMulLangs = function () {/*
ScriptResult createConditionWithMulLangs(ConditionScriptModel[],ConditionScriptModel)
*/};

  this.getOwnerCondition = function () {/*
ScriptResult getOwnerCondition(long,long)
*/};

  this.addCAECondition = function () {/*
ScriptResult addCAECondition(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel)
ScriptResult addCAECondition(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult addCAECondition(long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,ScriptDateTime,ScriptDateTime,com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.people.SysUserModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.removeCAECondition = function () {/*
ScriptResult removeCAECondition(long,long)
*/};

  this.getNewAssetConditionScriptModel = function () {/*
ScriptResult getNewAssetConditionScriptModel()
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.editTableValue4TemplateTable = function () {/*
ScriptResult editTableValue4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK,java.lang.String,java.lang.Long)
*/};

  this.getCondition = function () {/*
ScriptResult getCondition(com.accela.aa.condition.condition.ConditionModel,java.lang.String)
ScriptResult getCondition(ConditionScriptModel,java.lang.String)
*/};

  this.getFields4TemplateTable = function () {/*
ScriptResult getFields4TemplateTable(com.accela.aa.template.entity.EntityPKModel,com.accela.aa.template.field.GenericTemplateFieldPK)
*/};

  this.getContrLicListByUserSeqNBR = function () {/*
ScriptResult getContrLicListByUserSeqNBR(java.lang.Long)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.sendApprovNoticeEmailToUser = function () {/*
ScriptResult sendApprovNoticeEmailToUser(java.lang.String,java.lang.String,java.lang.String)
*/};
}

function ContractorLicenseScript() {
  this.issueContrLicWithExpired = function () {/*
ScriptResult issueContrLicWithExpired(java.lang.Long,com.accela.aa.aamain.people.LicenseModel,boolean,boolean)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.sendNoticeEmailToRelatedAccounts = function () {/*
ScriptResult sendNoticeEmailToRelatedAccounts(java.lang.Long,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getContrLicenseByLicSeqNBR = function () {/*
ScriptResult getContrLicenseByLicSeqNBR(java.lang.Long,java.lang.Long)
ScriptResult getContrLicenseByLicSeqNBR(java.lang.String,java.lang.Long)
*/};

  this.updateContractorLicense = function () {/*
ScriptResult updateContractorLicense(com.accela.pa.people.license.ContractorLicenseModel)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.notify = function () {/*
void notify()
*/};

  this.sendIssueNoticeEmail = function () {/*
ScriptResult sendIssueNoticeEmail(java.lang.Long,java.lang.String,java.lang.String)
*/};

  this.getTimeLogModel = function () {/*
ScriptResult getTimeLogModel(long)
ScriptResult getTimeLogModel()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getTimeTypeByTimeTypeName = function () {/*
ScriptResult getTimeTypeByTimeTypeName(java.lang.String)
*/};

  this.getTimeGroupTypeModel = function () {/*
ScriptResult getTimeGroupTypeModel()
*/};

  this.getTimeGroupTypeModels = function () {/*
ScriptResult getTimeGroupTypeModels(java.lang.String,java.lang.String)
ScriptResult getTimeGroupTypeModels(TimeGroupTypeScriptModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.notify = function () {/*
void notify()
*/};
}

function TimeAccountingScript() {
  this.getTimeLogModelByEntity = function () {/*
ScriptResult getTimeLogModelByEntity(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.Long,java.lang.Long)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getTimeGroupByTimeGroupName = function () {/*
ScriptResult getTimeGroupByTimeGroupName(java.lang.String)
*/};

  this.addTimeLogModel = function () {/*
ScriptResult addTimeLogModel(TimeAccountingScriptModel)
*/};

  this.updateTimeLogModel = function () {/*
ScriptResult updateTimeLogModel(TimeAccountingScriptModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.createPublicUser = function () {/*
ScriptResult createPublicUser(com.accela.v360.publicuser.PublicUserModel,com.accela.aa.aamain.people.LicenseModel[])
ScriptResult createPublicUser(com.accela.v360.publicuser.PublicUserModel)
*/};

  this.resetPassword = function () {/*
ScriptResult resetPassword(java.lang.String)
*/};

  this.getPublicUserListByLicenseSeqNBR = function () {/*
ScriptResult getPublicUserListByLicenseSeqNBR(java.lang.Long)
*/};

  this.getOrganizatonOwner = function () {/*
ScriptResult getOrganizatonOwner(com.accela.aa.aamain.organization.DepartmentModel)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.removePublicUserInfoFromAgency = function () {/*
ScriptResult removePublicUserInfoFromAgency(com.accela.v360.publicuser.PublicUserModel)
*/};

  this.checkPublicUserAccountInAgency = function () {/*
ScriptResult checkPublicUserAccountInAgency(com.accela.v360.publicuser.PublicUserModel)
*/};

  this.getPublicUser = function () {/*
ScriptResult getPublicUser(java.lang.Long)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getPublicUserListByContactNBR = function () {/*
ScriptResult getPublicUserListByContactNBR(java.lang.Long)
*/};

  this.getLicenseModel = function () {/*
com.accela.aa.aamain.people.LicenseModel getLicenseModel()
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.purgExpiredInactiveAccount = function () {/*
ScriptResult purgExpiredInactiveAccount()
*/};
}

function PublicUserScript() {
  this.notify = function () {/*
void notify()
*/};

  this.getPublicUserListByOwnerNBR = function () {/*
ScriptResult getPublicUserListByOwnerNBR(java.lang.String)
*/};

  this.getPublicUserBySearchKeys = function () {/*
ScriptResult getPublicUserBySearchKeys(com.accela.v360.publicuser.PublicUserModel,boolean)
*/};

  this.getDepartmentModel = function () {/*
com.accela.aa.aamain.organization.DepartmentModel getDepartmentModel()
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.isRegisterred = function () {/*
ScriptResult isRegisterred(java.lang.Long)
*/};

  this.disablePublicUserAccount = function () {/*
ScriptResult disablePublicUserAccount(com.accela.v360.publicuser.PublicUserModel,boolean)
*/};

  this.getPublicUserByEmail = function () {/*
ScriptResult getPublicUserByEmail(java.lang.String)
*/};

  this.updateEmail4PublicUser = function () {/*
ScriptResult updateEmail4PublicUser(com.accela.v360.publicuser.PublicUserModel,java.lang.String)
*/};

  this.getNewPublicUserUUID = function () {/*
java.lang.String getNewPublicUserUUID()
*/};

  this.createPublicUserForAgency = function () {/*
ScriptResult createPublicUserForAgency(com.accela.v360.publicuser.PublicUserModel)
*/};

  this.getPublicUserByUserId = function () {/*
ScriptResult getPublicUserByUserId(java.lang.String)
*/};

  this.signon = function () {/*
ScriptResult signon(java.lang.String,java.lang.String)
*/};

  this.activatePublicUser = function () {/*
ScriptResult activatePublicUser(java.lang.String)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.sendActivateEmail = function () {/*
ScriptResult sendActivateEmail(com.accela.v360.publicuser.PublicUserModel,boolean,boolean)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.sendPasswordEmail = function () {/*
ScriptResult sendPasswordEmail(com.accela.v360.publicuser.PublicUserModel)
*/};

  this.sendHyperlinkActivateEmail = function () {/*
ScriptResult sendHyperlinkActivateEmail(com.accela.v360.publicuser.PublicUserModel)
*/};

  this.getPublicUserByPUser = function () {/*
ScriptResult getPublicUserByPUser(java.lang.String)
*/};

  this.isExistingEmailID = function () {/*
ScriptResult isExistingEmailID(java.lang.String)
*/};

  this.getPublicUserModel = function () {/*
com.accela.v360.publicuser.PublicUserModel getPublicUserModel()
*/};

  this.editPublicUser = function () {/*
ScriptResult editPublicUser(com.accela.v360.publicuser.PublicUserModel)
*/};

  this.isExistingUser = function () {/*
ScriptResult isExistingUser(java.lang.String)
*/};

  this.insertTaskWithResourceData = function () {/*
ScriptResult insertTaskWithResourceData(TaskItemScriptModel,java.lang.String)
*/};

  this.assignTask = function () {/*
ScriptResult assignTask(com.accela.aa.workflow.workflow.TaskItemModel)
*/};

  this.rebillList = function () {/*
ScriptResult rebillList(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.getProcessRelationByPK = function () {/*
ScriptResult getProcessRelationByPK(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String)
*/};

  this.getTaskItemByTaskDes = function () {/*
ScriptResult getTaskItemByTaskDes(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,long)
*/};

  this.editTaskStatus = function () {/*
ScriptResult editTaskStatus(TaskStatusScriptModel)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getTaskItemScriptModel = function () {/*
ScriptResult getTaskItemScriptModel()
*/};

  this.getTaskItemForTaskAssign = function () {/*
ScriptResult getTaskItemForTaskAssign(com.accela.aa.aamain.people.SysUserModel,com.accela.aa.aamain.organization.DepartmentModel,ScriptDateTime,ScriptDateTime)
*/};

  this.clearPrintFlag = function () {/*
ScriptResult clearPrintFlag(java.lang.String)
*/};

  this.WorkflowBean = function () {/*
ScriptResult WorkflowBean(java.lang.String,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getAdHocTask = function () {/*
ScriptResult getAdHocTask(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.editTask = function () {/*
ScriptResult editTask(com.accela.aa.workflow.workflow.TaskItemModel,java.lang.String)
ScriptResult editTask(TaskItemScriptModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.adjustTaskWithNoAudit = function () {/*
ScriptResult adjustTaskWithNoAudit(com.accela.aa.workflow.workflow.TaskItemModel)
*/};

  this.getTaskItemWorkflowByCapID = function () {/*
ScriptResult getTaskItemWorkflowByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getProcessNoteScriptModel = function () {/*
ScriptResult getProcessNoteScriptModel()
*/};

  this.getTask = function () {/*
ScriptResult getTask(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
ScriptResult getTask(com.accela.aa.aamain.cap.CapIDModel,int)
ScriptResult getTask(com.accela.aa.aamain.cap.CapIDModel,int,long)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.handleBDisposition = function () {/*
ScriptResult handleBDisposition(com.accela.aa.aamain.cap.CapIDModel,int,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
ScriptResult handleBDisposition(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
*/};

  this.createTaskStatus = function () {/*
ScriptResult createTaskStatus(TaskStatusScriptModel)
*/};
}

function WorkflowScript() {
  this.notify = function () {/*
void notify()
*/};

  this.getTasksDescStatus = function () {/*
ScriptResult getTasksDescStatus(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.copyTask = function () {/*
ScriptResult copyTask(TaskItemScriptModel,TaskItemScriptModel,java.lang.String)
*/};

  this.getMessageForWorkflowTaskUpdated = function () {/*
ScriptResult getMessageForWorkflowTaskUpdated(TaskItemScriptModel)
*/};

  this.createTaskStatusWithResourceData = function () {/*
ScriptResult createTaskStatusWithResourceData(TaskStatusScriptModel)
*/};

  this.getLayedTaskName = function () {/*
ScriptResult getLayedTaskName(com.accela.aa.workflow.workflow.TaskItemModel)
*/};

  this.removeTask = function () {/*
ScriptResult removeTask(TaskItemScriptModel)
*/};

  this.getProcess = function () {/*
ScriptResult getProcess(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getTaskStatus = function () {/*
ScriptResult getTaskStatus(TaskItemScriptModel,java.lang.String)
*/};

  this.handleDispositionWithFlag = function () {/*
ScriptResult handleDispositionWithFlag(com.accela.aa.aamain.cap.CapIDModel,int,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
ScriptResult handleDispositionWithFlag(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
*/};

  this.findByRebillList = function () {/*
ScriptResult findByRebillList(java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime)
*/};

  this.findByDescStatus = function () {/*
ScriptResult findByDescStatus(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.deleteAndAssignWorkflow = function () {/*
ScriptResult deleteAndAssignWorkflow(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,boolean)
*/};

  this.handleUDisposition = function () {/*
ScriptResult handleUDisposition(com.accela.aa.aamain.cap.CapIDModel,int,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
ScriptResult handleUDisposition(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
*/};

  this.issuePermit = function () {/*
ScriptResult issuePermit(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.createCapWorkflow = function () {/*
ScriptResult createCapWorkflow(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.adjustTask = function () {/*
ScriptResult adjustTask(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String)
ScriptResult adjustTask(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime)
ScriptResult adjustTask(com.accela.aa.aamain.cap.CapIDModel,int,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime)
ScriptResult adjustTask(com.accela.aa.workflow.workflow.TaskItemModel)
ScriptResult adjustTask(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getTaskItemRebillByTaskDescription = function () {/*
ScriptResult getTaskItemRebillByTaskDescription(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.insertSubProcess = function () {/*
ScriptResult insertSubProcess(TaskItemScriptModel,java.lang.String,boolean)
*/};

  this.getTasks = function () {/*
ScriptResult getTasks(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
ScriptResult getTasks(com.accela.aa.aamain.cap.CapIDModel,long)
ScriptResult getTasks(com.accela.aa.aamain.cap.CapIDModel)
ScriptResult getTasks(java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime)
ScriptResult getTasks(java.lang.String,java.lang.String)
*/};

  this.insertTask = function () {/*
ScriptResult insertTask(TaskItemScriptModel,java.lang.String)
*/};

  this.handleLDisposition = function () {/*
ScriptResult handleLDisposition(com.accela.aa.aamain.cap.CapIDModel,int,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
ScriptResult handleLDisposition(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
*/};

  this.handleYDisposition = function () {/*
ScriptResult handleYDisposition(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
ScriptResult handleYDisposition(com.accela.aa.aamain.cap.CapIDModel,int,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel)
*/};

  this.getHistory = function () {/*
ScriptResult getHistory(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getTaskItemByCapID = function () {/*
ScriptResult getTaskItemByCapID(java.lang.String,java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
ScriptResult getTaskItemByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getWorkflowHistory = function () {/*
ScriptResult getWorkflowHistory(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
ScriptResult getWorkflowHistory(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getMasterProcess = function () {/*
ScriptResult getMasterProcess(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getTaskItems = function () {/*
ScriptResult getTaskItems(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.handleDisposition = function () {/*
ScriptResult handleDisposition(com.accela.aa.aamain.cap.CapIDModel,int,long,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel,java.lang.String)
ScriptResult handleDisposition(com.accela.aa.aamain.cap.CapIDModel,int,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,com.accela.aa.aamain.people.SysUserModel,java.lang.String)
ScriptResult handleDisposition(com.accela.aa.workflow.workflow.TaskItemModel,com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.handleTimeTracking = function () {/*
ScriptResult handleTimeTracking()
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getTaskStatusList = function () {/*
ScriptResult getTaskStatusList(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.sendEmailForWorkflowTaskUpdated = function () {/*
ScriptResult sendEmailForWorkflowTaskUpdated(TaskItemScriptModel,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.removeSubProcess = function () {/*
ScriptResult removeSubProcess(TaskItemScriptModel)
*/};

  this.getCapTypeScriptModel = function () {/*
ScriptResult getCapTypeScriptModel()
*/};

  this.getProcessNoteScriptModelByTaskItem = function () {/*
ScriptResult getProcessNoteScriptModelByTaskItem(TaskItemScriptModel)
*/};

  this.getProcessRelationByCapID = function () {/*
ScriptResult getProcessRelationByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getCapIdsByCriteria = function () {/*
ScriptResult getCapIdsByCriteria(TaskItemScriptModel,ScriptDateTime,ScriptDateTime,CapTypeScriptModel,java.lang.String[])
*/};

  this.getTaskAuditByTime = function () {/*
ScriptResult getTaskAuditByTime(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String)
*/};

  this.getTotalSetFeeInvoiceAmount = function () {/*
ScriptResult getTotalSetFeeInvoiceAmount(java.lang.String)
*/};

  this.getFeeTotal = function () {/*
ScriptResult getFeeTotal(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.applyPayment = function () {/*
ScriptResult applyPayment(com.accela.aa.aamain.cap.CapIDModel,long,double,long[],long[],double[],ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult applyPayment(com.accela.aa.aamain.cap.CapIDModel,PaymentScriptModel,long[],long[],double[],java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getReceiptByPK = function () {/*
ScriptResult getReceiptByPK(long)
*/};

  this.editInvoice = function () {/*
ScriptResult editInvoice(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,ScriptDateTime,double,double,ScriptDateTime,ScriptDateTime,java.lang.String,long,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,ScriptDateTime,java.lang.String)
*/};

  this.createFundTransferAudit = function () {/*
ScriptResult createFundTransferAudit(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,long,long,ScriptDateTime,double,double,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,long,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult createFundTransferAudit(com.accela.aa.finance.cashierAudit.AccountingAuditTrailModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getPaymentFeeItems = function () {/*
ScriptResult getPaymentFeeItems(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getCashierAuditListByTranSeqNbr = function () {/*
ScriptResult getCashierAuditListByTranSeqNbr(long,com.accela.aa.util.QueryFormat)
*/};

  this.getBValuatnByPeriod = function () {/*
ScriptResult getBValuatnByPeriod(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getValuationCalcMultiplier = function () {/*
ScriptResult getValuationCalcMultiplier(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.editBCalcValuatn = function () {/*
ScriptResult editBCalcValuatn(BCalcValuatnScriptModel)
*/};

  this.getCalculatedValuation = function () {/*
ScriptResult getCalculatedValuation(com.accela.aa.aamain.cap.CapIDModel)
ScriptResult getCalculatedValuation(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.editBValuatnFlag = function () {/*
ScriptResult editBValuatnFlag(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.createInvoicingAudit = function () {/*
ScriptResult createInvoicingAudit(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,long,long,ScriptDateTime,double,double,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,long,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String)
ScriptResult createInvoicingAudit(com.accela.aa.finance.cashierAudit.AccountingAuditTrailModel)
*/};

  this.getFeeItemByPosTransaction = function () {/*
ScriptResult getFeeItemByPosTransaction(com.accela.aa.aamain.cap.CapIDModel,java.lang.Long)
*/};

  this.getOnLinePaymentByDate = function () {/*
ScriptResult getOnLinePaymentByDate(java.util.Date,java.util.Date,com.accela.aa.util.QueryFormat)
*/};

  this.prepareTransaction4ACA = function () {/*
ScriptResult prepareTransaction4ACA(com.accela.aa.aamain.cap.CapIDModel,boolean)
*/};

  this.createFeeAudit = function () {/*
ScriptResult createFeeAudit(java.lang.String,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,double,java.lang.String,double,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult createFeeAudit(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,double,java.lang.String,double,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult createFeeAudit(com.accela.aa.finance.fee.F4FeeItemAuditTrailModel)
*/};

  this.editFeeItemUnit = function () {/*
ScriptResult editFeeItemUnit(com.accela.aa.aamain.cap.CapIDModel,double,long)
*/};

  this.applyRefund = function () {/*
ScriptResult applyRefund(com.accela.aa.aamain.cap.CapIDModel,long[],long[],double[],ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult applyRefund(com.accela.aa.aamain.cap.CapIDModel,PaymentScriptModel,long[],long[],double[],java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getValidFeeItemInvoiceByFeeNbr = function () {/*
ScriptResult getValidFeeItemInvoiceByFeeNbr(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getTotalPaidFeeItem = function () {/*
ScriptResult getTotalPaidFeeItem(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.createETransaction = function () {/*
ScriptResult createETransaction(com.accela.aa.finance.cashier.onlinePayment.TransactionModel)
*/};

  this.editFeeitemInvoiceStatus = function () {/*
ScriptResult editFeeitemInvoiceStatus(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String)
*/};

  this.getFeeUnitByFeeCode = function () {/*
ScriptResult getFeeUnitByFeeCode(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,ScriptDateTime)
*/};

  this.getRefFeeItemByFeeCodeVersion = function () {/*
ScriptResult getRefFeeItemByFeeCodeVersion(java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime)
*/};

  this.getPaymentAmount4ACA = function () {/*
ScriptResult getPaymentAmount4ACA(com.accela.aa.aamain.cap.CapIDModel,boolean)
*/};

  this.getTotalSetFeeInvoiceAmountExceptVoid = function () {/*
ScriptResult getTotalSetFeeInvoiceAmountExceptVoid(java.lang.String)
*/};

  this.getTotalSetFeeAssessAmount = function () {/*
ScriptResult getTotalSetFeeAssessAmount(java.lang.String)
*/};

  this.editFeeItemFlag = function () {/*
ScriptResult editFeeItemFlag(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String)
*/};

  this.getRefFeeItemByFeeCode = function () {/*
ScriptResult getRefFeeItemByFeeCode(java.lang.String,java.lang.String,java.lang.String,ScriptDateTime)
*/};

  this.createTransactionScriptModel = function () {/*
com.accela.aa.finance.cashier.onlinePayment.TransactionModel createTransactionScriptModel()
*/};

  this.createVoidPaymentAudit = function () {/*
ScriptResult createVoidPaymentAudit(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,long,long,ScriptDateTime,double,double,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,long,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String)
ScriptResult createVoidPaymentAudit(com.accela.aa.finance.cashierAudit.AccountingAuditTrailModel)
*/};

  this.getTotalFullPaidApp = function () {/*
ScriptResult getTotalFullPaidApp(java.lang.String)
*/};

  this.getACAModel = function () {/*
ScriptResult getACAModel(com.accela.aa.aamain.cap.CapModel)
*/};

  this.createApplyRefundAudit = function () {/*
ScriptResult createApplyRefundAudit(com.accela.aa.finance.cashierAudit.AccountingAuditTrailModel)
ScriptResult createApplyRefundAudit(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,long,long,ScriptDateTime,double,double,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,long,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String)
*/};

  this.generateReceipt = function () {/*
ScriptResult generateReceipt(com.accela.aa.aamain.cap.CapIDModel,ScriptDateTime,long,java.lang.String,java.lang.String)
ScriptResult generateReceipt(com.accela.aa.aamain.cap.CapIDModel,ScriptDateTime,long[],java.lang.String,java.lang.String)
*/};

  this.getFeeItemInvoiceBySetID = function () {/*
ScriptResult getFeeItemInvoiceBySetID(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getValuation = function () {/*
ScriptResult getValuation(java.lang.String)
*/};

  this.getInvoiceByCapID = function () {/*
ScriptResult getInvoiceByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.updateETransaction4ACA = function () {/*
ScriptResult updateETransaction4ACA(com.accela.aa.finance.cashier.onlinePayment.TransactionModel)
*/};

  this.getEtisalatRegisterModel = function () {/*
ScriptResult getEtisalatRegisterModel(java.lang.String,java.lang.String,java.lang.String,java.lang.String,int,java.lang.String,java.lang.String,java.lang.String,java.util.Date,java.lang.String,java.lang.String[],java.lang.String)
*/};

  this.getFeeItemInvoiceByCapID = function () {/*
ScriptResult getFeeItemInvoiceByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getTranBatchNbr = function () {/*
ScriptResult getTranBatchNbr()
*/};

  this.createRefundAudit = function () {/*
ScriptResult createRefundAudit(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,long,long,ScriptDateTime,double,double,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,long,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String)
ScriptResult createRefundAudit(com.accela.aa.finance.cashierAudit.AccountingAuditTrailModel)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.makeFundTransfer = function () {/*
ScriptResult makeFundTransfer(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,java.lang.String,ScriptDateTime,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String)
ScriptResult makeFundTransfer(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.cap.CapIDModel,PaymentScriptModel,java.lang.String,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String)
*/};

  this.makeRefund = function () {/*
ScriptResult makeRefund(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,ScriptDateTime,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,ScriptDateTime,java.lang.String)
*/};

  this.addFeeItem = function () {/*
ScriptResult addFeeItem(java.util.Collection)
*/};

  this.getPaymentByBatchNumber = function () {/*
ScriptResult getPaymentByBatchNumber(long)
*/};

  this.getFeeScheduleByCapID = function () {/*
ScriptResult getFeeScheduleByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.updateETransaction = function () {/*
ScriptResult updateETransaction(com.accela.aa.finance.cashier.onlinePayment.TransactionModel)
*/};

  this.getFeeItemByFeeCode = function () {/*
ScriptResult getFeeItemByFeeCode(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.switchCalcFactor = function () {/*
ScriptResult switchCalcFactor(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.getFeeItemInvoiceByFeeNbr = function () {/*
ScriptResult getFeeItemInvoiceByFeeNbr(com.accela.aa.aamain.cap.CapIDModel,long,com.accela.aa.util.QueryFormat)
*/};

  this.getFeeItemInvoiceByInvoiceNbr = function () {/*
ScriptResult getFeeItemInvoiceByInvoiceNbr(com.accela.aa.aamain.cap.CapIDModel,long,com.accela.aa.util.QueryFormat)
*/};

  this.updateMultiplierAndExtraAmount = function () {/*
ScriptResult updateMultiplierAndExtraAmount(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.voidPayment = function () {/*
ScriptResult voidPayment(com.accela.aa.aamain.cap.CapIDModel,PaymentScriptModel,java.lang.String)
ScriptResult voidPayment(com.accela.aa.aamain.cap.CapIDModel,ScriptDateTime,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getCashierAudit = function () {/*
ScriptResult getCashierAudit(long,com.accela.aa.util.QueryFormat)
*/};

  this.wrkItemFeeTotalBySubGroup = function () {/*
ScriptResult wrkItemFeeTotalBySubGroup(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.createFeeItem = function () {/*
ScriptResult createFeeItem(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,double)
ScriptResult createFeeItem(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,double)
ScriptResult createFeeItem(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,double,java.lang.String,double,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult createFeeItem(com.accela.aa.finance.fee.F4FeeItemModel,int)
*/};

  this.editFeeItemInvoice = function () {/*
ScriptResult editFeeItemInvoice(com.accela.aa.finance.invoice.X4FeeItemInvoiceModel)
*/};

  this.getTotalSetPaid = function () {/*
ScriptResult getTotalSetPaid(java.lang.String)
*/};

  this.createPaymentAudit = function () {/*
ScriptResult createPaymentAudit(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,long,long,ScriptDateTime,double,double,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,long,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult createPaymentAudit(com.accela.aa.finance.cashierAudit.AccountingAuditTrailModel)
*/};

  this.getTotalPaidInvoice = function () {/*
ScriptResult getTotalPaidInvoice(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.createPaymentScriptModel = function () {/*
PaymentScriptModel createPaymentScriptModel()
*/};

  this.getValuationCalcExtraAmount = function () {/*
ScriptResult getValuationCalcExtraAmount(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getPaymentByDate = function () {/*
ScriptResult getPaymentByDate(java.util.Date,java.util.Date,com.accela.aa.util.QueryFormat)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.getSetInvoicedPerApp = function () {/*
ScriptResult getSetInvoicedPerApp(java.lang.String)
*/};

  this.getFeeCalcFactor = function () {/*
ScriptResult getFeeCalcFactor(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.assignFeeFactor = function () {/*
ScriptResult assignFeeFactor(com.accela.aa.aamain.cap.CapIDModel,boolean)
*/};

  this.getETransaction = function () {/*
ScriptResult getETransaction(com.accela.aa.finance.cashier.onlinePayment.TransactionModel,com.accela.aa.util.QueryFormat)
*/};

  this.getContractorSuppliedValuation = function () {/*
ScriptResult getContractorSuppliedValuation(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getFeeItemByCapID = function () {/*
ScriptResult getFeeItemByCapID(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getFeeScheduleList = function () {/*
ScriptResult getFeeScheduleList(java.lang.String)
*/};

  this.getInvoiceAmountExceptVoidCredited = function () {/*
ScriptResult getInvoiceAmountExceptVoidCredited(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getPaymentByPK = function () {/*
ScriptResult getPaymentByPK(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String)
*/};

  this.getCashierSessionFromDB = function () {/*
ScriptResult getCashierSessionFromDB()
*/};

  this.editFeeItem = function () {/*
ScriptResult editFeeItem(com.accela.aa.finance.fee.F4FeeItemModel)
ScriptResult editFeeItem(com.accela.aa.finance.fee.F4FeeItemModel,int)
ScriptResult editFeeItem(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,double,java.lang.String,double,ScriptDateTime,ScriptDateTime,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getReceiptByCapID = function () {/*
ScriptResult getReceiptByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getTotalSetPaidByPeriod = function () {/*
ScriptResult getTotalSetPaidByPeriod(java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getTotalSetApp = function () {/*
ScriptResult getTotalSetApp(java.lang.String)
*/};

  this.getReceiptsByDate = function () {/*
ScriptResult getReceiptsByDate(java.util.Date,java.util.Date,com.accela.aa.util.QueryFormat)
*/};

  this.createBCalcValuatn = function () {/*
ScriptResult createBCalcValuatn(BCalcValuatnScriptModel)
*/};

  this.getPaymentByCapID = function () {/*
ScriptResult getPaymentByCapID(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.voidFeeItem = function () {/*
ScriptResult voidFeeItem(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String)
ScriptResult voidFeeItem(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.createBCalcValuatnScriptModel = function () {/*
BCalcValuatnScriptModel createBCalcValuatnScriptModel()
*/};

  this.getPaymentByReceiptNo = function () {/*
ScriptResult getPaymentByReceiptNo(com.accela.aa.aamain.cap.CapIDModel,long,com.accela.aa.util.QueryFormat)
*/};

  this.getFeeItemInvoiceList = function () {/*
ScriptResult getFeeItemInvoiceList(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getFeeItemList = function () {/*
ScriptResult getFeeItemList(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,com.accela.aa.util.QueryFormat)
ScriptResult getFeeItemList(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getValidFeeItemInvoiceListByFeeNbrList = function () {/*
ScriptResult getValidFeeItemInvoiceListByFeeNbrList(com.accela.aa.aamain.cap.CapIDModel,java.util.List)
*/};

  this.makePayment4ACA = function () {/*
ScriptResult makePayment4ACA(com.accela.aa.aamain.cap.CapIDModel,PaymentScriptModel,com.accela.aa.finance.cashier.onlinePayment.util.ACAModel)
*/};

  this.createApplyPaymentAudit = function () {/*
ScriptResult createApplyPaymentAudit(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,long,long,ScriptDateTime,double,double,java.lang.String,java.lang.String,long,java.lang.String,java.lang.String,long,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String)
ScriptResult createApplyPaymentAudit(com.accela.aa.finance.cashierAudit.AccountingAuditTrailModel)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.deleteBCalcValuatn = function () {/*
ScriptResult deleteBCalcValuatn(BCalcValuatnScriptModel)
*/};

  this.getCashierAuditListByCapId = function () {/*
ScriptResult getCashierAuditListByCapId(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getFeeItemByPK = function () {/*
ScriptResult getFeeItemByPK(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.calculateFees = function () {/*
ScriptResult calculateFees(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getSetPaymentsByReceiptNbr = function () {/*
ScriptResult getSetPaymentsByReceiptNbr(long,com.accela.aa.util.QueryFormat)
*/};

  this.createBvaluatn = function () {/*
ScriptResult createBvaluatn(com.accela.aa.finance.feeValuation.BValuatnModel)
ScriptResult createBvaluatn(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,double,double,double,java.lang.String,ScriptDateTime,java.lang.String)
*/};

  this.createInvoice = function () {/*
ScriptResult createInvoice(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
ScriptResult createInvoice(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.finance.invoice.F4InvoiceModel,java.util.Collection)
ScriptResult createInvoice(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,ScriptDateTime,double,double,ScriptDateTime,ScriptDateTime,java.lang.String,long,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,ScriptDateTime,java.lang.String,java.util.Collection)
ScriptResult createInvoice(com.accela.aa.aamain.cap.CapIDModel,long[],java.lang.String[])
*/};
}

function FinanceScript() {
  this.applyPaymentToSet = function () {/*
ScriptResult applyPaymentToSet(java.lang.String,java.lang.String,java.lang.String,java.lang.String,double[],double[],java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,ScriptDateTime,double,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult applyPaymentToSet(java.lang.String,java.lang.String[],java.lang.String[],java.lang.String[],double[],double[],java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,ScriptDateTime,double,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getFeeAuditList = function () {/*
ScriptResult getFeeAuditList(long,com.accela.aa.util.QueryFormat)
ScriptResult getFeeAuditList(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.editInvoiceBalanceDue = function () {/*
ScriptResult editInvoiceBalanceDue(long,double,double)
*/};

  this.makePayment = function () {/*
ScriptResult makePayment(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String,java.lang.String,ScriptDateTime,java.lang.String,ScriptDateTime,double,double,double,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
ScriptResult makePayment(PaymentScriptModel)
*/};

  this.editBValuatnValue = function () {/*
ScriptResult editBValuatnValue(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,double,java.lang.String)
*/};

  this.reCalculateFees = function () {/*
ScriptResult reCalculateFees(com.accela.aa.aamain.cap.CapIDModel,java.lang.String,java.lang.String)
*/};

  this.getInvoiceFeeItemBySetID = function () {/*
ScriptResult getInvoiceFeeItemBySetID(java.lang.String,java.lang.String,java.lang.String,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.editFeeAudit = function () {/*
ScriptResult editFeeAudit(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String)
*/};

  this.closeInvoice = function () {/*
ScriptResult closeInvoice(com.accela.aa.aamain.cap.CapIDModel,long,long,java.lang.String,ScriptDateTime,double,double,ScriptDateTime,ScriptDateTime,java.lang.String,long,ScriptDateTime,java.lang.String,java.lang.String,java.lang.String,java.lang.String,long,ScriptDateTime,java.lang.String,com.accela.aa.util.QueryFormat)
ScriptResult closeInvoice(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.finance.invoice.F4InvoiceModel,com.accela.aa.util.QueryFormat)
*/};

  this.createACAScriptModel = function () {/*
com.accela.aa.finance.cashier.onlinePayment.util.ACAModel createACAScriptModel()
*/};

  this.createFeeItemsForPosTransaction = function () {/*
ScriptResult createFeeItemsForPosTransaction(java.util.List,java.lang.Long)
*/};

  this.removeFeeItem = function () {/*
ScriptResult removeFeeItem(com.accela.aa.aamain.cap.CapIDModel,long)
ScriptResult removeFeeItem(com.accela.aa.finance.fee.F4FeeItemModel)
*/};

  this.getFeeAuditByPK = function () {/*
ScriptResult getFeeAuditByPK(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.voidFeeItemAddAudit = function () {/*
ScriptResult voidFeeItemAddAudit(com.accela.aa.aamain.cap.CapIDModel,long,java.lang.String,java.lang.String)
*/};

  this.getAddressByAddressId = function () {/*
ScriptResult getAddressByAddressId(long,com.accela.aa.util.QueryFormat)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.getContactAddressListByCapContact = function () {/*
ScriptResult getContactAddressListByCapContact(com.accela.aa.aamain.people.CapContactModel)
*/};

  this.editAddressWithAPOAttribute = function () {/*
ScriptResult editAddressWithAPOAttribute(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.AddressModel)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.getRefAddressByHouseNoDirStreetNameSuffix = function () {/*
ScriptResult getRefAddressByHouseNoDirStreetNameSuffix(long,long,java.lang.String,java.lang.String)
*/};

  this.getCapContactAddressList = function () {/*
ScriptResult getCapContactAddressList(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.getXRefContactAddressList = function () {/*
ScriptResult getXRefContactAddressList(com.accela.orm.model.address.XRefContactAddressModel)
*/};

  this.getAddressDistrictForDaily = function () {/*
ScriptResult getAddressDistrictForDaily(java.lang.String,java.lang.String,java.lang.String,long)
*/};

  this.removeAddress = function () {/*
ScriptResult removeAddress(com.accela.aa.aamain.cap.CapIDModel,long)
*/};

  this.editAddressWithRefAddressModelWithLogic = function () {/*
ScriptResult editAddressWithRefAddressModelWithLogic(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.createXRefContactAddress = function () {/*
ScriptResult createXRefContactAddress(com.accela.orm.model.address.XRefContactAddressModel)
*/};

  this.createAddressWithRefAddressModel = function () {/*
ScriptResult createAddressWithRefAddressModel(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.createAddressWithLogic = function () {/*
ScriptResult createAddressWithLogic(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.AddressModel)
*/};

  this.getAddressDistrictForAdmin = function () {/*
ScriptResult getAddressDistrictForAdmin(long)
*/};

  this.getAddressByCapId = function () {/*
ScriptResult getAddressByCapId(com.accela.aa.aamain.cap.CapIDModel)
ScriptResult getAddressByCapId(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getCompactAddress = function () {/*
ScriptResult getCompactAddress(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.util.QueryFormat)
*/};

  this.getCapIdByAddress = function () {/*
ScriptResult getCapIdByAddress(com.accela.aa.aamain.address.AddressModel)
*/};

  this.editCapContactAddress = function () {/*
ScriptResult editCapContactAddress(com.accela.aa.aamain.cap.CapIDModel,com.accela.orm.model.address.ContactAddressModel)
*/};

  this.getXRefContactAddressByPK = function () {/*
ScriptResult getXRefContactAddressByPK(com.accela.orm.model.address.XRefContactAddressModel)
*/};

  this.deleteAddressDistrictForDaily = function () {/*
ScriptResult deleteAddressDistrictForDaily(java.lang.String,java.lang.String,java.lang.String,long,java.lang.String)
*/};

  this.editAddressWithLogic = function () {/*
ScriptResult editAddressWithLogic(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.AddressModel)
*/};

  this.getAddressWithAttributeByCapId = function () {/*
ScriptResult getAddressWithAttributeByCapId(com.accela.aa.aamain.cap.CapIDModel)
*/};

  this.getRefAddressByStreetName = function () {/*
ScriptResult getRefAddressByStreetName(java.lang.String)
*/};

  this.editContactAddress = function () {/*
ScriptResult editContactAddress(com.accela.orm.model.address.ContactAddressModel)
*/};

  this.createContactAddressModel = function () {/*
ScriptResult createContactAddressModel()
*/};

  this.editRefAddressWithLogic = function () {/*
ScriptResult editRefAddressWithLogic(java.lang.String,com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.removeRefAddress = function () {/*
ScriptResult removeRefAddress(long,java.lang.String)
ScriptResult removeRefAddress(long,int)
*/};

  this.deleteAddressDistrictForAdmin = function () {/*
ScriptResult deleteAddressDistrictForAdmin(long,java.lang.String)
*/};

  this.deleteCapContactAddress = function () {/*
ScriptResult deleteCapContactAddress(com.accela.aa.aamain.cap.CapIDModel,long,long)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.getRefAddressByServiceProviderRefAddressModel = function () {/*
ScriptResult getRefAddressByServiceProviderRefAddressModel(com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.editRefAddress = function () {/*
ScriptResult editRefAddress(com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.getContactAddressList = function () {/*
ScriptResult getContactAddressList(com.accela.orm.model.address.ContactAddressModel)
*/};

  this.getRefAddressByPK = function () {/*
ScriptResult getRefAddressByPK(java.lang.String)
*/};

  this.getAssignedAddressDistrictForDaily = function () {/*
ScriptResult getAssignedAddressDistrictForDaily(java.lang.String,java.lang.String,java.lang.String,long)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.getAddressByHouseRangeStreetName = function () {/*
ScriptResult getAddressByHouseRangeStreetName(long,long,java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.getAddressByRefAddressModel = function () {/*
ScriptResult getAddressByRefAddressModel(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.createRefAddressWithLogic = function () {/*
ScriptResult createRefAddressWithLogic(java.lang.String,com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.addAddressDistrictForDaily = function () {/*
ScriptResult addAddressDistrictForDaily(java.lang.String,java.lang.String,java.lang.String,long,java.lang.String)
*/};

  this.getAssignedAddressDistrictForAdmin = function () {/*
ScriptResult getAssignedAddressDistrictForAdmin(long)
*/};

  this.getContactAddressByPK = function () {/*
ScriptResult getContactAddressByPK(com.accela.orm.model.address.ContactAddressModel)
*/};

  this.createCapContactAddress = function () {/*
ScriptResult createCapContactAddress(com.accela.aa.aamain.cap.CapIDModel,com.accela.orm.model.address.ContactAddressModel)
*/};

  this.addAddressDistrictForAdmin = function () {/*
ScriptResult addAddressDistrictForAdmin(long,java.lang.String)
*/};

  this.initScript = function () {/*
void initScript(java.lang.String,java.lang.String)
*/};

  this.deleteXRefContactAddress = function () {/*
ScriptResult deleteXRefContactAddress(com.accela.orm.model.address.XRefContactAddressModel)
*/};

  this.editXRefContactAddress = function () {/*
ScriptResult editXRefContactAddress(com.accela.orm.model.address.XRefContactAddressModel)
*/};

  this.getContactAddressModel = function () {/*
ScriptResult getContactAddressModel(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.createAddress = function () {/*
ScriptResult createAddress(com.accela.aa.aamain.address.AddressModel)
*/};

  this.getAddressByStreetName = function () {/*
ScriptResult getAddressByStreetName(java.lang.String,com.accela.aa.util.QueryFormat)
*/};

  this.createRefAddress = function () {/*
ScriptResult createRefAddress(com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.getAddressWithTypeByCapId = function () {/*
ScriptResult getAddressWithTypeByCapId(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.getAddressByPK = function () {/*
ScriptResult getAddressByPK(com.accela.aa.aamain.cap.CapIDModel,java.lang.Long)
*/};

  this.copyAddressModel = function () {/*
ScriptResult copyAddressModel(com.accela.aa.aamain.address.AddressModel,com.accela.aa.aamain.address.AddressModel)
*/};

  this.getCityList = function () {/*
ScriptResult getCityList(com.accela.aa.util.QueryFormat)
*/};

  this.createAddressWithAPOAttribute = function () {/*
ScriptResult createAddressWithAPOAttribute(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.AddressModel)
*/};

  this.getRefAddressByHouseNoRangeStreetNameSuffix = function () {/*
ScriptResult getRefAddressByHouseNoRangeStreetNameSuffix(long,long,java.lang.String,java.lang.String)
*/};

  this.getPrimaryAddressByCapID = function () {/*
ScriptResult getPrimaryAddressByCapID(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.deleteContactAddress = function () {/*
ScriptResult deleteContactAddress(com.accela.orm.model.address.ContactAddressModel)
*/};

  this.notify = function () {/*
void notify()
*/};

  this.editAddress = function () {/*
ScriptResult editAddress(com.accela.aa.aamain.address.AddressModel)
*/};

  this.getAddressListForAdmin = function () {/*
ScriptResult getAddressListForAdmin(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getRefAddressByHouseRangeStreetName = function () {/*
ScriptResult getRefAddressByHouseRangeStreetName(long,long,java.lang.String)
*/};

  this.removeAddressWithLogic = function () {/*
ScriptResult removeAddressWithLogic(com.accela.aa.aamain.cap.CapIDModel,java.lang.String)
*/};
}

function AddressScript() {
  this.getDailyAddressByCapId = function () {/*
ScriptResult getDailyAddressByCapId(java.lang.String,java.lang.String,java.lang.String)
*/};

  this.getAddressWithTypeByPK = function () {/*
ScriptResult getAddressWithTypeByPK(com.accela.aa.aamain.cap.CapIDModel,java.lang.Long,java.lang.String)
*/};

  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.createXRefContactAddressModel = function () {/*
ScriptResult createXRefContactAddressModel()
*/};

  this.createContactAddress = function () {/*
ScriptResult createContactAddress(com.accela.orm.model.address.ContactAddressModel)
*/};

  this.isExisted = function () {/*
ScriptResult isExisted(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.AddressModel)
ScriptResult isExisted(com.accela.aa.aamain.address.RefAddressModel)
ScriptResult isExisted(com.accela.aa.aamain.cap.CapIDModel,com.accela.aa.aamain.address.RefAddressModel)
*/};

  this.removeAddressWithType = function () {/*
ScriptResult removeAddressWithType(com.accela.aa.aamain.address.AddressModel)
*/};

  this.createRefAddressScriptModel = function () {/*
RefAddressScriptModel createRefAddressScriptModel()
*/};
}

function aa() {
  this.hashCode = function () {/*
int hashCode()
*/};

  this.runAdHoc = function () {/*
ScriptResult runAdHoc(java.lang.String,java.util.Hashtable,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.runOracleReport = function () {/*
ScriptResult runOracleReport(java.lang.String,java.lang.String,java.lang.String,java.util.Hashtable,java.lang.String)
*/};

  this.log = function () {/*
void log(java.lang.String)
*/};

  this.getHashtable = function () {/*
ScriptResult getHashtable(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.print = function () {/*
void print(java.lang.String)
*/};

  this.sendEmail = function () {/*
ScriptResult sendEmail(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.debug = function () {/*
void debug(java.lang.String,java.lang.Object)
*/};

  this.hashCode = function () {/*
int hashCode()
*/};

  this.runAdHoc = function () {/*
ScriptResult runAdHoc(java.lang.String,java.util.Hashtable,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.runOracleReport = function () {/*
ScriptResult runOracleReport(java.lang.String,java.lang.String,java.lang.String,java.util.Hashtable,java.lang.String)
*/};

  this.log = function () {/*
void log(java.lang.String)
*/};

  this.getHashtable = function () {/*
ScriptResult getHashtable(java.lang.String,java.lang.String)
*/};

  this.getfunction = function () {/*
java.lang.function  getfunction ()
*/};

  this.print = function () {/*
void print(java.lang.String)
*/};

  this.sendEmail = function () {/*
ScriptResult sendEmail(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.debug = function () {/*
void debug(java.lang.String,java.lang.Object)
*/};

  this.sendMail = function () {/*
ScriptResult sendMail(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
*/};

  this.equals = function () {/*
boolean equals(java.lang.Object)
*/};

  this.runScriptInNewTransaction = function () {/*
void runScriptInNewTransaction(java.lang.String)
*/};

  this.wait = function () {/*
void wait(long)
void wait()
void wait(long,int)
*/};

  this.timerStart = function () {/*
void timerStart(java.lang.String)
*/};

  this.runAsyncScript = function () {/*
void runAsyncScript(java.lang.String,java.util.HashMap)
*/};

  this.getAuditID = function () {/*
java.lang.String getAuditID()
*/};

  this.runScript = function () {/*
void runScript(java.lang.String)
*/};

  this.toString = function () {/*
java.lang.String toString()
*/};

  this.timerEnd = function () {/*
void timerEnd(java.lang.String)
*/};

  this.sendEmailWithAttachedFiles = function () {/*
ScriptResult sendEmailWithAttachedFiles(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String[])
*/};

  this.notify = function () {/*
void notify()
*/};

  this.abortScript = function () {/*
void abortScript()
*/};

  this.getServiceProviderCode = function () {/*
java.lang.String getServiceProviderCode()
*/};
}

function ScriptRoot() {
  this.notifyAll = function () {/*
void notifyAll()
*/};

  this.getDebugOutput = function () {/*
java.lang.String getDebugOutput()
*/};

  this.sleep = function () {/*
void sleep(long)
*/};
}

/* Necessary methods for exploring accela code
function exploreObject(objExplore) {
  aa.print("Methods:");
  for (var x in objExplore) {
    if (typeof(objExplore[x]) == "function")
      aa.print("   " + x);
  }

  aa.print("");
  aa.print("Properties:");
  for (var y in objExplore) {
    if (typeof(objExplore[y]) != "function")
      aa.print("   " + y + " = " + objExplore[y]);
  }
}

function getScriptText(vScriptName) {
  vScriptName = vScriptName.toUpperCase();
  var emseBiz =
      aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness")
          .getOutput();
  var emseScript =
      emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
  return emseScript.getScriptText() + "";
}
*/
