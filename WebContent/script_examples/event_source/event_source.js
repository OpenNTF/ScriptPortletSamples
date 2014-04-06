/*
 * Copyright 2014  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
*/
// The customer data, used by both list and details components
var customersData = [ {
	"id" : "2143",
	"name" : "Samantha Daryn",
	"status" : "Standard",
	"updated" : "07/01/2012",
	"balance" : "$2,350.00",
	"address" : "21 West Rd.",
	"city" : "Salisbury",
	"phone" : "212-555-9876",
}, {
	"id" : "2144",
	"name" : "Lucille Suarez",
	"status" : "Preferred",
	"updated" : "11/21/2012",
	"balance" : "$1,050.00",
	"address" : "123 Main St",
	"city" : "Concord",
	"phone" : "303-555-2435",
}, {
	"id" : "2145",
	"name" : "Amar Srivastava",
	"status" : "Inner Circle",
	"updated" : "08/12/2012",
	"balance" : "$7,235.00",
	"address" : "S. Mill Pond Rd",
	"city" : "Sherman Oaks",
	"phone" : "506-555-1212",
}, {
	"id" : "2146",
	"name" : "Ted Amado",
	"status" : "Standard",
	"updated" : "02/14/2012",
	"balance" : "$1,030.00",
	"address" : "44 Center St.",
	"city" : "Sydney",
	"phone" : "303-555-1234",
} ];

// The jQuery object that's used for eventing, using bind/trigger
var customerQueue = {};

// Function called by jQuery when DOM has finished loading - display list of customers
$(function() {
	var items = [];
    $.each( customersData, function( key,value ) {
    	  var data ='<div class="customer" data-id="'+value.id+'">'+
  				'	<span class="name">'+value.name+'</span>'+
  				'	<span class="id">'+value.id+'</span>'+
  			    '   <br/><label class="statusLabel">Status:</label>&nbsp;<span class="status">'+value.status+'</span>' +
  				'	<br/><label class="updatedLabel">Updated:</label>&nbsp;<span class="updated">'+value.updated+'</span>'+
  				'	<div class="balance">'+value.balance+'</div>'+
  				'</div>'+
  				'<div class="customerDivider"></div>';
        items.push( data );
      });
	$("#customerList").html(items);

	// Attach a 'click" function on the customer element that calls "trigger", passing the id from the element
	$("#customerList .customer").click(function() {
		$(customerQueue).trigger('customerSelected', $(this).data("id"));
	});

});
