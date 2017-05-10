function loadParcelArea(){
	var itemCap = capId;
	parcelArea = 0;
	var fcapParcelObj = null;
   	var capParcelResult = aa.parcel.getParcelandAttribute(itemCap, null);
   	if (capParcelResult.getSuccess()){
   		var fcapParcelObj = capParcelResult.getOutput().toArray();
	}
   	else {
     		logDebug("**ERROR: Failed to get Parcel object: " + capParcelResult.getErrorType() + ":" + capParcelResult.getErrorMessage());
	}
  	for (var i in fcapParcelObj)
  		{
			if (fcapParcelObj[i].getParcelArea()){
				parcelArea += parseFloat(fcapParcelObj[i].getParcelArea());
			}
		}
}