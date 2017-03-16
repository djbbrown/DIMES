/* ID-199: Criteria:
1.	On application submittal or when ASI/ASIT is updated and the record type is Enforcement/Case/NA/NA or Enforcement/Environmental/NA/NA or AnimalControl/Complaint/NA/NA

Execute Script Actions
1.	Load the ASIT "VIOLATION INFORMATION"
2.	For every row in the VIOLATION INFORMATION ASIT, retrieve the value in the column "Citation Number". 
3.	Check if a row exists in the ASIT CITATION CHECKLIST with a column "Citation Number" having the same value. If it does not, then create a new row, populating the "Citation Number" column with the value from the VIOLATION INFORMATION ASIT.
*/
function updateViolationInfoCustomList(){
try{
	logDebug("Executing updateViolationInfoCustomList().");
	if(VIOLATIONINFORMATION.length>0){
		for(row in VIOLATIONINFORMATION){
			var rowFound = false;
			for(wor in  CITATIONCHECKLIST){
				if(""+VIOLATIONINFORMATION[row]["Citation Number"]==""+CITATIONCHECKLIST[wor]["Citation Number"]){
					rowFound=true;
				}
			}
			if(!rowFound && VIOLATIONINFORMATION[row]["Citation Number"].length >0){
				var rowCiteCheck=new Array(); 
				rowCiteCheck["Citation Number"]=VIOLATIONINFORMATION[row]["Citation Number"]; 
				rowCiteCheck["Citation Issued Date"]=""; 
				rowCiteCheck["Citation Issued Time"]=""; 
				rowCiteCheck["Certified Mail Sent Date"]=""; 
				rowCiteCheck["Certified Mail BOLO Date"]=""; 
				rowCiteCheck["Certified Mail Delivered Date"]=""; 
				rowCiteCheck["Certified Mail Returned Date"]=""; 
				rowCiteCheck["Process Server Out Date"]=""; 
				rowCiteCheck["Process Server Served Date"]=""; 
				rowCiteCheck["Affidavit of Service Complete Date"]=""; 
				rowCiteCheck["Defaulted Date"]=""; 
				rowCiteCheck["Hearing Scheduled Date"]=""; 
				rowCiteCheck["Hearing Scheduled Date"]=""; 
				rowCiteCheck["Compliance Hearing Date"]=""; 
				rowCiteCheck["Fee Monitor Date"]=""; 
				rowCiteCheck["Is this a payment plan?"]=""; 
				rowCiteCheck["Amount Due Payment"]=""; 
				rowCiteCheck[" Lien Applied Date"]=""; 
				rowCiteCheck["Collections Date"]=""; 
				rowCiteCheck["Citation Comments"]=""; 
				addToASITable("CITATION CHECKLIST",rowCiteCheck);
			}
		}
	}
}catch (err){
	logDebug("A JavaScript Error occurred: updateViolationInfoCustomList: " + err.message);
}}