/*===================================================================
// Script Number: 054
// Script Name:TRA_TTC_MaintainRelatedRecords.js
// Script Developer: Mong Ward
// Script Agency: Accela
// Script Description: Maintain related records - ROW and UTL Permit numbers - Non-conversion script
// Script Run Event: ASA, ASIUA
// Script Parents:
//	ASA;Transportation!Temporary Traffic Control!~!~
//  ASIUA;Transportation!Temporary Traffic Control!~!~
//
// This is used in conjuction with the following:
// 	// 	TTC_ASSOCIATED WORK.js (Expression)
==================================================================*/
try
{
var rowPermit = AInfo["ROW Permit No."];
var UtlPermit = AInfo["UTL Permit No."];
var associatedPermitType = AInfo["Associated Work Permit Type"];
var getCapROW = aa.cap.getCapID(rowPermit);
var getCapUTL = aa.cap.getCapID(UtlPermit);
//var goodParent = false;


if (associatedPermitType == "None") {
	pArr = getParents("Engineering/*/*/*");
	if (pArr && pArr.length > 0) {
		for (pIndex in pArr) 
			removeParent(pArr[pIndex].getCustomID());
	}
}

if (associatedPermitType == "ROW - Right-of-Way") 
	{
	if (getCapROW.getSuccess())
	{
    var seCapId = aa.cap.getCapID(rowPermit).getOutput();
    
    var seCapTypeStr = aa.cap.getCap(seCapId).getOutput().getCapType().toString();
    //comment("seCapTypeStr: " + seCapTypeStr);
    
    if (seCapTypeStr == "Enginnering/Right of Way/*/*")
        
    //{
      goodParent = true;
    //}   

    //if (goodParent)
    {
      addParent("" + rowPermit);
    }

	}
	pArr = getParents("Enginnering/Utilities/*/*");
	if (pArr && pArr.length > 0) 
	{
		for (pIndex in pArr) 
			removeParent(pArr[pIndex].getCustomID());
	}
	}

if (associatedPermitType == "UTL - Utility") 
	{
	if (getCapUTL.getSuccess())
	{
    var seCapId = aa.cap.getCapID(UtlPermit).getOutput();
    
    var seCapTypeStr = aa.cap.getCap(seCapId).getOutput().getCapType().toString();
    //comment("seCapTypeStr: " + seCapTypeStr);
    
    if (seCapTypeStr == "Enginnering/Utilities/*/*")
        
    //{
      goodParent = true;
    //}   

    //if (goodParent)
    {
      addParent("" + UtlPermit);
    }
	}
    pArr = getParents("Enginnering/Right of Way/*/*");
	if (pArr && pArr.length > 0) 
	{
		for (pIndex in pArr) 
			removeParent(pArr[pIndex].getCustomID());
	}
		
	}
}
	
catch (err)
{
  logDebug("A JavaScript Error occured: " + err.message);
}





