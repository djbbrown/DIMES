function getParcelAreaFromRefParcel(parParcel)  // optional capID
{
//Mesa - to retrieve the parcel area value from parcel numbers coming from modified function addParcelAndOwnerFromRefAddress()
	try{
		var itemCap = capId
		if (arguments.length > 1)
			itemCap = arguments[1]; // use cap ID specified in args

		var prclObj = aa.parcel.getParceListForAdmin(parParcel, null, null, null, null, null, null, null, null, null);
		if (prclObj.getSuccess() )
		{
			//comment("Got past prclObj...");

			var prclArr = prclObj.getOutput();
			if (prclArr != undefined)
			{
				//aa.print("Got past prclArr in addParcelFromRef()");

				//only selecting the first one because there could be multiple addresses but it really is same parcel number
				var prcl = prclArr[0].getParcelModel();
				var refParcelNumber = prcl.getParcelNumber();
				var refParcelArea = prcl.getParcelArea();

				if(refParcelArea != null)
					return refParcelArea;
				else
					return 0;

			}
		}

	}
	catch (err){
	comment("A JavaScript Error occurred:  Custom Function: addParcelFromRef: " + err.message);
	}
}