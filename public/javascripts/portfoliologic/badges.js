// When Document is ready, build treehouse Badge Widget 
$(document).ready(function () {

  // Replace the value for var 'e' with your Treehouse Username
  var e = "danielarnost",
  
  // Treehouse Json 
  t = "https://teamtreehouse.com/" + e + ".json",
  
  // Badges JQuery Identifier    
  n = $("#badges"),
  
  // Badges Array    
  r = [],
  
  // Badges Count
  i = 0;
  
  // Json Parse Treehouse User Badges Info
  $.getJSON(t, function (e) {
    
    // User Json Parse Select Badges Info
  	var t = e.badges;
    
    // Construct Each badge's HTML
  	$.each(t, function (e, t) {
  	 r += '<li><a href="' + t.url + '" target="_blank"><img src="' + t.icon_url + '" alt="' + t.name + '" title="' + t.name + '"/></a></li>';
  		i++
  	});
    
    // Append Badge to #badges
  	n.append(r);
    
    // Header Badges count generator
  	$("#treehouse-count").append('I have earned ' + i + ' badges at Treehouse!');
  });
});