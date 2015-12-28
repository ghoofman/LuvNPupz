var keystone = require('keystone'),
	PreAdoption = keystone.list('PreAdoption');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'adopt';
	locals.homeTypes = PreAdoption.fields.homeType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'preadoption' }, function(next) {

		var newPreAdoption = new PreAdoption.model(),
			updater = newPreAdoption.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'names,address,phone,alternateNumber,email,employment,partnerEmployment,schedule,leftAlone,agreeable,responsibility,dander,danderCare,crated,travel,travelArrangements,vetinary,vetinaryContact,vetinaryPastPets,references,homeType,rentOwn,pool,poolFencing,mainroad,neighbors,landlordAllow,landlord,fencing,fenceType,fenceAttached,fenceHeight,fenceSurround,gates,yardArea,fenceGoodRepair,fenceUnder,exercise,ownershipCosts,afford,breed1,age1,sex1,spayed1,had1,breed2,age2,sex2,spayed2,had2,breed3,age3,sex3,spayed3,had3,breed4,age4,sex4,spayed4,had4,additionalPets,dogBreedHandling,experienced,familiar,lookingFor,qualities,crating,crate,objections,beforeAfterPlacement,mainAdopter',
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

	view.render('preadoption');

};
