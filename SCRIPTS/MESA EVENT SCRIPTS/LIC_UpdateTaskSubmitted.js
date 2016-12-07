if(publicUser){
	if (isTaskActive("License Application")){
		updateTask("License Application","Submitted","Updated by Script","");
	}
	if (isTaskActive("Application Intake")){
		updateTask("Application Intake","Submitted","Updated by Script","");
	}
}