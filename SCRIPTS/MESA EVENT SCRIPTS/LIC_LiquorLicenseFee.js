/*===================================================================
// Script Number: 087
// Script Name: LIC_LiquorLicenseFee.js 
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: 
// 		1) On a Licenses/Liquor/Liquor/Application ASA determine which Annual fee to add
//         based on which quarter the Council Agenda Date falls in. Also add an Issuance fee
//
// 		2) On a Licenses/Liquor/Liquor/Renewal ASA assess and invoice the annual liquor license fee 
// 		   
// Script Run Event: ASA
// Script Parents:
// ASA: Licenses/Liquor/Liquor/Application 
// ASA: Licenses/Liquor/Liquor/Renewal 
// 
// Version   |Date       |Engineer          |Details
//  1.0      | --/--/--  | Raminder Gill    | Initial Release
//  1.1      | 12/05/17  | Michael VanWie   | Added proration of Annual fee based on quarter
//  2.0      | 02/08/18  | Michael VanWie   | Modified script to work with ASA for Liquor Application & Renewal
//  2.1		 | 03/19/18  | Michael VanWie   | Updated getQuarter()
/*==================================================================*/

try {
	var valSeries = getAppSpecific("Series Type");
    
    if(appTypeArray[2] == 'Liquor' || appTypeArray[3] == 'Application')
    {
        var agendaDate = '' + getAppSpecific("Council Agenda Date");

		if(agendaDate != '')
		{
			var agendaQuarter = getQuarter(parseDate(agendaDate));
			
			if ((!feeExists("L020")	|| !feeExists("L030") || !feeExists("L031") || !feeExists("L032") || !feeExists("L033") || 
			     !feeExists("L040") || !feeExists("L041") || !feeExists("L042") || !feeExists("L043"))) { 
				
				//Issuance Fee
				if (matches(valSeries, "1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14") && !feeExists("L020")) {
					addFee("L020","LIC_LIQUOR", "FINAL",  1, "N");
				}

				//Annual Fee Series 1-4,8 and 13
				//Added Prorated values - Michael VanWie 12/04/2017
				if ((valSeries== "1" ||  valSeries== "2" || valSeries== "3" || valSeries== "4" || valSeries== "8" || valSeries== "11" || valSeries== "12" || valSeries== "13") 
				&& (!feeExists("L030") && !feeExists("L031") && !feeExists("L032") && !feeExists("L033"))) 
				{
					if(agendaQuarter == 1)
						addFee("L030","LIC_LIQUOR", "FINAL",  1, "N");
					if(agendaQuarter == 2)
						addFee("L031","LIC_LIQUOR", "FINAL",  1, "N");
					if(agendaQuarter == 3)
						addFee("L032","LIC_LIQUOR", "FINAL",  1, "N");
					if(agendaQuarter == 4)
						addFee("L033","LIC_LIQUOR", "FINAL",  1, "N");
				}

				// Annual Fee Series 6,7,8,10,14
				if ((valSeries== "6" ||  valSeries== "7" || valSeries== "9" || valSeries== "10" || valSeries== "14") 
				&& (!feeExists("L040") && !feeExists("L041") && !feeExists("L042") && !feeExists("L043") ))
				{
					if(agendaQuarter == 1)
						addFee("L040","LIC_LIQUOR", "FINAL",  1, "N");
					if(agendaQuarter == 2)
						addFee("L041","LIC_LIQUOR", "FINAL",  1, "N");
					if(agendaQuarter == 3)
						addFee("L042","LIC_LIQUOR", "FINAL",  1, "N");
					if(agendaQuarter == 4)
						addFee("L043","LIC_LIQUOR", "FINAL",  1, "N");
				}
			}
		}
		else
		{
		    logDebug("No annual fee was applied to record because a Council Agenda Date is required.");
		}
    }
    
    if(appTypeArray[2] == 'Liquor' && appTypeArray[3] == 'Renewal')
    {
    	if ((valSeries== "1" ||  valSeries== "2" || valSeries== "3" || valSeries== "4" || valSeries== "8" || valSeries== "11" || valSeries== "12" || valSeries== "13") && !feeExists("L010")) 
		{
			addFee("L010","LIC_LIQ_RNWL", "FINAL",  1, "Y");
		}
		// Annual Fee Series 6,7,8,10,14
		if ((valSeries== "6" ||  valSeries== "7" || valSeries== "9" || valSeries== "10" || valSeries== "14") && !feeExists("L020")) 
		{
			addFee("L020","LIC_LIQ_RNWL", "FINAL",  1, "Y");
		}
    }
}
catch(err)
{
	logDebug("A JavaScript Error occured: " + err.message);
}

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function getQuarter(d) {
    try{
        var q = [1,2,3,4];
        var Qrt = 0;
        var dt = new Date();
		
		//If date provided - use it
        if(d != null) { dt = new Date(d); }
		
		//If we cant parse the provided date warn use and return 0 for checking
		if(dt == "Invalid Date"){
			logDebug('Error in LIC_LiquorLicenseFee -> f() getQuarter(date): Invalid Date provided - ' + d)
			Qrt = 0;
		}
		else {
			Qrt = q[Math.floor(dt.getMonth() / 3)];  
		}
    }
    catch (err){
        logDebug("Error in: LIC_LiquorLicenseFee -> f() getQuarter(date) | " + err.message + " | Stack: " + err.stack);
        Qrt = 0;
	}
	finally {
		return Qrt;
	}
}


