
var htmlFragmentURL = document.getElementById("sampleFragmentUrl").href;
$("#htmlFragment").load( htmlFragmentURL );

var testDataJSONURL = document.getElementById("customerDataJsonUrl").href;
$.getJSON( testDataJSONURL, function( resp ) {
  $.each( resp, function( index, value ) {
	  var tr = $("#tableBody").append("<tr>");
	  tr.append("<td>" + value.name + "</td>");
	  tr.append("<td>" + value.address + "</td>");
	  tr.append("<td>" + value.city + "</td>");
  });
});
