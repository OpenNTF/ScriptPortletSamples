/*
 * Copyright 2014  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
*/
$(document).ready(function () {
	$("#mybutton").click(function () {
		// This is the URL to a particular Script Portlet Content Item
		// You can get this URL by looking at the iFrame URL for the Preview pane of the Script Portlet Editor
		var scriptUrl = '/wps/wcm/myconnect/Portal%20Site/Z6_000000000000000000000000A0/Z6_CGAH47L000UJ20I7MOKIST00I6/Z6_GIKCH180K0DVF0AKOT4HBA30B4/Z6_GIKCH180K0DVF0AKOT4HBA30R2/Script%20Portlet%20Content%20Item';
		$("#dialog").load(scriptUrl);
		$("#dialog").dialog({
	              modal: true,
	              width: 1000,
	              title:"Running Script",
			     buttons: {
			         "Save": function() {
			                          //do any save logic here
			           $( this ).dialog( "close" );
			         },
			         Cancel: function() {
			           $( this ).dialog( "close" );
			         }
			     }
		  });  
	 });
});
 