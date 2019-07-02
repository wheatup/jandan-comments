chrome.runtime.onInstalled.addListener(function (details) {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostContains: 'jandan', schemes: ['https', 'http'] },
					css: [".commentlist"]
				})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});