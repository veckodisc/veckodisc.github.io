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

async function loadAndMerge() {
    let response = await fetch('json/saved_projects_v5.json');
	let saved_cubes = await response.json();
	let current_cubes = JSON.parse(localStorage.getItem("cubes"));
	localStorage.setItem("cubes", JSON.stringify(current_cubes.concat(saved_cubes)));
	window.location.href = "start.html";
}

function downloadJson(exportJson) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportJson);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    const timeElapsed = Date.now();
	const today = new Date(timeElapsed);
    downloadAnchorNode.setAttribute("download", today.toISOString() + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function getCurrentCube() {
	let cubes = JSON.parse(localStorage.getItem("cubes"));
    for (let i = 0; i < cubes.length; i++) {
    	if(cubes[i].id == localStorage.getItem("current_cube")) {
    		return cubes[i];
    	}
    }
}

function getCurrentSection() {
	let cube = getCurrentCube();
    for (let i = 0; i < cube.sections.length; i++) {
    	if(cube.sections[i].id == localStorage.getItem("current_section")) {
    		return cube.sections[i];
    	}
    }
}

function getSection(cube, id) {
    for (let i = 0; i < cube.sections.length; i++) {
    	if(cube.sections[i].id == id) {
    		return cube.sections[i];
    	}
    }
}

function getCurrentArticle(section) {
    for (let i = 0; i < section.articles.length; i++) {
    	if(section.articles[i].id == localStorage.getItem("current_article")) {
    		return section.articles[i];
    	}
    }
}

function getCurrentConnections() {
	let cube = getCurrentCube();
	let connections = [];
	let section = getCurrentSection();
    for (let i = 0; i < section.connections.length; i++) {
    	for (let j = 0; j < cube.connections.length; j++) {
    		if(cube.connections[j].id == section.connections[i]) {
    			connections.push(cube.connections[j]);
    		}
    	}
    }
    return connections;
}

function getSectionConnections(cube, id) {
	let connections = [];
	let section = getSection(cube, id);
    for (let i = 0; i < section.connections.length; i++) {
    	for (let j = 0; j < cube.connections.length; j++) {
    		if(cube.connections[j].id == section.connections[i]) {
    			connections.push(cube.connections[j]);
    		}
    	}
    }
    return connections;
}

function getStrength(cube, section) {
	let strength = 0;
	let num_connections = 0
	const connections = getSectionConnections(cube, section.id);
	for (let i = 0; i < connections.length; i++) {
		if(isActive(cube, connections[i])) {
			strength += parseInt(connections[i].strength);
			num_connections++;
		}
	}
	if(num_connections == 0) {
		return 0;
	} else {
		return Math.round(strength / num_connections);
	}
}

function isActive(cube, connection) {
	for(let i = 0; i < connection.section_ids.length; i++) {
		if(!getSection(cube, connection.section_ids[i]).active) {
			return false;
		}
	}
	return true;
}
			
