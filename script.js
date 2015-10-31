$(document).ready(function() {

	// var scripts = "";
	// function load() {
	// 	chrome.storage.local.get('scripts', function (result) {
	// 		scripts = result.scripts;
	// 	})
	// }


	//demo script
	var scripts = [{
	type: "text/javascript", 
	async: false, 
	src: "https://cdn.walkme.com/users/7a75f78cb4644e4188ad82d063b1f54b/walkme_7a75f78cb4644e4188ad82d063b1f54b_https.js"
	}];

	function WalkmeParser() {}

	WalkmeParser.prototype.checkEnabled = function() {
		var walkmeString = /walkme/g;
		for (var i = 0; i < scripts.length; i++) {
			if (walkmeString.test(scripts[i].src)) {
				$('#enabled').append('<h2><a href="www.walkme.com">www.walkme.com:</a href>  <span>WalkMe Enabled</span></h2>');
				this.walkmeScript = scripts[i];
				return scripts[i];
			}
		 	else if (i === scripts.length -1) {
		 		$('#enabled').append("<h2>www.walk.me - Doesn't contain the WalkMe code");
				return false;
			}
		}
	},

	WalkmeParser.prototype.checkAsync = function() {
		var wmScript = this.walkmeScript;
		if (!wmScript) {
			return undefined;
		}

		if (wmScript.async) {
			$('#async').append("<h2>Async: True</h2>");
			return true;
		} else {
			$('#async').append("<h2>Async: False</h2>");
			return false;
		}
	},

	WalkmeParser.prototype.getUserID = function() {
		var wmScriptSrc = this.walkmeScript.src;
		if (!wmScriptSrc) {
        return undefined;
    }

    var user = /users\/(\w*)\//;
    var userId = wmScriptSrc.match(user)[1];
    this.userId = userId;
    $('#userID').append("<h2>User ID: " + this.userId + "</h2>");
    // return this.userId;
	},

	WalkmeParser.prototype.getEnv = function() {
		var wmScriptSrc = this.walkmeScript.src;
		if (!wmScriptSrc) {
        return undefined;
    }

    var env = /test/;
    if (env.test(wmScriptSrc)) {
    	$('#env').append("<h2>Env: Test</h2>");
    } else {
    	$('#env').append("<h2>Env: Production</h2>");
    }
	},

	WalkmeParser.prototype.getHttps = function() {
		var wmScriptSrc = this.walkmeScript.src;
		if (!wmScriptSrc) {
        return undefined;
    }

    var http = /https/;
    if (http.test(wmScriptSrc)) {
    	$('#https').append("<h2>Is: Https: True</h2>");
    	return;
    } else {
    	$('#https').append("<h2>Is Https: False</h2>");
    	return;
    }
	},

	WalkmeParser.prototype.getHost = function() {
		var wmScriptSrc = this.walkmeScript.src;
		if (!wmScriptSrc) {
        return undefined;
    }

    var hostString = /https:\/\/(.*)\/users/;
    var host = wmScriptSrc.match(hostString)[1];
    this.host = host;
    $('#host').append("<h2>Host: " + this.host + "</h2>");
	},

	WalkmeParser.prototype.readFile = function() {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			console.log(xhr.responseText);
			var data = xhr.responseText;
			var data = data.slice(14, data.length-1);
			var libFile1 = data.split("'LibFile':");
			var libFile2 = libFile1[1].split(",");
			var libFile3 = libFile2[0].replace(/[']+/g, '');
    	var libFile4 = libFile3.split('/');
    	var lib = libFile4[libFile4.length-1];
    	$('#libFile').append("<h2>LibFile: " + lib + "</h2>");

    	var dataFiles1 = data.split("'DataFiles':");
    	var dataFiles2 = dataFiles1[1].split(",");
    	var dataFiles3 = dataFiles2[0].split("/");
    	var dataFiles4 = dataFiles3[dataFiles3.length-1].replace(/[']+/g, '');
    	var dataFiles = dataFiles4.split(".js").length;
    	$('#dataFiles').append("<h2>DataFiles: " + dataFiles + "</h2>");

    	var languages = [];
    	var languages1 = data.split("'shortName':");
    	for (var i = 1; i < languages1.length; i++) {
    		var lang1 = languages1[i].split(",");
    		var lang2 = lang1[0].replace(/[']+/g, ' ');
    		if(languages.indexOf(lang2) === -1 && lang2.length > 2) {
    			languages.push(lang2);
    		}
    	}

    	var languages1 = data.split("'displayName':");
    	for (var i = 1; i < languages1.length; i++) {
    		var lang1 = languages1[i].split(",");
    		var lang2 = lang1[0].replace(/[']+/g, ' ');
    		if(languages.indexOf(lang2) === -1 && lang2.length > 2) {
    			languages.push(lang2);
    		}
    	}
    	$('#languages').append("<h2>Languages: " + languages + "</h2>");
		};

		xhr.open('GET', "https://s3.amazonaws.com/s3.maketutorial.com/users/" + this.userId + "/settings.txt", true);
		xhr.send();
	},

	WalkmeParser.prototype.checkAll = function() {
		this.checkEnabled();
		this.checkAsync();
		this.getUserID();
		this.getEnv();
		this.getHttps();
		this.getHost();
		this.readFile();
	};

	var analyzer = new WalkmeParser();

	analyzer.checkAll();	
});