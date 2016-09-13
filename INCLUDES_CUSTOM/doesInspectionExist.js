//*===================================================================
//
// Script Name: doesInspectionExist.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Will return true if the inspection exists. Will return false
//      if it does not. Does not check inspection status.
// 
//==================================================================*/
function doesInspectionExist(inspectionType)
{
	var inspResultObj = aa.inspection.getInspections(capId);
	if (inspResultObj.getSuccess())
	{
		var inspList = inspResultObj.getOutput();
		for (xx in inspList)
		{
			if (String(inspectionType).equals(inspList[xx].getInspectionType()))
			{
				return true;
			}
		}
	}
	return false;
}