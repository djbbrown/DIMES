/*===================================================================
// Script Number: xxx
// Script Name: ACA_PageFlow_Outside_City_Limits.js
// Script Developer: Steve Allred
// Script Agency: Mesa
// Script Description: Prevent the user from creating a permit for a property that is not within city limits.
// Script Run Event: ASB
// Script Parents:
//		ASB;Permits!~!~!~
//            
/*==================================================================*/

/* intellisense references */
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_FUNCTIONS_ASB-80100.js" />
/// <reference path="../../INCLUDES_ACCELA_GLOBALS-80100.js" />
/// <reference path="../../INCLUDES_CUSTOM.js" />

try {
    var tInfo = getGISInfoArray("Accela/Accela_Base", "NonMesaJurisdictionShaded", "NAME");
    var rowCount = tInfo.length;
    var x = 0;
    var GisValue;
    var GisFlag = 0;

    //Iterate and look for 
    for (x=0;x<=(rowCount-1);x++)
    {
        GisValue = tInfo[x];
        if(GisValue == "MARICOPA CO")
        {
            GisFlag = 1;
        }
    }
        
	logDebug("GisFlag = " + GisFlag);

	if(GisFlag == 1)
    {
        if (publicUser) { showDebug=false; }
		showMessage = true;
        comment("A permit cannot be created for a property that is not within Mesa city limits!"); 
        cancel = true;
    }
}

catch 
{
	logDebug("A JavaScript error occurred: " + err.message);
}