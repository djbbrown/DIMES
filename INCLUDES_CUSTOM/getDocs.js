//*===================================================================
//
// Script Name: getDocs.js 
// Script Developer: John Cheney
// Script Agency: City of Mesa
// Script Description:  
//		gets the document list for the capId
// 
//==================================================================*/

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