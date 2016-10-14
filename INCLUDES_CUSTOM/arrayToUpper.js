function arrayToUpper(aArray){
	toUpper = function(x){ 
		  return x.toUpperCase();
	};
	aArray = aArray.map(toUpper);
	return aArray;
}