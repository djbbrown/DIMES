/*===================================================================
// Script Number: 101
// Script Name: PMT_Inspection_Added_Manually.js
// Script Developer: Raminder Gill
// Script Agency: Accela
// Script Description: Update ASI "Permit Expiration Date" when an Inspection is scheduled
// Script Run Event: IRSA
// Script Parents:
//    IRSA;Permits!~!~!~
//           
//            
/*==================================================================*/

   
    editAppSpecific("Permit Expiration Date", dateAdd(null, 180) );


