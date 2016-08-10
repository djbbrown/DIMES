var servProvCode=expression.getValue("$$servProvCode$$").value;
var haveConvictions=expression.getValue("CONTACTTPLFORM::LIC_CONTACTS::CONVICTIONS::Do you have any convictions?");
var rowVal=expression.getValue("CONTACTTPLTABLE::LIC_CONTACT::CONVICTIONS::Charge Number");

var totalRowCount = expression.getTotalRowCount();

if((haveConvictions.value!=null && (haveConvictions.value.equalsIgnoreCase('YES') || haveConvictions.value.equalsIgnoreCase('Y') || haveConvictions.value.equalsIgnoreCase('CHECKED') || haveConvictions.value.equalsIgnoreCase('SELECTED') || haveConvictions.value.equalsIgnoreCase('TRUE') || haveConvictions.value.equalsIgnoreCase('ON'))) && totalRowCount< 2){
       haveConvictions.message="Please populate at least one row to the 'Convictions' table";
       expression.setReturn(haveConvictions);
       rowVal.value=String("")
       var rowIndex = expression.getTotalRowCount()-1;
       expression.setReturn(rowVal);
}
