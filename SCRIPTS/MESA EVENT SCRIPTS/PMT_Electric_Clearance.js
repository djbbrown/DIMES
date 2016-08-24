/*===================================================================
// Script Number: 103
// Script Name: PMT_Electric_Clearance.js
// Script Description: Send an email when Electrical Final inspection is resulted with “Approved 
// - Utility Clearance Required” AND the Clearance Date in the ASIT is the current date.
// Script Run Event: ISRA
// Script Parents:ISRA;Pemtits!Online!~!~
// PMT16-00392 For testing
// Version   |Date      |Engineer         |Details
//  1.0      |08/18/16  |Steve Veloudos   |Initial Release
/*==================================================================*/

try {
      var FromEmail = "noreply@mesaaz.gov";
      var vEParams = aa.util.newHashtable();
      var ComDesc = workDescGet(capId);
      var Url = lookup("Agency_URL","ACA"); 
      var DataTable;

      //Get the Inspection results
      var getInspectionsResult = aa.inspection.getInspections(capId);

      //Test if script can get an inspection
      if (getInspectionsResult.getSuccess()) 
      {
	    var inspectionScriptModels = getInspectionsResult.getOutput();
	    var inspectionScriptModel = null;

        //Check if Inspection is Electrical Final 

        //Check if Approved and ASIT Clearance Date is the current date


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
      
      //Break Out each element of the address
      var hseNum = addrArray[0].getHouseNumberStart();
      var streetDir = addrArray[0].getStreetDirection();
      var streetName = addrArray[0].getStreetName();
      var streetSuffix = addrArray[0].getStreetSuffix();
      var zip = addrArray[0].getZip();
 
      var theAddress = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
      }

      addParameter(vEParams,"$$RECORDID$$",capIDString);
      addParameter(vEParams,"$$Address$$",theAddress);
      addParameter(vEParams,"$$URL$$",Url);
      addParameter(vEParams,"$$DATATABLE$$",DataTable);

      sendNotification(FromEmail, ToEmail, "", "ENF_RECORD_OPENED", vEParams, null, capId);
 
    }
catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }