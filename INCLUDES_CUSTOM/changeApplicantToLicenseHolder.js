function changeApplicantToLicenseHolder(fromCType, toCType, licCapId) {

	var conToChange = null; 
	consResult = aa.people.getCapContactByCapID(licCapId);
	if (consResult.getSuccess()) {
		logDebug("Starting "+fromCType+" to "+toCType);
		cons = consResult.getOutput();
		for (thisCon in cons) {
			if (cons[thisCon].getCapContactModel().getPeople().getContactType() == fromCType) { 
				conToChange = cons[thisCon].getCapContactModel(); 
				p = conToChange.getPeople(); 
				contactAddressListResult = aa.address.getContactAddressListByCapContact(conToChange);
				if (contactAddressListResult.getSuccess()) 
					contactAddressList = contactAddressListResult.getOutput();
				convertedContactAddressList = convertContactAddressModelArr(contactAddressList);
				p.setContactType(toCType); 
				p.setContactAddressList(convertedContactAddressList);
				conToChange.setPeople(p); 
				conToChange.setPrimaryFlag("Y");
				aa.people.editCapContactWithAttribute(conToChange);
			}
		}
	}
}