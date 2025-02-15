function main() {
	/*
		UPDATE ME: swapURI
		Nested array represents ["old URI string to find", "newU RI string to replace with"]
		
		Notes:
			- You don't have to worry about encording URIs, that's done automatically.
			- If you're intending to swap a whole folder name, it's recommended to include the leading and trailing "/" to ensure you don't accidentally replace a string that's within the file path that's similar.
	*/
	var swapURI = [
		["/Dropbox Name/", "/New Dropbox Name/"],
		["/computername/", "/newcomputername/"]
	];

	
	//Takes the active doc and replaces old URI string(s) with new URI string(s) found in swapURI array.
	function reinitLinks() {
		var doc = app.activeDocument;
		var links = doc.links;
		var linksChanged = 0;
		

		//Loop through all active doc linked media.
		for(var i = 0; i < links.length; i++) {
			var linkURI = links[i].linkResourceURI;
			var newLinkedURI = linkURI;

			//Goes through swapURI to replace any URI strings that match
			for(var j = 0; j < swapURI.length; j++) {
				var swap = swapURI[j];

				newLinkedURI = newLinkedURI.replace(encodeURI(swap[0]), encodeURI(swap[1]));
			}
			
			links[i].reinitLink(newLinkedURI);
			
			//Check if URI was changed
			if (linkURI != newLinkedURI) {
				linksChanged++;
			}
		}


		//Alert if any links were changed and how many.
		if(linksChanged > 0) {
			alert("Updated [" + linksChanged + "/" + links.length + "] links!");
		} else {
			alert("No links updated...");
		}
	}


	//Init
	reinitLinks();
}


app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Reinit Links");
