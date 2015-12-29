var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var PreAdoption = new keystone.List('PreAdoption', {
	nocreate: true,
	noedit: false
});

PreAdoption.add({
	names: { type: String, required: true, label: 'Applicants' },
	address: { type: String, required: true },
	phone: { type: String, required: true },
	alternateNumber: { type: String },
	email: { type: Types.Email, required: true },
	employment: { type: String, required: true },
	partnerEmployment: { type: String, required: true },
	schedule: { type: String, required: true },
	leftAlone: { type: String, required: true },
	agreeable: { type: String, required: true },
	responsibility: { type: String, required: true },
	dander: { type: String, required: true },
	danderCare: { type: String },
	crated: { type: String },
	travel: { type: String },
	travelArrangements: { type: String },
	vetinary: { type: String, required: true },
	vetinaryContact: { type: String, required: true },
	vetinaryPastPets: { type: String, required: true },
	references: { type: String, required: true },

	homeType: { type: Types.Select, options: [
		{ value: 'house', label: "single dwelling (house)" },
		{ value: 'apartment', label: "apartment" },
		{ value: 'townhouse', label: "townhouse" }
	] },

	rentOwn: { type: String, required: true },
	pool: { type: String, required: true },
	poolFencing: { type: String },
	mainroad: { type: String, required: true },
	neighbors: { type: String, required: true },
	landlordAllow: { type: String },
	landlord: { type: String },
	fencing: { type: String, required: true },
	fenceType: { type: String },
	fenceAttached: { type: String },
	fenceHeight: { type: String },
	fenceSurround: { type: String },
	gates: { type: String },
	yardArea: { type: String },
	fenceGoodRepair: { type: String },
	fenceUnder: { type: String },
	exercise: { type: String },
	ownershipCosts: { type: String, required: true },
	afford: { type: String, required: true },
	breed1: { type: String },
	age1: { type: String },
	sex1: { type: String },
	spayed1: { type: String },
	had1: { type: String },
	breed2: { type: String },
	age2: { type: String },
	sex2: { type: String },
	spayed2: { type: String },
	had2: { type: String },
	breed3: { type: String },
	age3: { type: String },
	sex3: { type: String },
	spayed3: { type: String },
	had3: { type: String },
	breed4: { type: String },
	age4: { type: String },
	sex4: { type: String },
	spayed4: { type: String },
	had4: { type: String },
	additionalPets: { type: String, },
	dogBreedHandling: { type: String, required: true },
	experienced: { type: String, required: true },
	familiar: { type: String, required: true },
	lookingFor: { type: String, required: true },
	qualities: { type: String },
	crating: { type: String, required: true },
	crate: { type: String, required: true },
	objections: { type: String, required: true },
	beforeAfterPlacement: { type: String, required: true },
	mainAdopter: { type: String, required: true },

	createdAt: { type: Date, default: Date.now }
});

PreAdoption.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
})

PreAdoption.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

PreAdoption.schema.methods.sendNotificationEmail = function(callback) {

	var enqiury = this;

	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

		if (err) return callback(err);

		new keystone.Email('pre-adoption-notification').send({
			to: admins,
			from: {
				name: 'LuvnPupz',
				email: 'contact@luvnpupz.org'
			},
			subject: 'New Pre Adoption Application for LuvnPupz',
			enquiry: enqiury
		}, callback);

	});

}

PreAdoption.defaultSort = '-createdAt';
PreAdoption.defaultColumns = 'name, email, enquiryType, createdAt';
PreAdoption.register();
