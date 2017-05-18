var create_name = function(text) {
  // Convert text to lower case.
  var name = text.toLowerCase();
  
  // Remove leading and trailing spaces, and any non-alphanumeric
  // characters except for ampersands, spaces and dashes.
  name = name.replace(/^\s+|\s+$|[^a-z0-9&\s-]/g, '');
  
  // Replace '&' with 'and'.
  name = name.replace(/&/g, 'and');
  
  // Replaces spaces with dashes.
  name = name.replace(/\s/g, '-');
  
  // Squash any duplicate dashes.
  name = name.replace(/(-)+\1/g, "$1");
  
  return name;
};

var add_link = function() {
  // Convert the h3 element text into a value that
  // is safe to use in a name attribute.
  var name = create_name($(this).text());
  
  // Create a name attribute in the following div.toggle
  // to act as a fragment anchor.
  $(this).next('div.toggle').attr('name', name);
  
  // Replace the h3.toggle element with a link to the
  // fragment anchor.  Use the h3 text to create the
  // link title attribute.
  /* $(this).html(
    '<a href="#' + name + '" title="Reveal ' +
    $(this).text() + ' content">' +
    $(this).html() + '</a>'); */
};

var toggle = function(event) {
  
  event.preventDefault();

  if (event.type === "keypress") {
    var code = event.keyCode || event.which;
    if (! ((code === 13) || (code === 32))) {
	return false;
    }
  }

  // Toggle the 'expanded' class of the h3.toggle
  // element, then apply the slideToggle effect
  // to div.toggle siblings.
  $(this).
    toggleClass('expanded').
    nextAll('div.toggle').slideToggle('fast');

  var span = $("span", $(this)); 
  if (span.hasClass("plus")) {
	$(".plus", $(this)).removeClass("plus").addClass("minus");
  }
  else {
	$(".minus", $(this)).removeClass("minus").addClass("plus");
  }
};

var remove_focus = function() {
  // Use the blur() method to remove focus.
  $(this).blur();
};

$(function () {
  // Replace the '_toggle' class with 'toggle'. 
  $('._toggle').
    removeClass('_toggle').
    addClass('toggle');
    
  // Replace the '_expanded' class with 'expanded'. 
  $('._expanded').
    removeClass('_expanded').
    addClass('expanded');
  
  $('._plus').
    removeClass('_plus').
    addClass('plus');

  $('h2.toggle').attr('tabindex', '0');
  
  // Hide all div.toggle elements that are not initially expanded.
  $('h2.toggle:not(.expanded)').nextAll('div.toggle').hide();
  
  // Add a link to each h3.toggle element.
  $('h2.toggle').each(add_link);
  
  // Add a click event handler to all h3.toggle elements.
  $('h2.toggle').click(toggle);
  $('h2.toggle').keypress(toggle);
  
  // Remove the focus from the link tag when accessed with a mouse.
  $('h2.toggle a').mouseup(remove_focus);


  $('h3.toggle').attr('tabindex', '0');
  
  // Hide all div.toggle elements that are not initially expanded.
  $('h3.toggle:not(.expanded)').nextAll('div.toggle').hide();
  
  // Add a link to each h3.toggle element.
  $('h3.toggle').each(add_link);
  
  // Add a click event handler to all h3.toggle elements.
  $('h3.toggle').click(toggle);
  $('h3.toggle').keypress(toggle);
  
  // Remove the focus from the link tag when accessed with a mouse.
  $('h3.toggle a').mouseup(remove_focus);


  $('h4.toggle').attr('tabindex', '0');
  
  // Hide all div.toggle elements that are not initially expanded.
  $('h4.toggle:not(.expanded)').nextAll('div.toggle').hide();
  
  // Add a link to each h4.toggle element.
  $('h4.toggle').each(add_link);
  
  // Add a click event handler to all h4.toggle elements.
  $('h4.toggle').click(toggle);
  $('h4.toggle').keypress(toggle);
  
  // Remove the focus from the link tag when accessed with a mouse.
  $('h4.toggle a').mouseup(remove_focus);


});
