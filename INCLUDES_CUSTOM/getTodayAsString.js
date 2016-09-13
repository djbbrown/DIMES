//*===================================================================
//
// Script Name: getTodayAsString.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		returns today as a string (mm/dd/yyy).
// 
//==================================================================*/
function getTodayAsString()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    return mm + '/' + dd + '/' + yyyy;
}