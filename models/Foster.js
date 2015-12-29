var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Foster = new keystone.List('Foster', {
	nocreate: true,
	noedit: false
});

Foster.add({
	name: { type: String, required: true, label: 'Applicant' },
	secondaryCareTakerName: { type: String, label: 'Applicant' },
	address: { type: String, required: true },
	phone: { type: String, required: true },
	alternateNumber: { type: String },
	secondaryCaretakerNumber: { type: String },
	bestTimeToContact: { type: String },
	email: { type: Types.Email, required: true },
	employment: { type: String, required: true },
	partnerEmployment: { type: String, required: true },
	schedule: { type: String, required: true },
	leftAlone: { type: String, required: true },
	peopleLiving: { type: String, required: true },
	agreeable: { type: String, required: true },
	vetinaryHas: { type: String, required: true },
	vetinary: { type: String },
	vetinaryType: { type: Types.Select, options: [
		{ value: 'modern', label: "modern" },
		{ value: 'sophisticated', label: "sophisticated" },
		{ value: 'average', label: "average" },
		{ value: 'simple', label: "simple" },
		{ value: 'notHighTech', label: "not very high-tech" }
	] },
	vetinaryEmergency: { type: String, required: true },


	fullName1: { type: String, required: true },
	phone1: { type: String, required: true },
	address1: { type: String, required: true },
	known1: { type: String, required: true },
	fullName2: { type: String, required: true },
	phone2: { type: String, required: true },
	address2: { type: String, required: true },
	known2: { type: String, required: true },

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

	vaccinations: { type: String, required: true },
	react: { type: String, required: true },
	obedience: { type: String, required: true },
	medicalExperience: { type: String },
	travel: { type: String, required: true },
	notAvailable: { type: String, required: true },
	notHome: { type: String, required: true },
	whyFoster: { type: String, required: true },

	commitToFostering: { type: Types.Select, options: [
		{ value: 'days', label: "days" },
		{ value: 'months', label: "months" },
		{ value: 'other', label: "other" }
	] },

	spendTime: { type: Types.Select, options: [
		{ value: 'inside', label: "inside" },
		{ value: 'outside', label: "outside" },
		{ value: 'both', label: "both" }
	] },

	crateTraining: { type: String, required: true },
	haveCrate: { type: String, required: true },

	fosterSleep: { type: Types.Select, options: [
		{ value: 'onTheBed', label: "on the bed" },
		{ value: 'loose', label: "loose" },
		{ value: 'crate', label: "crate" },
		{ value: 'confined', label: "confined to a specific area" },
		{ value: 'other', label: "other" }
	] },

	fosterKeep: { type: Types.Select, options: [
		{ value: 'house', label: "house" },
		{ value: 'kennel', label: "kennel" },
		{ value: 'yard', label: "yard" },
		{ value: 'exercisePen', label: "exercise pen" },
		{ value: 'crate', label: "crate" },
		{ value: 'confined', label: "confined to a specific area" },
		{ value: 'basementGarage', label: "basement/garage" }
	] },
	awareAdultUnknown: { type: String, required: true },
	experienced: { type: String, required: true },
	experiencedAccomplished: { type: String },
	mayChewDigBarkJump: { type: String, required: true },
	workWithObedience: { type: String, required: true },
	acceptRisk: { type: String, required: true },
	supervise: { type: String, required: true },
	typesOfFoster: { type: String, required: true },
	countOfFoster: { type: String, required: true },
	preferredActivityLevel: { type: String },
	levelOfExperience: { type: String, required: true },

	mainAdopter: { type: String, required: true },

	createdAt: { type: Date, default: Date.now }
});

Foster.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
})

Foster.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Foster.schema.methods.sendNotificationEmail = function(callback) {

	var enqiury = this;

	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

		if (err) return callback(err);

		new keystone.Email('foster-notification').send({
			to: admins,
			from: {
				name: 'LuvnPupz',
				email: 'contact@luvnpupz.org'
			},
			subject: 'New Foster Application for LuvnPupz',
			enquiry: enqiury
		}, callback);

	});

}

Foster.defaultSort = '-createdAt';
Foster.defaultColumns = 'name, email, enquiryType, createdAt';
Foster.register();




//
// responsibility: { type: String, required: true },
// dander: { type: String, required: true },
// danderCare: { type: String },
// crated: { type: String },
// travel: { type: String },
// travelArrangements: { type: String },
