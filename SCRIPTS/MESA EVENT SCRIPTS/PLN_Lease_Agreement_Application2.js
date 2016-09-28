/*===================================================================*/
// Script Number: 254
// Script Name: PLN_Lease_Agreement_Application2.js
// Script Description: 	If the Applicant is not the same as the Owner then the document Lease Agreement for Application is required to submit the application
// Script Run Event: ASB;Planning/Group Home/Application/!~.js
// Testing Record: GHAP16-00324 Doc: PLN_GH
// Version   |Date      |Engineer         |Details
//  1.0      |09/28/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
    var FirstName;
    var LastName; 
    var FullName;
    var OwnerName;
    var SameNameFlag = 0;
    var ConType;
    var capOwnerResult;
    var owner;
    var TheOwner;
    var OwnerName;
    var DocFlag = 0;
    var DocCat;
    var docListArray= [];

    //Get the contact info
    var tInfo = getContactArray();
        if (tInfo !== null)
        {
            var rowCount = tInfo.length;
            var x = 0;

            //Get name of applicant
            for (x=0;x<=(rowCount-1);x++)
                {
                    ConType = tInfo[x]["contactType"];
                    if(ConType == "Applicant" )
                    {
                    FirstName = tInfo[x]["firstName"];
                    LastName = tInfo[x]["lastName"];
                    FullName = FirstName.toUpperCase() + " " + LastName.toUpperCase();
                    }
                }
        } 
        //Get Owner Name
        capOwnerResult = aa.owner.getOwnerByCapId(capId);
        if(capOwnerResult !== null)
        {
            if (capOwnerResult.getSuccess()) 
            {
            owner = capOwnerResult.getOutput();
                for (o in owner) 
                {
                    TheOwner = owner[o];
                    //Specify primary owner
                    if (TheOwner.getPrimaryOwner() == "Y") 
                    {
                        OwnerName = TheOwner.getOwnerFullName().toUpperCase();
                        break;	
                    }
                }
            }
        }
        //Compare Names & set flag
        if(FullName == OwnerName)
          {
            SameNameFlag = 1; 
          }
    
    //Get documents
      var docArray = getDocs();
      docListCount = docArray.length;
      
      if (docListCount > 0)
        {
            for(x=0;x<docListCount;x++)
            { 
            if((docArray.get(x) != null)
                && (docArray.get(x).getDocGroup() == "PLN_GH")
                && (docArray.get(x).getDocCategory() == "Lease Agreement for Application")) 
            {
                DocFlag = 1; 
                break; 
            }
            }
        }
                
        //If not the same name and doc was not uploaded stop the submission
        if(SameNameFlag == 0 && DocFlag == 0)
        {
           //Pop up message to user
            showMessage = true;
            comment("You must upload a Lease Agreement for Application document");
           //Stop the submission
            cancel = true;
        }                       
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }

////////////////////////// Functions ///////////////////////
function getDocs()
{
    // works after a record has been submitted.
    // if run during ASB, will return a zero length array
    logDebug("PLN_PlanningAndZoningSitePlanReview - getDocs()");

    var docArray = [];
    var getResult = aa.document.getCapDocumentList(capId ,currentUserID);

    if (getResult.getSuccess()){
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
    var getResult = aa.env.getValue("DocumentModelList");

    if((getResult == null) || (getResult == "")){
        getResult = aa.document.getDocumentListByEntity(capId.toString(),"TMP_CAP");
    }

    if (getResult.getSuccess()){
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