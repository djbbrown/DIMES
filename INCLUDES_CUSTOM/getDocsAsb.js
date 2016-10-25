//*===================================================================
//
// Script Name: getDocs.js 
// Script Developer: John Cheney
// Script Agency: City of Mesa
// Script Description:  
//		Gets the document list for the capId.
//      For ASB events. getDocs() will call this function if called
//      in an ASB event.
// 
//==================================================================*/

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