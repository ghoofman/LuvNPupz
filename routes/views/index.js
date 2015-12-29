var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.data = {};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Page')
			.model.findOne({ title: 'About' });

		q.exec(function(err, results) {
			if(err) { next(err); return; }
			if(results) {
				locals.data.content = results.content;
			} else {
				locals.data.content = '';
			}
			next(err);
		});

	});

	// Render the view
	view.render('index');

};
