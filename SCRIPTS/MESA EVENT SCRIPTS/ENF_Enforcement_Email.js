/*===================================================================
// Script Number: 37
// Script Name: ENF_Enforcement_Email.js
// Script Description: Send an email  If the ASI field  Notify Complainant is Yes and an inspection occured send only the last inspection info
// Script Run Event: ISRA
// Script Parents:ISRA;Enforcement!Case!~!~
// Testing Record: COD16-00084
// Version   |Date      |Engineer         |Details
//  1.0      |08/30/16  |Steve Veloudos   |Initial Release 
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var InspectionDate;
      var CoEmail;
      var CoPhone;
      var InspectionNotes;

//Check Notify
if(AInfo["Notify Complainant"] == "Yes")
{
      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	    var inspectionScriptModels = getInspectionsResult.getOutput();
	    var inspectionScriptModel = null;
        var inspectionScriptModels2 = [];
        //Iterate through the inspections & look for status Not Eq Scheduled
	        for (inspectionScriptModelIndex in inspectionScriptModels)
           {
		    inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
            if(inspectionScriptModel.getInspectionStatus() !="Scheduled")
                {
                
		        //Push completed inspections (nor scheduled) into new array inspectionScriptModels2
                inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
                inspectionScriptModels2.push(inspectionScriptModel);
                }
            }
                 
                    //Get the Inspection Date of last inspection completed
                    var thedate = inspectionScriptModels2[0].getInspectionDate();
                    var InDate =   new Date(thedate.getMonth() + "/" + thedate.getDayOfMonth() + "/" + thedate.getYear());
                    InspectionDate = jsDateToASIDate(InDate);

                   //Get the Inspection Notes
                   InspectionNotes = inspectionScriptModels2[0].getInspection().getResultComment();

                    var CoObject = aa.person.getUser( inspectionScriptModels2[0].getInspector().getFirstName(),inspectionScriptModels2[0].getInspector().getMiddleName(),inspectionScriptModels2[0].getInspector().getLastName()).getOutput();
                    CoEmail = CoObject.getEmail();
                    CoPhone = CoObject.getPhoneNumber();

      } //End of Inspection sucess 
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
      
                      //Break Out each element of the address
                      var hseNum = addrArray[0].getHouseNumberStart();
                      var streetDir = addrArray[0].getStreetDirection();
                      var streetName = addrArray[0].getStreetName();
                      var streetSuffix = addrArray[0].getStreetSuffix();
                      var zip = addrArray[0].getZip();
 
                      var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
                      }

                      //Get the contact info
                      var tInfo = getContactArray();
                      var rowCount = tInfo.length;
                      var x = 0;

                      //Get Email of Complainant
                          for (x=0;x<=(rowCount-1);x++)
                              {
                                  somevalue = tInfo[x]["contactType"];
                                  if(somevalue == "Complainant" )
                                  {
                                  var ToEmail = tInfo[x]["email"];
                                  }
                              }
                      //Add Params
                      addParameter(vEParams,"$$RECORDID$$",capIDString);
                      addParameter(vEParams,"$$Address$$",theAddress);
                      addParameter(vEParams,"$$CodeOfficerPhone$$",CoPhone);
                      addParameter(vEParams,"$$CodeOfficerEmail$$",CoEmail);
                      addParameter(vEParams,"$$InspectionDate$$",InspectionDate);
                      addParameter(vEParams,"$$InspectionNotes$$",InspectionNotes);

                     //If email has a value send email
                     if (ToEmail != "")
                     {
                      sendNotification(FromEmail, ToEmail, "", "ENF_ONGOING_STATUS", vEParams, null, capId);
                     }


        }//End Notify Complainant
    }
 
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }