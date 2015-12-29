$(function() {
	$('.paypal-donate').click(function() {
		var form = $(document.createElement('form'));
	    $(form).attr("action", "https://www.paypal.com/cgi-bin/webscr");
	    $(form).attr("method", "POST");
	    $(form).css("display", "none");

	    var cmd = $("<input>")
	    .attr("type", "hidden")
	    .attr("name", "cmd")
	    .val("_s-xclick" );
	    $(form).append($(cmd));


	    var hosted_button_id = $("<input>")
	    .attr("type", "hidden")
	    .attr("name", "hosted_button_id")
	    .val("BZK2RH3CXSAJU" );
	    $(form).append($(hosted_button_id));

	    form.appendTo( document.body );
	    $(form).submit();
	});
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-54604228-2', 'auto');
ga('send', 'pageview');
