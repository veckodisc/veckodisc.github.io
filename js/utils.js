async function init_ls() {
	let response = await fetch('json/cubes.json');
	let cubes = await response.json();
	localStorage.setItem("cubes", JSON.stringify(cubes));
	response = await fetch('json/sections.json');
	let sections = await response.json();
	localStorage.setItem("sections", JSON.stringify(sections));
}

function get_ls(key) {
	var retrievedObject = localStorage.getItem(key);
	let obj = JSON.parse(retrievedObject);
	return obj;
}

function get_uid () {
	return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
}

async function getJson(loc) {
    let response = await fetch(loc);
	return await response.json();
}

function downloadJson(exportJson) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportJson);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    const timeElapsed = Date.now();
	const today = new Date(timeElapsed);
    downloadAnchorNode.setAttribute("download", today.toISOString() + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
			
