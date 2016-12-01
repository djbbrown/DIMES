/*===================================================================*/
// Script Number: 208b
// Script Name: PMT_PreTreatmentDoc.js
// Script Description: If ASI field Do you need a Grease Trap or Sane/Oil Interceptor is set to a value of Yes then 
// a PreTreatment document is required 
// Script Run Event: ASB, ASIB
// Script Parents: ASB;Permits/Commercial/NA/NA
// Testing record:  PMT16-00427
// Version   |Date      |Engineer         |Details
//  1.0      |11/17/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {

    var GreaseTrapFlag = 0;
    var PreTreatDocFlag = 0;
    var DocCat;

        //Get ASIT value
        var GTrapSoil = AInfo["Is your project an Industrial, Commercial, Manufacturing, Automotive or Restaurant?"];
        if(GTrapSoil == "Yes")
            {
            GreaseTrapFlag = 1;

            //Get documents
            docListArray = getDocumentList();
            for (doc in docListArray)
            {
                DocCat =  docListArray[doc].getDocCategory();
                var DocCatUC = DocCat.toUpperCase();
                
                //Check doc category
                if (DocCatUC == "INDUSTRIAL PRETREATMENT FORM")
                {
                    PreTreatDocFlag  = 1;
                    break; 
                }
            }
			
            //Check flag
            if(GreaseTrapFlag == 1 && PreTreatDocFlag  == 0)
            {
                //Pop up message to user
                showMessage = true;
                comment("A Pretreatment Document is Required");
				comment("What is the PreTreatDocFlag = " + PreTreatDocFlag);
                //Stop the submission
                cancel = true;
            } 
        }
    }
    catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    } 