var fromEmail = 'noreply@MesaAz.gov';
if (inspType == "Gas Pipe Final" && inspResult == "Approved - Utl Clearance Req"){
	var vEParams = aa.util.newHashtable();
	var tmpTable = loadASITable("UTILITY SERVICE INFORMATION");
	countCityOfMesa = countASITRows(tmpTable, "Clearance To", "City of Mesa");
	countSouthwestGas = countASITRows(tmpTable, "Clearance To", "Southwest Gas");

	if(countCityOfMesa>0){
		addParameter(vEParams,"$$RECORD ID$$",capIDString);
		addParameter(vEParams,"$$CLEARANCE TO$$","City of Mesa");
		emailAddress = 'Lauren.Lupica@MesaAZ.gov';
		//emailAddress = 'customerinfobillingops@mesaaz.gov';
		sendNotification(fromEmail, emailAddress, "", "GAS CLEARANCE", vEParams, null, capId);
	}
	if(countSouthwestGas>0){
		addParameter(vEParams,"$$RECORD ID$$",capIDString);
		addParameter(vEParams,"$$CLEARANCE TO$$","Southwest Gas");
		emailAddress = 'Lauren.Lupica@MesaAZ.gov';
		//emailAddress = 'gasinspectiontag@swgas.com';
		sendNotification(fromEmail, emailAddress, "", "GAS CLEARANCE", vEParams, null, capId);
		}
}