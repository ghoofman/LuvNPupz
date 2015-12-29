var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Page = new keystone.List('Page', {
	nocreate: false,
	noedit: false,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Page.add({
	title: { type: String },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	createdAt: { type: Date, default: Date.now }
});

Page.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
})

Page.schema.post('save', function() {

});

Page.defaultSort = '-createdAt';
Page.defaultColumns = 'title, createdAt';
Page.register();
