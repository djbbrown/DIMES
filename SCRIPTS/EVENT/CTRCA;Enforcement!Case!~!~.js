//if submitted in ACA call ENF_Record_Opened script so final record id is passed and not temporary one.
if (publicUser){
	include("ENF_Record_Opened");
}