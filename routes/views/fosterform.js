var keystone = require('keystone'),
	Foster = keystone.list('Foster');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'foster';
	locals.homeTypes = Foster.fields.homeType.ops;
	locals.fosterKeepTypes = Foster.fields.fosterKeep.ops;
	locals.fosterSleepTypes = Foster.fields.fosterSleep.ops;
	locals.spendTimeTypes = Foster.fields.spendTime.ops;
	locals.commitToFosteringTypes = Foster.fields.commitToFostering.ops;
	locals.vetinaryTypes = Foster.fields.vetinaryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'fosterform' }, function(next) {

		var foster = new Foster.model(),
			updater = foster.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name,secondaryCareTakerName,address,phone,alternateNumber,secondaryCaretakerNumber,bestTimeToContact,email,employment,partnerEmployment,schedule,leftAlone,peopleLiving,agreeable,vetinaryHas,vetinary,vetinaryType,vetinaryEmergency,fullName1,phone1,address1,known1,fullName2,phone2,address2,known2,homeType,rentOwn,pool,poolFencing,mainroad,neighbors,landlordAllow,landlord,fencing,fenceType,fenceAttached,fenceHeight,fenceSurround,gates,yardArea,fenceGoodRepair,fenceUnder,exercise,breed1,age1,sex1,spayed1,had1,breed2,age2,sex2,spayed2,had2,breed3,age3,sex3,spayed3,had3,breed4,age4,sex4,spayed4,had4,additionalPets,vaccinations,react,obedience,medicalExperience,travel,notAvailable,notHome,whyFoster,commitToFostering,spendTime,crateTraining,haveCrate,fosterSleep,fosterKeep,awareAdultUnknown,experienced,experiencedAccomplished,mayChewDigBarkJump,workWithObedience,acceptRisk,supervise,typesOfFoster,countOfFoster,preferredActivityLevel,levelOfExperience,mainAdopter',
			errorMessage: 'There was a problem submitting your pre adoption application:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});

	});

	view.render('fosterform');

};
