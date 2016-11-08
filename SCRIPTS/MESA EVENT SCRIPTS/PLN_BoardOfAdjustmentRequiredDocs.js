/*===================================================================
// Script Number: 249
// Script Name: PLN_BoardOfAdjustmentRequiredDocs.js
// Script Developer: Michael Kniskern
// Script Agency: Mesa
// Script Description: 
	
At application intake,
If ASI field "Application Type" = "Commercial/Industrial" or "Multiple Residence", then require the following documents:
Site Plan
Preliminary Grading, Drainage and Utility Plan
Floor Plans
Landscape Plan
Building Elevations
 
If ASI field "Application Type" = "Single Residence", then require the following documents:
Site Plan
Floor Plans
Building Elevations
 
If ASI field "Application Type" = "Wireless Communications Facility", then require the following documents:
Site Plan
Elevations
Photo Simulation
Before Signal Coverage Map
After Signal Coverage Map
Declaration of Gap/Capacity
Vicinity Map (including dimensions)
 
If ASI field "Application Type" = "Comprehensive Sign Plan", then require the following documents:
Site Plan
Sign Plan
Sign Inventory
Building Elevations

// Script Run Event: ASB, ASIUB

// Script Parents:

//	ASB;Planning/Board of Adjustment/NA/NA
    ASIUB;Planning/Board of Adjustment/NA/NA
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try
{
    var recordType = "Planning/Board of Adjustment/NA/NA";

    //check the record type to verify it is a Planning/Board of Adjustment/NA/NA before verify required documents
    if(appMatch(recordType)) {
        //get the ASI field "Application Type" for the record  
        var applicationType = "" + AInfo["Application Type"];
                
        //if the application type is populated, need to check the value to determine which documents are required
        if(applicationType.length > 0 && applicationType != "null") {
            var documentCategory = "";
            var hasDocuments = true;
            var passedCriteria = true;
            var validationMsg = "";

            applicationType = applicationType.toUpperCase();

            //grab the documents for the record and loop through to verify all the required documentation is attached
            var documentList = getDocs();

            //if there are not any documents attached to record, set no documents to true so we do have to perform document check
            if(documentList.length == 0) hasDocuments = false;

            switch(applicationType) {
                case "COMMERCIAL/INDUSTRIAL":
                case "MULTIPLE RESIDENCE":
                    var sitePlanDoc = false;
                    var prelimDoc = false;
                    var floorPlansDoc = false;
                    var landscapePlanDoc = false;
                    var buildingEvalDoc = false;
                    
                    if(hasDocuments) {
                        for(x in documentList) {
                            documentCategory = "" + documentList[x].toUpperCase();

                            switch(documentCategory) {
                                case "SITE PLAN":
                                    sitePlanDoc = true;
                                    break;
                                case "PRELIMINARY GRADING, DRAINAGE AND UTILITY PLAN":
                                    prelimDoc = true;
                                    break;
                                case "FLOOR PLANS":
                                    floorPlansDoc = true;
                                    break;
                                case "LANDSCAPE PLAN":
                                    landscapePlanDoc = true;
                                    break;
                                case "BUILDING ELEVATIONS":
                                    buildingEvalDoc = true;
                                    break;
                            }
                        }

                        if(!sitePlanDoc || !prelimDoc || !floorPlansDoc || !landscapePlanDoc || !buildingEvalDoc)
                            passedCriteria = false;
                    }
                    else 
                        passedCriteria = false;

                    if(!passedCriteria) {
                        if(applicationType == "COMMERCIAL/INDUSTRIAL")
                            validationMsg += "For a 'Commercial/Industrial' application type, the following documents are required: \n";
                        else if(applicationType == "MULTIPLE RESIDENCE")
                            validationMsg += "For a 'Multiple Residence' application type, the following documents are required: \n";

                        if(!sitePlanDoc) validationMsg += "Site Plan \n"; 
                        if(!prelimDoc) validationMsg += "Preliminary Grading, Drainage and Utility Plan \n";
                        if(!floorPlansDoc) validationMsg += "Floor Plans \n";
                        if(!landscapePlanDoc) validationMsg += "Landscape Plan \n";
                        if(!buildingEvalDoc) validationMsg += "Building Elevations";
                    }

                    break;

                case "SINGLE RESIDENCE":
                    var floorPlansDoc = false;
                    var sitePlanDoc = false;
                    var buildingEvalDoc = false;
                    
                    if(hasDocuments) {
                        for(x in documentList) {
                            documentCategory = "" + documentList[x].toUpperCase();

                            switch(documentCategory) {
                                case "SITE PLAN":
                                    sitePlanDoc = true;
                                    break;
                                case "FLOOR PLANS":
                                    floorPlansDoc = true;
                                    break;
                                case "BUILDING ELEVATIONS":
                                    buildingEvalDoc = true;
                                    break;
                            }
                        }

                        if(!floorPlansDoc || !sitePlanDoc || !buildingEvalDoc)
                            passedCriteria = false;
                    }
                    else 
                        passedCriteria = false;

                    if(!passedCriteria) {
                        validationMsg += "For a 'Single Residence' application type, the following documents are required: \n";
                        
                        if(!sitePlanDoc) validationMsg += "Site Plan \n"; 
                        if(!floorPlansDoc) validationMsg += "Floor Plans \n";
                        if(!buildingEvalDoc) validationMsg += "Building Elevations";
                    }

                    break;

                case "WIRELESS COMMUNICATIONS FACILITY":
                    var sitePlanDoc = false;
                    var elevationsDoc = false;
                    var photoSimulationDoc = false;
                    var beforeSignCoverageMap = false;
                    var afterSignalCoverageMap = false;
                    var declarationDoc = false;
                    var vicinityMap = false;

                    if(hasDocuments) {
                        for(x in documentList) {
                            documentCategory = "" + documentList[x].toUpperCase();

                            switch(documentCategory) {
                                case "SITE PLAN":
                                    sitePlanDoc = true;
                                    break;
                                case "ELEVATIONS":
                                    elevationsDoc = true;
                                    break;
                                case "PHOTO SIMULATION":
                                    photoSimulationDoc = true;
                                    break;
                                case "BEFORE SIGNAL COVERAGE MAP":
                                    beforeSignCoverageMap = true;
                                    break;
                                case "AFTER SIGNAL COVERAGE MAP":
                                    afterSignalCoverageMap = true;
                                    break;
                                case "DECLARATION OF GAP/CAPACITY":
                                    declarationDoc = true;
                                    break;
                                case "VICINITY MAP":
                                    vicinityMap = true;
                                    break;
                            }
                        }

                        if(!sitePlanDoc || !elevationsDoc || !photoSimulationDoc || !beforeSignCoverageMap || !afterSignalCoverageMap || !declarationDoc || !vicinityMap)
                            passedCriteria = false;
                    }
                    else
                        passedCriteria = false;

                    if(!passedCriteria) {
                        validationMsg += "For a 'Wireless Communication Facility' application type, the following documents are required: \n";
                        
                        if(!sitePlanDoc) validationMsg += "Site Plan \n";
                        if(!elevationsDoc) validationMsg += "Elevations \n";
                        if(!photoSimulationDoc) validationMsg += "Photo Simulation \n";
                        if(!beforeSignCoverageMap) validationMsg += "Before Signal Coverage Map \n";
                        if(!afterSignalCoverageMap) validationMsg += "After Signal Coverage Map \n";
                        if(!declarationDoc) validationMsg += "Declaration of Gap/Capacity \n";
                        if(!vicinityMap) validationMsg += "Vicinity Map (including dimensions)";
                    }

                    break;

                case "COMPREHENSIVE SIGN PLAN":
                    var sitePlanDoc = false;
                    var signPlanDoc = false;
                    var signInventoryDoc = false;
                    var buildingElevationsDoc = false;

                    if(hasDocuments) {
                        for(x in hasDocuments) {
                            documentCategory = "" + documentList[x].toUpperCase();

                            switch(documentCategory) {
                                case "SITE PLAN":
                                    sitePlanDoc = true;
                                    break;
                                case "SIGN PLAN":
                                    signPlanDoc = true;
                                    break;
                                case "SIGN INVENTORY":
                                    signInventoryDoc = true;
                                    break;
                                case "BUILDING ELEVATIONS":
                                    buildingEvalDoc = true;
                                    break;
                            }
                        }

                        if(!sitePlanDoc || !signPlanDoc || !signInventoryDoc || !buildingElevationsDoc)
                            passedCriteria = false;
                    }
                    else
                        passedCriteria = false;

                    if(!passedCriteria) {
                        validationMsg += "For a 'Comprehensive Sign Plan' application type, the following documents are required: \n";
                        
                        if(!sitePlanDoc) validationMsg += "Site Plan \n";
                        if(!signPlanDoc) validationMsg += "Sign Plan \n";
                        if(!signInventoryDoc) validationMsg += "Sign Inventory \n";
                        if(!buildingElevationsDoc) validationMsg += "Building Elevations";
                    }

                    break;
            }

            if(!passedCriteria) {
                showMessage = true;
                comment(validationMsg);
                cancel = true;
            }
        }
    }
}
catch (err)
{
  logDebug("A JavaScript error occurred: " + err.message);
}

/* functions */
//works after a record has been submitted, if run during ASB will return a zero length array
function getDocs() {
    var docArray = [];
    var getResult = aa.document.getCapDocumentList(capId, currentUserID);

    //10.25.2016 - MRK - added getResult to the if statement
    if(getResult && getResult.getSuccess()) {
        var objArray = getResult.getOutput();
        for(i in objArray) {
            var xx = objArray[i].getDocCategory();
            docArray.push(xx);
        }
    }
    else {
        return getDocsAsb();
    }

    return docArray;
}

//works before a record has been submitted.  To test, create a record and save without submitting
//11.07.2016 - MRK - refactored method to mirror the getDocsAsb() method in the PLN_PlanningAndZoningSitePlanReview.js 
function getDocsAsb() {
    var docArray = [];
    var getResult = aa.env.getValue("DocumentModelList");

    //11.08.2016 - MRK - added getOutput method to the getDocumentListByEntity call
    if(!getResult || getResult == "") {
        getResult = aa.document.getDocumentListByEntity(capId.toString(),"TMP_CAP").getOutput();
    }

    //11.07.2016 - MRK - removed getSuccess() because this getResult object does not support getSuccess()
    if(getResult) {
        var count = getResult.size();

        for(i = 0; i < count; i++) {
            if(getResult.get(i) != null) {
                var xx = getResult.get(i).getDocCategory();
                docArray.push(XX);
            }
        }
    }

    return docArray;
}

/* Test Record: 
     PLN2016-00725 - Commerical/Industrial 
     PLN2016-00719 - Multiple Residence 
     PLN2016-00714 - Single Residence
     PLN2016-00691 - Wireless Communications Facility
     PLN2016-00662 - Comprehensive Sign Plan
*/