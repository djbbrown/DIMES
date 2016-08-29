/*===================================================================*/
// Script Number: 148
// Script Name: PMT_New_CM_Sewer.js
// Script Description: Send an email if Parcel located in COM Sewer GIS layer and Building Inspection is resulted as Approved or Partial Approval. 
// Script Run Event: IRSA
// Script Parents: IRSA;Permits/Residential/NA/NA
// IRSA;Permits/Commercial/NA/NA
// Testing record:  PMT16-00480
// Version   |Date      |Engineer         |Details
//  1.0      |08/29/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
    var FromEmail = "noreply@mesaaz.gov";
    var vEParams = aa.util.newHashtable();
    var ToEmail = lookup("EMAIL_RECIPIENTS","Billing_Info");
    var InComSewer = 0;
    var BInspection = 0;
    var ProposedUse;
    var TofWork;
    var InsName;
    var InsDate;

    //Get GIS Data
    var tInfo = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    var rowCount = tInfo.length;
    var x = 0;

    //Iternate for GIS Tags
    for (x=0;x<=(rowCount-1);x++)
        {
            TagValue = tInfo[x];
            
            //Check For COM Sewer
            if(TagValue == "COMS")
            {
                InComSewer = 1;
            }
        }

      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	    var inspectionScriptModels = getInspectionsResult.getOutput();
	    var inspectionScriptModel = null;

            //Check if Inspection is Sewer To Building 
            for (inspectionScriptModelIndex in inspectionScriptModels)
                {
                    inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
                    if (inspectionScriptModel.getInspectionType().toUpperCase() == "SEWER TO BUILDING")
                    {
                       //Check for APPROVED or PARTIAL APPROVAL
                       if (inspectionScriptModel.getInspectionStatus().toUpperCase() == "APPROVED")
                       {
                        
                        //Need to get Inspection date and Inspectors name
                        var CoObject = aa.person.getUser(inspectionScriptModels[inspectionScriptModelIndex].getInspector().getFirstName(),inspectionScriptModels[inspectionScriptModelIndex].getInspector().getMiddleName(),inspectionScriptModels[inspectionScriptModelIndex].getInspector().getLastName()).getOutput();
                        var FirstName = CoObject.getFirstName();
                        var MidName = CoObject.getMiddleName();
                        var LastName = CoObject.getLastName();
		                InsName = FirstName;
	                    
                        if(MidName != null)
                            {
                            InsName = InsName + " " + MidName;
                            }
                            InsName = InsName + " " + LastName;
                          
                        //InsDate
                         var InsDateObj =inspectionScriptModels[inspectionScriptModelIndex].getScheduledDate();
                         var InspMonth = InsDateObj.getMonth();
                         var InspDay =  InsDateObj.getDayOfMonth(); 
                         var InspYear =  InsDateObj.getYear();
                         InsDate = InspMonth +"/" + InspDay + "/" + InspYear;
                       }
                        //Set building inpection flag
                        BInspection = 1;
                    }
                }
                //Get the address
                var capAddResult = aa.address.getAddressByCapId(capId);
                if (capAddResult.getSuccess())
                        {
                        var addrArray = new Array();
                        var addrArray = capAddResult.getOutput();
                        if (addrArray.length==0 || addrArray==undefined)
                            {
                            logDebug("The current CAP has no address.")
                            }
                        else
                            {
                            //Break Out each element of the address
                            var hseNum = addrArray[0].getHouseNumberStart();
                            var streetDir = addrArray[0].getStreetDirection();
                            var streetName = addrArray[0].getStreetName();
                            var streetSuffix = addrArray[0].getStreetSuffix();
                            var city = addrArray[0].getCity();
                            var state = addrArray[0].getState();
                            var zip = addrArray[0].getZip();
                            var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix + " " + city + ", " + state + " " + zip;
                            }
                        }
                //Get remaining values
                ProposedUse = AInfo["Proposed Use"];
                TofWork = AInfo["Type of work"];
      }

      //Add parameters
      addParameter(vEParams,"$$RECORDID$$",capIDString);
      addParameter(vEParams,"$$ADDRESS$$",theAddress);
      addParameter(vEParams,"$$USE$$",ProposedUse);
      addParameter(vEParams,"$$TYPEOFWORK$$",TofWork);
      addParameter(vEParams,"$$NAME$$",InsName);
      addParameter(vEParams,"$$DATE$$",InsDate);
      
      //Check and send email
      if(BInspection == 1 &&  InComSewer == 1)
      {
      sendNotification(FromEmail, ToEmail, "", "PM_NEW_CM_SEWER", vEParams, null, capId); 
      }   
    }
    catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }