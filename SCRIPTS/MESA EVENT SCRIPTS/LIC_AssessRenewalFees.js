/*===================================================================
// Script Number: 05
// Script Name: LIC_AssessRenewalFees.js
// Script Developer: Michael VanWie
// Script Agency: Mesa
// Script Description: Assess remewal fees when ready to renew
// Script Run Event: WTUA
// Script Parents:
//            WTUA;Licensing!General!~!Renewal
//==================================================================*/

if (matches(wfTask,"Issue License","License Issuance") && wfStatus == "Ready to Issue"){
	if(appTypeArray[2] == "Peddler"){
		var RFreq = AInfo["Renewal Frequency"];

		if(RFreq == 'Quarterly')
		{
			//Quarterly Fee
			if (!feeExists("LIC_03")) addFee("LIC_03","LIC_PEDDLER_APP","FINAL",1,"Y");
		}
		else
		{
			//Annual Fee
			if (!feeExists("LIC_04")) addFee("LIC_04","LIC_PEDDLER_APP","FINAL",1,"Y");
		}
	}
}