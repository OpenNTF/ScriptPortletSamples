
/*
 * Copyright 2014  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except irani n compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
*/
function displayDataTable(data, tableId) {
    var items = [];   

    $.each( data, function( index, rowData) {      
  	  var data ='<tr>';
  	  // add columns
  	      $.each( rowData, function( index2, columnData) {      
  	        data = data + '  <td>' + columnData + '</td>';
	      });   

	  data = data + '</tr>';
        items.push( data );
    });   
      
    $('#' + tableId).append("<tbody></tbody>").append(items); 

  };
  
//Function called by jQuery when DOM has finished loading - display list of customers
$(document).ready(function () {
  displayDataTable(wcmTagsSampleData, "tags_table"); 
  
});