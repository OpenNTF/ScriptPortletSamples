/*
 * Copyright 2014  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
*/
// Find element in array by "id"
var findById = function(customerArray, id) {
	for (var i = 0; i < customerArray.length; i++) {
		if (customerArray[i].id === ("" + id)) {
			return customerArray[i];
		}
	}
	return null;
};

//Function called by jQuery when DOM has finished loading
$(function() {
	  // console.log("id: " + id);
	  data = findById(customersData, id);
	  // console.log("data: " + data);
	  if (data) {
   	      var html =
  	        '<div class="customerOverviewLeft">'+
  	        ' <div class="name">'+data.name+'</div>'+
  	        ' <div class="balance">'+data.balance+'</div>'+
  	        ' <div class="phone">'+data.phone+'</div>'+
  	        ' <div class="address">'+data.address+'</div>'+
            ' <div class="city">'+data.city+'</div>'+
  	        '</div>'+
  	        '<div class="customerOverviewRightTop">'+
  	        ' <span class="id">'+data.id+'</span><br/>'+
  	        ' <span class="status">'+data.status+'</span><br/>'+
  	        ' <label class="updatedLabel">Updated:</label>&nbsp;<span class="updated">'+data.updated+'</span>'+
  	        '</div>'+
  	        '<div class="customerOverviewRightBottom">'+
  	        ' <div class="print blue">Print Documents</div>'+
  	        '</div>';
  	      $("#customerOverview").html(html);
	  }
          	      
});