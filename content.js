//collect scripts and save to local storage
function save() {
	var scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));
	chrome.storage.local.set({'scripts': scripts});
};



