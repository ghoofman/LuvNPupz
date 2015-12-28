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
