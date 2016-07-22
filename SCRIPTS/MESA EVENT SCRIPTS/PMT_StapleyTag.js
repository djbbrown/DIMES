/*===================================================================*/
//  Script Number: 113
//  Script Name: PMT_StapleyTag.js 
//  Script Developer: N. Victor Staggs
//  Script Agency: Woolpert Inc.
//  Script Description: 
//
//    On app submittal:
//
//    if parcel exists in Stapley GIS layer:
//      1. Add Ad-Hoc Wf task Engineering Review 
//      2. Send email notification to steve.ketchum@mesaaz.gov using Stapley Corridor template
//	
//
//  Script Run Event: ASA
//
//  Script Parents:
//
//    ASA: Permits/Commercial/NA/NA - has master script
//    ASA: Permits/Demolition/NA/NA - has master script
//    ASA: Permits/Residential/Mobile Home/NA - has master script
//    ASA: Permits/Residential/NA/NA - Has master script
//    ASA: Permits/Sign/NA/NA - has master script

/*==================================================================*/
showDebug = true;
//  ASA: Permits/Commercial/NA/NA
//  ASA: Permits/Demolition/NA/NA
//  ASA: Permits/Residential/NA/NA
//  ASA: Permits/Sign/NA/NA
if (
    matches("" + appTypeArray[0], "Permits")
        &&
    matches("" + appTypeArray[1], "Commercial", "Demolition", "Residential", "Sign")
        &&
    matches("" + appTypeArray[2], "NA")
        &&
    matches("" + appTypeArray[3], "NA")
) {
    try{
        AddStapleyParcelAdHocWorkflow();
    }catch(exception){
        logDebug("JavaScript exception caught in PMT_StapleyTag: " + exception.message);
    }
}

//  ASA: Permits/Residential/Mobile Home/NA
if (
    matches("" + appTypeArray[0], "Permits")
        &&
    matches("" + appTypeArray[1], "Residential")
        &&
    matches("" + appTypeArray[2], "Mobile Home")
        &&
    matches("" + appTypeArray[3], "NA")
) {
    try{
        AddStapleyParcelAdHocWorkflow();
    }catch(exception){
        logDebug("JavaScript exception caught in PMT_StapleyTag: " + exception.message);
    }
}

function AddStapleyParcelAdHocWorkflow() {
    logDebug("Enter AddStapleyParcelAdHocWorkflow()");

    var objectMapper = new org.codehaus.jackson.map.ObjectMapper();
    logDebug("capId: " + objectMapper.writeValueAsString(capId))

    //EXAMPLE TAGS: COMW,COMG,CDBG,SRPE,GHHF
    //TODO: Update this with the tag for the Stapley Corridor
    var targetTag = "CP02";

    var sender = lookup("StapleyCorridorEmailSettings", "Sender");
    logDebug("sender: " + sender);

    var recipient = lookup("StapleyCorridorEmailSettings", "Recipient");
    logDebug("recipient: " + recipient);

    var template = "STAPLEY CORRIDOR";

    var vEParams = aa.util.newHashtable();

    tagFieldArray = getGISInfoArray("Accela/AccelaTAGS", "Accela_TAGS", "Accela_TAGS.TAG");
    logDebug("tagFieldArray: " + tagFieldArray);

    if (tagFieldArray && tagFieldArray.length > 0) {

        for (tIndex in tagFieldArray) {

            thisTag = tagFieldArray[tIndex];

            logDebug("thisTag: " + thisTag);
            logDebug("targetTag: " + targetTag);

            if (thisTag == targetTag) {

                logDebug("Parcel found to be within " + thisTag + ".  Sending email");
                addParameter(vEParams, "$$RECORD ID$$", capId.customID);

                logDebug("Begin calling sendNotification()");
                sendNotification(sender, recipient, "", template, vEParams, null);
                logDebug("End calling sendNotification()");

                logDebug("Begin calling addHocTask()");
                addAdHocTask("WFADHOC_PROCESS", "Engineering Group TBD", "Note: Parcel exists in Stapley Corridor GIS layer");
                logDebug("End calling addHocTask()");
            }
        }
    }

    logDebug("Exit AddStapleyParcelAdHocWorkflow()");
}