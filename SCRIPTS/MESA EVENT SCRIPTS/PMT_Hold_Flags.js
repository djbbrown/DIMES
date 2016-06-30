 /*===================================================================
// Script Number: 99
// Script Name: PMT_Hold_Flags.js 
// Script Developer: Deanna Hoops
// Script Agency: Accela
// Script Description: add conditions to record based on GIS attribute
// Script Run Event: WTUA
// Script Parents: WTUA:Permits/*/*/*
/*==================================================================*/
tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    
	if (tagFieldArray && tagFieldArray.length > 0) {
	   for (tIndex in tagFieldArray) {
			thisTag = tagFieldArray[tIndex];
			logDebug(thisTag);
			switch ("" + thisTag) {
				case "LGAC": addStdCondition("Building Permit", "Large Acreage - NOI"); addStdCondition("Building Permit", "Large Acreage - Dust Control"); 
					break;
				case "SMAC":  addStdCondition("Building Permit", "Small Acreage - Dust Control");
					break;
				case "CITR":  addStdCondition("Building Permit", "Citrus Grove Sub Area");
					break;
				case "SCAL":  addStdCondition("Building Permit", "Scalloped Street Assessment");
					break;
				case "FALC":  addStdCondition("Building Permit", "Falcon Field");
					break;
				case "PMGA":  addStdCondition("Building Permit", "PMG Airport Approval Required");
					break;
				case "PMGU":  addStdCondition("Building Permit", "PMG Fire Utility Fee");
					break;
				case "DSUP":  addStdCondition("Building Permit", "Desert Uplands");
					break;
				case "HIST":  addStdCondition("Building Permit", "Historical District");
					break;
				case "OUTM":  addStdCondition("Building Permit", "Outside City of Mesa"); 
					break;
				default: break;
			}
		}
	}	
