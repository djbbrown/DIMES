/*===================================================================
// Script Number: 69
// Script Name: PLN_Gross_Site_Size
// Script Developer: MaryRose Schultz
// Script Agency: (Mesa)
// Script Description: Two EBs to set the ASI fields "Gross Site Size (sq ft)  and "Gross Site Size (acres). 
//                     Gross Site Size (sqft) equals Gross Site Size (acres) * 43560). 
//                     Gross Site Size (acres) = Gross Site Size (sqft)/ 43560)
// Script Run Event: 
// Script Parents:
//            Planning/Application/*/*
//            Planning/Project/Annexation/NA
//            Planning/Applications/Design Review/NA
//            Planning/Hearing/Board of Adjustment/NA 
//            Planning/General Plan Amendment – Major/NA/NA
//            Planning/Planning and Zoning/NA/NA
//            ASA;Planning!Group Home-Daycare!Application!NA  (example)
//            ASA;Licensing!General!ParkAndSwap!NA  (example)
/*==================================================================*/
var servProvCode=expression.getValue("$$servProvCode$$").value;
var variable0=expression.getValue("ASI::SITE DATA::Gross Site Size (acres)");
var variable1=expression.getValue("PARTPL::PARCEL INFORMATION::SIZE(ACRES)");
var variable2=expression.getValue("ASI::SITE DATA::Gross Site Size (sqft)");
var TotalAcres = number("TotalAcres") + ("PARTPL::PARCEL INFORMATION::SIZE(ACRES)") ;



    

        if variable1.value!=null && variable1.value*1==toPrecision(variable1.getValue()
             TotalAcres = TotalAcres();
             continue

//if (wfTask.equals("License Application") && wfStatus.equals("Received")) {
//    // set ASI field
//	editAppSpecific("Administrative Review Due", dateAdd(null, 10))
//}

//if (inspType == "Initial Inspection" && inspResult == "In Violation") {
		
//	var inspInterval = AInfo["Inspection Interval"];
//	var daysOut = 14;
//	if (inspInterval == "10 Days")
//    daysOut = 10;
//if (inspInterval == "7 Days")
//    daysOut = 7;
//if (inspInterval == "3 Days")
//    daysOut = 5;
	
//scheduleInspection("Follow-Up Inspection", daysOut, "ADMIN", null, "ADMIN");
//}


//var parcel = "";
//var v_b1-parcel_area = "";
//var site = "MESA";
//var v_b1_Per_ID1 = "REC15";
//var v_b1_Per_ID2 = "00000";
//var v_b1_Per_ID3 = "00067"; 

//var B3ParcelResult = aa.parcel.getParceListForAdmin(parcel, b1_parcel_area);


//if(B3Parcel.getSuccess())
//    aa.print("There is parcel info.")
//aa.print("B1-Parcel_area")
//else
//aa.print("There is no parcel info.");

	//	if(variable0.value!=null && variable0.value*1==toPrecision(variable1.getValue() * 1 *43560) && variable2.value!=null && variable2.value*1==toPrecision(variable1.getValue() * 1 /43560)){

	//		variable1.readOnly=true;
	//	expression.setReturn(variable1);
	//}else{ 
	//	variable1.readOnly=false;
	//	expression.setReturn(variable1);
	//}
