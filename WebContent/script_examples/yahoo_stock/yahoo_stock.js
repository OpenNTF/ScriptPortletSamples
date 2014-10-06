// Sample that gets stock quote info from a finance.yahoo.com REST service
var yahooStockQuote = (function() {
	var self = {};
	var _symbolsList = {};
	var _symbolArray = [];
	var _titleArray = [];
	var _queryURL;
	var _divID;

	self.init = function(symbolsList, divID) {
		var symbols;
		_symbolsList = symbolsList;
		_symbolArray = [];
		_divID = divID;

		populateSymbolTitleArrays(); // populate _symbolArray and
										// _symbolArray
		symbols = encodeURIComponent('"' + _symbolArray.join('","') + '"');
		console.log("symbols: " + symbols);
		_queryURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20'
				+ 'yahoo.finance.quotes%20where%20symbol%20in%20%28'
				+ symbols
				+ '%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';

		getQuote();
	};

	var populateSymbolTitleArrays = function() {
		$.each(_symbolsList, function(key, value) {
			_symbolArray.push(key);
			_titleArray.push(value);
		});
	};

	getQuote = function() {
		$.ajax({
			url : _queryURL,
			success : function(data) {
				renderQuotes(eval(data));
			},
			error : function() {
				alert('error');
			},
			dataType : 'jsonp'
		});
	};

	var renderQuotes = function(completeData) {
		// console.log("renderQuotes " + JSON.stringify(completeData));
		var data = completeData.query.results.quote;
		// console.log("data " + JSON.stringify(data));
		var $quotesDIV = $(_divID);
		$quotesDIV.empty();

		for (var i = 0; i < data.length; i++) {
			var symbol = data[i].Symbol;
			var lastTradeTime = data[i].LastTradeTime;
			var change = data[i].Change;
			var changePercentage = data[i].ChangeinPercent;
			var l_cur = data[i].LastTradePriceOnly;
			var $quote = $("<div class='quote quote-" + i + " " + symbol
					+ "'></div>");

			$quote.append("<div class='name'>" + _titleArray[i] + "</div>");
			$quote.append("<div class='symbol'>" + symbol + "</div>");
			$quote.append("<div class='price'>" + l_cur + "</div>");
			$quote.append("<div class='change'>" + change + "</div>");
			$quote.append("<div class='changePercentage'><span>"
					+ changePercentage + "%</span></div>");
			$quote.append("<div class='lastTradeTime'>" + lastTradeTime
					+ "</div>");

			if (parseFloat(change) > 0)
				$quote.addClass("up");
			else if (parseFloat(change) < 0)
				$quote.addClass("down");

			$quotesDIV.append($quote);

		}
	};
// This initializes the preferences in case none are set so we will see all the
// columns
function getYahooPreferences(dataset) {
	var yahooPref = dataset;
	if (!yahooPref) {
		yahooPref = {
			'IBM' : 'IBM Corporation',
			'GOOG' : 'Google Inc',
			'MSFT' : 'Microsoft Corporation',
			'AAPL' : 'Apple Computer',
			'ORCL' : 'Oracle Corporation',
			'FB' : 'Facebook Inc'
		};
	}
	return yahooPref;
}

function yahooInit() {
	var yahooPref = getYahooPreferences(null);
	spYahooInstance.getPortletPreferences().then(
			function(dataset) {
				yahooPref = getYahooPreferences(dataset);
				yahooStockQuote.init(yahooPref, '#quotesWrapper');
			}, function(error) {
				// here you would handle error conditions from getting the
				// preference
				// in this case I ignore the error 0001 which I get when not
				// running within a portal context
				if (error.message.toString().indexOf("ERR0001:") != 0)
					alert(error.name + "\n" + error.message);
				else
					yahooStockQuote.init(yahooPref, '#quotesWrapper');
			});
}

$(document).ready(function() {
	// We add the function that displays the preference dialog when the user
	// presses the settings button
	$('#showYahooDialog').click(function() {
		var yahooPref = null;
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
		spYahooInstance.getPortletPreferences().then(function(dataset) {
			// iterate through the JSON data
			var curStock = 1;
			$.each(getYahooPreferences(dataset), function(key, value) {
				$('#symbol'+curStock).val(key);
				$('#title'+curStock++).val(value);
			});
			$('#yahooDialog').dialog({
				title : "Enter stocks",
				width: 400 
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
	$('#setYahooPreference').click(function() {
		var val = '{'; 
		var quote = '"';
		for (var int = 1; int <= 10; int++) {
			var symbolVal = $('#symbol' + int).val();
			var titleVal = $('#title' + int).val();
			if(symbolVal != undefined && symbolVal.length > 0){
				// add the previous entries , for the value
				if(int > 1)
					val = val + ','
				val = val + quote + symbolVal + quote + ':' + quote + titleVal + quote;
			}
		}
		val = val +'}';
		var yahooPref = JSON.parse(val);
		spYahooInstance.setPortletPreferences(yahooPref).then(function(result) {
			$('#yahooDialog').dialog('close');
			window.top.location.reload();
		}, function(error) {
			// here you would handle error conditions from getting the
			// preference
			// in this case I ignore the error 0001 which I get when not running
			// within a portal context
			if (error.message.toString().indexOf("ERR0001:") != 0)
				alert(error.name + "\n" + error.message);
			$('#yahooDialog').dialog('close');
		});
	});
	// here we add the function to cancel the preference dialog
	$('#cancelYahooPreference').click(function() {
		$('#yahooDialog').dialog('close');
	});
	// here we add the function to cancel the preference dialog
	$('#restoreYahooPreference').click(function() {
		// reset to initial values
		var yahooPref = getYahooPreferences(null);
		spYahooInstance.setPortletPreferences(yahooPref).then(function(result) {
			$('#yahooDialog').dialog('close');
			window.top.location.reload();
		}, function(error) {
			// here you would handle error conditions from getting the
			// preference
			// in this case I ignore the error 0001 which I get when not running
			// within a portal context
			if (error.message.toString().indexOf("ERR0001:") != 0)
				alert(error.name + "\n" + error.message);
			$('#yahooDialog').dialog('close');
		});});
	yahooInit();
});

	return self;
}());
