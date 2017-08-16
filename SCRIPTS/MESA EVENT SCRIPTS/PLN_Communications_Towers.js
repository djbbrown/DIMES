/*===================================================================*/
// Script Number: 226b
// Script Name: PLN_Communications_Towers.js
// Script Description: Send an email if parcel is in Communications Towers GIS layer.   
// Script Run Event: ASA 
// Script Parents: ASA;Planning/Admin Review/NA/NA
//                 ASA;Planning/Board of Adjustment/NA/NA
//                 ASA;Planning/Design Review/NA/NA
//                 ASA;Planning/Planning and Zoning/NA/NA
//                 ASA;Planning/Pre-Submittal/NA/NA
//                 ASA;Planning/Subdivision/NA/NA
//
// Version |Date        |Engineer         |Details
//  1.0    |08/16/2017  |Steve Allred     |Initial Release - copied and modified from PMT_Communications_Towers
/*==================================================================*/

try {
	
  if ( (appMatch("Planning/Admin Review/NA/NA")) ||
	   (appMatch("Planning/Board of Adjustment/NA/NA"))	||
	   (appMatch("Planning/Design Review/NA/NA")) ||
	   (appMatch("Planning/Planning and Zoning/NA/NA")) ||
	   (appMatch("Planning/Pre-Submittal/NA/NA")) ||
	   (appMatch("Planning/Subdivision/NA/NA")) )   
	   {
		
			var FromEmail = "noreply@mesaaz.gov";
			var vEParams = aa.util.newHashtable();
			var ComTowersFlag = 0;
			var ToEmail;
			
			//Get GIS Data
			var tInfo = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
			var rowCount = tInfo.length;
			var x = 0;
			var TagValue;

			//Iterate for GIS Tags
			for (x=0;x<=(rowCount-1);x++)
				{
					TagValue = tInfo[x];
					
					//Check Communications Towers
					if(TagValue == "TWRS")
					{
						ComTowersFlag = 1;
					}
					
				}

			//Send Email For Communications Towers
			if(ComTowersFlag  == 1)  
			{
				priParcelNbr = getPrimaryParcel();
				description = workDescGet(capId); 
				addParameter(vEParams,"$$RECORDID$$",capIDString);
				addParameter(vEParams,"$$PARCELNBR$$",priParcelNbr);
				addParameter(vEParams,"$$DESCRIPTION$$",description);
				ToEmail = lookup("EMAIL_RECIPIENTS","PLN_Communications_Towers");
				sendNotification(FromEmail, ToEmail, "", "PLN_COMMUNICATIONS_TOWERS", vEParams, null, capId);
			}
		}
    }
    catch (err)
    {
      logDebug("A JavaScript Error occured: " + err.message);
    }