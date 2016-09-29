/*===================================================================
 Versions:
 9/26/2016-A	John Cheney			initial
 9/27/2016-A	John Cheney			removed msg var from switch statement
 9/29/2016-B	John Cheney			getDocs() - added check for getResult = null
 ---------------------------------------------------------------------
// Script Number: 313
// Script Name: PLN_PlanningAndZoningSitePlanReview.js
// Script Agency: Mesa
// Script Description: 	

If one of the following ASI fields = 'Y' or 'Yes'
- Site Plan Review/Modification
- Special Use Permit
- Combined Rezone and Site Plan Review /Modification

then make the following documents required: 
- Site Plan
- Preliminary Grading Drainage and Utility Plan 
- Floor Plans
- Landscape Plan 
- Building Elevations 
    
record type: Planning/Planning and Zoning/NA/NA

test records: 
    ZON16-00317  - site plan Review & special use (submitted)
    16EST-000174  - special use permit (before submitted)

specs:
https://portal.accelaops.com/projects/Mesa/Lists/Script%20Tracker/DispForm.aspx?ID=313&Source=https%3A%2F%2Fportal%2Eaccelaops%2Ecom%2Fprojects%2FMesa%2FLists%2FScript%2520Tracker%2Factive%2Easpx%23InplviewHash7e331ea4%2D3c8e%2D4f93%2D9ce2%2D6518918cd44f%3DFilterField1%253DScript%25255Fx0020%25255FStatus%2DFilterValue1%253DSpec%252520%25252D%252520City%252520Approved&ContentTypeId=0x010300D70AB462012E604593F2EB837FB5F3FD 


Script Run Events: ASB, ASIUB

// Script Parents:
//		ASB;Planning!Planning and Zoning!NA!NA
//      ASIUB;Planning!Planning and Zoning!NA!NA
//
/*==================================================================*/


//logDebug("---------- start  PLN_PlanningAndZoningSitePlanReview ----------");

try
{

    var matches = false;

    var site = AInfo["Site Plan Review/Modification"];
    if (site && site == "CHECKED"){
        matches = true;
        logDebug("PLN_PlanningAndZoningSitePlanReview - found a Site Plan Review/Modification");
    }

    var permit = AInfo["Special Use Permit"];
    if (permit && permit == "CHECKED"){
        matches = true;
        logDebug("PLN_PlanningAndZoningSitePlanReview - found a Special Use Permit");
    }

    var combo = AInfo["Combined Rezone and Site Plan Review /Modification"];
    if (combo && combo == "CHECKED"){
        matches = true;
        logDebug("PLN_PlanningAndZoningSitePlanReview - found a Combined Rezone and Site Plan Review /Modification");
    }

    if(matches){

        // get the docs!  (method works with ASB and later events)  
         var docArray = getDocs();

        if (docArray){

            // -- now examine docs and determine which are missing --
            var hasSite = false;
            var hasGrad = false;
            var hasFloor = false;
            var hasLand = false;
            var hasBuild = false;

            logDebug("docArray length = " + String(docArray.length));

            for (var i = 0; i < docArray.length; i++) {

//                logDebug("doc = " + docArray[i]);

                switch(docArray[i]){
                        case "Site Plan":
                            hasSite = true;
                            break;

                        case "Preliminary Grading Drainage and Utility Plan":
                            hasGrad = true;
                            break;

                        case "Floor Plans":
                            hasFloor = true;
                            break;

                        case "Landscape Plan":
                            hasLand = true;
                            break;

                        case "Building Elevations":
                            hasBuild = true;
                            break;
                    }
            } // end for through docs


            // missing any docs?
            if (!hasSite || !hasGrad || !hasFloor || !hasLand || !hasBuild )
            {
                // yes, tell user what they are missing
                var msg = "These documents are required: ";
                if(!hasSite) msg = msg + "Site Plan, ";
                if(!hasGrad) msg = msg + "Preliminary Grading Drainage and Utility Plan, ";
                if(!hasFloor) msg = msg + "Floor Plans, ";
                if(!hasLand) msg = msg + "Landscape Plan, ";
                if(!hasBuild) msg = msg + "Building Elevations, ";

                // chop off last comma and space
                msg = msg.substring(0, msg.length -2);
                showMessage = true;
                comment(msg);
                cancel = true;    
            }

        } else {
            logDebug("PLN_PlanningAndZoningSitePlanReview - Error.  Document array is null!!");    
        }
    } else {
        logDebug("PLN_PlanningAndZoningSitePlanReview - No Action.  Criteria not met.");
    }
}
catch (err)
{
  logDebug("PLN_PlanningAndZoningSitePlanReview - JavaScript Error: " + err.message);
  logDebug(err.stack);
}

////////////////////////// functions ///////////////////////
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
    logDebug("PLN_PlanningAndZoningSitePlanReview - trying aa.env.getValue..");
    var getResult = aa.env.getValue("DocumentModelList");

    if(!getResult || getResult == ""){
        logDebug("PLN_PlanningAndZoningSitePlanReview - trying aa.document.getDoc..");
        getResult = aa.document.getDocumentListByEntity(capId.toString(),"TMP_CAP");
    }

    // note: this getResult object does not support getSuccess()
    if (getResult &&  getResult != "") {
        logDebug("PLN_PlanningAndZoningSitePlanReview - have docs!");
        // copy data from [object JavaObject]  to javascript array of strings
        var objArray = getResult.getOutput();
        var arrCount = objArray.size();
        for(i=0; i<arrCount; i++)
        { 
            if(objArray.get(i) != null){
                var xx = objArray.get(i).getDocCategory()
                //logDebug("xx = " + xx);
                docArray.push(xx);
            }
        }
    } 
    return docArray; 
}


//logDebug("---------- end  PLN_PlanningAndZoningSitePlanReview ----------");
