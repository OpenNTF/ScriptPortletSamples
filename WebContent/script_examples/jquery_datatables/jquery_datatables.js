/*
 * Copyright 2014  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
*/
// Customer data
var customersData = [ {
	"id" : "2143",
	"name" : "Samantha Daryn",
	"status" : "Standard",
	"updated" : "07/01/2012",
	"balance" : "$2,350.00",
	"address" : "2001 West Rd.",
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
	"address" : "South Mill Pond Ave.",
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
}, {
	"id" : "2147",
	"name" : "Dan Misawa",
	"status" : "Preferred",
	"updated" : "06/29/2012",
	"balance" : "$1,300.00",
	"address" : "1204 Mountain Boulevard",
	"city" : "Canterbury",
	"phone" : "601-555-8888",
}, {
	"id" : "2148",
	"name" : "Frank Adams",
	"status" : "Preferred",
	"updated" : "03/09/2013",
	"balance" : "$3,440.00",
	"address" : "133 Rock Boulevard",
	"city" : "Denver",
	"phone" : "601-555-8888",
}, {
	"id" : "2149",
	"name" : "Steve Williams",
	"status" : "Preferred",
	"updated" : "12/04/2012",
	"balance" : "$1,110.00",
	"address" : "1 Circle Lane",
	"city" : "San Jose",
	"phone" : "601-555-8888",
}, {
	"id" : "2150",
	"name" : "Ron Espinosa",
	"status" : "Standard",
	"updated" : "02/02/2012",
	"balance" : "$7,670.00",
	"address" : "2425 Mountain Rd.",
	"city" : "Dublin",
	"phone" : "601-555-8888",
}, {
	"id" : "2151",
	"name" : "Ed El-Amon",
	"status" : "Standard",
	"updated" : "01/11/2013",
	"balance" : "$1,800.00",
	"address" : "26B Seiching Road",
	"city" : "Beijing",
	"phone" : "601-555-8888",
}, {
	"id" : "2152",
	"name" : "Pierre Dumont",
	"status" : "Preferred",
	"updated" : "11/20/2012",
	"balance" : "$2,350.00",
	"address" : "Paradise Lane",
	"city" : "Pittsburgh",
	"phone" : "601-555-8888",
}, {
	"id" : "2153",
	"name" : "Gardner Raynes",
	"status" : "Preferred",
	"updated" : "06/29/2012",
	"balance" : "$1,222.00",
	"address" : "4 Technology Drive",
	"city" : "Westford",
	"phone" : "601-555-8888",
}, {
	"id" : "2154",
	"name" : "Dennis Michaels",
	"status" : "Standard",
	"updated" : "05/20/2012",
	"balance" : "$3,000.00",
	"address" : "155 W. 67 St.",
	"city" : "New York",
	"phone" : "601-555-8888",
}, {
	"id" : "2155",
	"name" : "Suzanne Miles",
	"status" : "Preferred",
	"updated" : "06/02/2012",
	"balance" : "$9,800.00",
	"address" : "23 S. Main St.",
	"city" : "Durham",
	"phone" : "601-555-8888",
}, {
	"id" : "2156",
	"name" : "Betty Zechman",
	"status" : "Inner Circle",
	"updated" : "10/30/2012",
	"balance" : "$7,540.00",
	"address" : "1445 West Highway",
	"city" : "Raleigh",
	"phone" : "601-555-8888",
}, {
	"id" : "2157",
	"name" : "Jasmine Haj",
	"status" : "Standard",
	"updated" : "10/21/2012",
	"balance" : "$5,000.00",
	"address" : "15498 Central Ave",
	"city" : "Houston",
	"phone" : "601-555-8888",
}, {
	"id" : "2158",
	"name" : "Charlie Hamilton",
	"status" : "Preferred",
	"updated" : "06/29/2012",
	"balance" : "$1,202.00",
	"address" : "5150 S. Michigan Ave.",
	"city" : "Detroit",
	"phone" : "601-555-8888",
}

];

function displayDataTable(data, tableId) {
	var items = [];
    $.each( data, function( key,value ) {
  	  var data ='<tr class="customer" data-id="'+value.id+'">'+
		'	<td class="id">'+value.id+'</td>'+
		'	<td class="name">'+value.name+'</td>'+
		'	<td class="balance">'+value.balance+'</td>'+
		'	<td class="city">'+value.city+'</td>'+
		'</tr>';

        items.push( data );
      });
    $('#' + tableId).append("<tbody></tbody>").append(items);
	$('#' + tableId).dataTable({
		"sPaginationType": "two_button", 
		"bFilter": true, 
		"bSort": true, 
		"bLengthChange": true,
	    "oLanguage": {
	        "sInfo": "_START_ to _END_ of _TOTAL_ entries"
	      }
	});
	
}

//Function called by jQuery when DOM has finished loading - display list of customers
$(function() {
	displayDataTable(customersData, "customerListTable");
});