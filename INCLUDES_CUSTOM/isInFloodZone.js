//*===================================================================
//
// Script Name: isInFloodZone.js 
// Script Developer: Vance Smith
// Script Agency: City of Mesa
// Script Description:  
//		Checks if the parcel/address is in a flood zone
// 
//==================================================================*/

function isInFloodZone()
{
    var tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    if (tagFieldArray && tagFieldArray.length > 0) 
    {
        if (IsStrInArry("FLDP", tagFieldArray)) 
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}