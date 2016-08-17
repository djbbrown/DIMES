/*===================================================================
// Script Number: 39
// Script Name: ENF_Non_Violation.js
// Script Description: Send an email to the complainant when Inpection - Status Drop Down is No Violation
// Script Run Event: ISRA
// Script Parents:ISRA;Enforcement!Case!~!~
// Version   |Date      |Engineer         |Details
//  1.0      |08/17/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var somevalue;
      var FromEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var Url = lookup("Agency_URL","ACA");
      var InspectionDate;
      var CoName;
      var CoEmail;
      var CoPhone;
      var InspectionNotes;

      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	var inspectionScriptModels = getInspectionsResult.getOutput();
	var inspectionScriptModel = null;
        
        //Iterate through the inspections & look for No Violation
	for (inspectionScriptModelIndex in inspectionScriptModels)
           {
		inspectionScriptModel = inspectionScriptModels[inspectionScriptModelIndex];
		if (inspectionScriptModel.getInspectionStatus().toUpperCase() == "NO VIOLATION")
		 {
                   //Get the Inpection Date
                    var thedate = inspectionScriptModel.getInspectionStatusDate();
                    var d =   Date(thedate.getMonth() + "/" + thedate.getDayOfMonth() + "/" + thedate.getYear());
                    var dformat = d.getMonth() + 1 +"/" + d.getDate()+"/" + d.getFullYear() + " ";
                    var hour = d.getHours() - (d.getHours() >= 12 ? 12 : 0);
                    var period = d.getHours() >= 12 ? ' PM' : ' AM';
                    InspectionDate = dformat + hour + ":" + d.getMinutes() + period;

                   //Get the Inpection Notes
                   InspectionNotes = inspectionScriptModel.getInspection().getResultComment();
                   
                   //Get the Code Officer Info
                   var CoObject = aa.person.getUser(inspectionScriptModels[inspectionScriptModelIndex].getInspector().getFirstName(),inspectionScriptModels[i].getInspector().getMiddleName(),inspectionScriptModels[i].getInspector().getLastName()).getOutput();
                   var FirstName = CoObject.getFirstName();
                   var MidName = CoObject.getMiddleName();
                   var LastName = CoObject.getLastName();
		   CoName = FirstName;
	           if(MidName != null)
                      {
                      CoName = CoName + " " + MidName;
                      }
                    CoName = CoName + " " + LastName;
                    CoEmail = CoObject.getEmail();
                    CoPhone = CoObject.getPhoneNumber();
                  
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
                      addParameter(vEParams,"$$URL$$",Url);
                      addParameter(vEParams,"$$CodeOfficerName$$",CoName);
                      addParameter(vEParams,"$$CodeOfficerPhone$$",CoPhone);
                      addParameter(vEParams,"$$CodeOfficerEmail$$",CoEmail);
                      addParameter(vEParams,"$$InspectionDate$$",InspectionDate);
                      addParameter(vEParams,"$$InspectionNotes$$",InspectionNotes);

                     //If email has a value send email
                     if (ToEmail != "")
                     {
                      sendNotification(FromEmail, ToEmail, "", "ENF_NON_VIOLATION_ON_RECORD", vEParams, null, capId);
                     }

                     } //End if Cap Sucess

              } //End of No Violation

       }//End of For Loop for inspections

      } //End of inspection results sucessful


    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }