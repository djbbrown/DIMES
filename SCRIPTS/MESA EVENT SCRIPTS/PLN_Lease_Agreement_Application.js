/*===================================================================*/
// Script Number: 254
// Script Name: PLN_Lease_Agreement_Application.js
// Script Description: 	If the Applicant is not the same as the Owner then the document Lease Agreement for Application is required to submit the application
// Script Run Event: ASIUB;Planning!Group Home!Application!NA.js
// Testing Record: GHAP16-00324 Doc: PLN_GH
// Version   |Date      |Engineer         |Details
//  1.0      |09/19/16  |Steve Veloudos   |Initial Release
//  2.0      |09/27/16  |Steve Veloudos   |Adjusted for not stopping submission
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
        docListArray = getDocumentList();
        for (doc in docListArray)
        {
            DocCat =  docListArray[doc].getDocCategory();
            
            //Check doc category
            if(DocCat == "Lease Agreement for Application")
            {
                DocFlag = 1; 
                break; 
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