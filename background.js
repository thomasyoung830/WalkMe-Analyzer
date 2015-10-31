function handleButtonClick() {
	chrome.tabs.create({
		index: 1,
		url: 'walkMeAnalyzer.html'
	});
};

chrome.runtime.onMessage.addListener(function (message, sender, response) {
	console.log(message, sender);
	response({ status: 'success!' });
});

chrome.runtime.onConnect.addListener(function (messagePort) {
	messagePort.onMessage.addListener(function (message) {
		console.log(message.script);
		messagePort.postMessage({ status: 'received!' });
	});
});

