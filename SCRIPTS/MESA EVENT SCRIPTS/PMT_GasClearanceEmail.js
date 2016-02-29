/*===================================================================
// Script Number: 102
// Script Name: PMT_GasClearanceEmail.js 
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: When Gas Pipe Final inspection is resulted with “Approved - Utility Clearance Required”
// …send email to Company named in Utility Service Info ASIT, Clearance To. 
// Script Run Event: IRSA
// Script Parents:
//  IRSA:Permits/Online/NA/NA
//	IRSA:Permits/Residential/NA/NA
//	IRSA:Permits/Residential/Mobile Home/NA/NA
//	IRSA:Permits/Commercial/NA/NA
/*==================================================================*/



var vEParams = aa.util.newHashtable(); 
addParameter(vEParams,"%%RECORD ID%%",capIDString);

tmpTable = loadASITable("UTILITY SERVICE INFORMATION");
countCityOfMesa = countASITRows(tmpTAble, "Clearance To", "City of Mesa");
countSouthwestGas = countASITRows(tmpTAble, "Clearance To", "Southwest Gas");

if (countCityOfMesa > 0 ) {
	addParameter(vEParams,"%%CLEARANCE TO%%",);
	emailAddress = "rgill@accela.com";
	//emailAddress = "customerinfobillingops@mesaaz.gov";
	sendNotification("", emailAddress, "", "GAS CLEARANCE", vEParams, null, capId);
}
	if (countSouthwest > 0) {
		addParameter(vEParams,"%%CLEARANCE TO%%",);
		emailAddress = "rgill@accela.com";
		//emailAddress = "gasinspectiontag@swgas.com";
		sendNotification("", emailAddress, "", "GAS CLEARANCE", vEParams, null, capId);
		}