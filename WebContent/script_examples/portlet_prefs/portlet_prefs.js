/*
 * Copyright 2014  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except irani n compliance with the License.
 * You may obtain a copby y of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */
/* here we list the column names that we used for the id's of the headers and items
 *  they match the names of the variables in our JSON file
 *  we use these later to hide columns and get the values
 */
var columnNames = [ 'id', 'name', 'balance', 'city', 'phone', 'status',
		'updated', 'address' ];

// This initializes the preferences in case none are set so we will see all the
// columns
function getPreferences(dataset) {
	var scriptPref = dataset;
	if (!scriptPref) {
		scriptPref = [ "true", "true", "true", "true", "true", "true", "true",
				"true" ];
	}
	return scriptPref;
}

// here we get the preference values to see which columns are visible
// and loop through the JSON to get the values and add them to the table
function displayDataTable(tableId) {
	var scriptPref = [];
	// here we call the get portlet preference function which returns a Promise
	// object
	// we added our success and error functions to the Promise's then function
	// on success we process the preferences and build the table and display it
	// on error we display the current error unless we get the error that the
	// api
	// is not available which happens when the page is displayed in the editor's
	// preview
	// or the theme doesn't include wp_client_ext capability
	spInstance.getPortletPreferences().then(
			function(dataset) {
				scriptPref = getPreferences(dataset);
				var arrayLength = scriptPref.length;
				for (var i = 0; i < arrayLength; i++) {
					if (scriptPref[i] == "false") {
						var headerSelector = "#" + columnNames[i] + "Header";
						$(headerSelector).css('display', 'none');
					}
				}
				var testDataJSONURL = document
						.getElementById("customerDataJsonUrl").href;
				$.getJSON(testDataJSONURL, function(resp) {
					var items = [];
					var data = null;
					// iterate through the JSON data
					$.each(resp, function(key, value) {
						var data = '<tr class="customer" data-id="' + value.id + '">';
						// iterate through the preference values to add only visible columns
						$.each(scriptPref, function(prefIndex, prefValue) {
							if (scriptPref[prefIndex] == "true") {
								data = data + ' <td>' + value[columnNames[prefIndex]] + '</td>';
							}
						});
						data = data + '</tr>';
						items.push(data);
					});
					$('#' + tableId).append("<tbody></tbody>").append(items);
				});
			}, function(error) {
				// here you would handle error conditions from getting the
				// preference
				// in this case I ignore the error 0001 which I get when not
				// running within a portal context
				if (error.message.toString().indexOf("ERR0001:") != 0)
					alert(error.name + "\n" + error.message);
			});
}

// Function called by jQuery when DOM has finished loading - display list of
// items
$(document).ready(function() {
	// We add the function that displays the preference dialog when the user
	// presses the settings button
	$('#showPrefDialog').click(function() {
		var scriptPref = [];
		// here we call the get portlet preference function which returns a
		// Promise object
		// we added our success and error functions to the Promise's then
		// function
		// on success we process the preferences and build the table and display
		// it
		// on error we display the current error unless we get the error that
		// the api
		// is not available which happens when the page is displayed in the
		// editor's preview
		// or the theme doesn't include wp_client_ext capability
		spInstance.getPortletPreferences().then(function(dataset) {
			scriptPref = getPreferences(dataset);
			var arrayLength = columnNames.length;
			for (var i = 0; i < arrayLength; i++) {
				var colId = "#" + columnNames[i] + "Col"
				$(colId).prop('checked', scriptPref[i] == 'true');
			}
			$('#prefDialog').dialog({
				title : "Select columns"
			});
		}, function(error) {
			// here you would handle error conditions from getting the
			// preference
			// in this case I ignore the error 0001 which I get when not running
			// within a portal context
			if (error.message.toString().indexOf("ERR0001:") != 0)
				alert(error.name + "\n" + error.message);
		});
	});
	// this adds the code to save the values of the preference dialog
	// when the Save button is clicked
	$('#setPreference').click(function() {
		var arrayLength = columnNames.length;
		var preferences = [];
		for (var i = 0; i < arrayLength; i++) {
			var colId = "#" + columnNames[i] + "Col"
			preferences[i] = "" + $(colId).prop('checked');
		}
		spInstance.setPortletPreferences(preferences).then(function(result) {
			$('#prefDialog').dialog('close');
			window.top.location.reload();
		}, function(error) {
			// here you would handle error conditions from getting the
			// preference
			// in this case I ignore the error 0001 which I get when not running
			// within a portal context
			if (error.message.toString().indexOf("ERR0001:") != 0)
				alert(error.name + "\n" + error.message);
		});
	});
	// here we add the function to cancel the preference dialog
	$('#cancelPreference').click(function() {
		$('#prefDialog').dialog('close');
	});
	// display the table passing in the id of the table element
	displayDataTable("customerListTable");
});