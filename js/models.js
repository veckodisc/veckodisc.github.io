const content = {
	"std_cube": {
		"id": "",
		"title": "",
		"sections": [],
		"connections": []
	},
	"std_section": {
		"id": "",
		"title": "",
		"intro": "",
		"position": -1,
		"articles": [],
		"fulfillment": 0,
		"connections": []
	},
	"std_article": {
		"id": "",
		"title": "",
		"tabs": []
	},
	"std_tab": {
		"id": "",
		"title": "",
		"text": ""
	},
	"std_connection": {
		"id": "",
		"section_ids": [],
		"strength": 0
	}
};

class Cube {
	constructor(obj) {
		this.id = obj.id;
		this.title = obj.title;
		this.sections = [];
		for (let i = 0; i < obj.sections.length; i++) {
			this.sections.push(obj.sections[i]);
		}
		this.connections = [];
		for (let i = 0; i < obj.connections.length; i++) {
			this.connections.push(obj.connections[i]);
		}
	}
}

function new_std_cube(title) {
	let cube = new Cube(content.std_cube);
	cube.title = title;
	cube.id = get_uid();
	for (let i = 0; i < 27; i++) {
		section = new_std_section(i);
		cube.sections.push(section);
	}
	let connections = getConnections(cube.sections);
	cube.connections = connections;
	for (let i = 0; i < cube.sections.length; i++) {
		for (let j = 0; j < connections.length; j++) {
		  	if(connections[j].section_ids.includes(cube.sections[i].id)) {
		  		cube.sections[i].connections.push(connections[j].id);
		  	}
		}
	}

	return cube;
}

class Section {
  constructor(obj) {
	this.id = obj.id;
	this.title = obj.title;
	this.intro = obj.intro;
	this.pos = obj.pos;
	this.articles = [];
	for (let i = 0; i < obj.articles.length; i++) {
	  this.articles.push(obj.articles[i]);
	}
	this.connections = [];
	for (let i = 0; i < obj.connections.length; i++) {
	  this.connections.push(obj.connections[i]);
	}
  }
}

function new_std_section(pos) {
	section = new Section(content.std_section);
	section.id = get_uid();
	section.pos = pos;
	title = "";
	if (pos % 3 == 0) {
		title += "Historik över ";
	} else if (pos % 3 == 1) {
		title += "Fakta kring ";
	} else {
		title += "Aktuella ";
	}
	if (Math.floor(pos / 3) % 3 == 0) {
		title += "förutsättningar ";
	} else if (Math.floor(pos / 3) % 3 == 1) {
		title += "handlingsplaner ";
	} else {
		title += "mål ";
	}
	if (Math.floor(pos / 9) == 0) {
		title += "på individnivå";
	} else if (Math.floor(pos / 9) == 1) {
		title += "på gruppnivå";
	} else {
		title += "på organisationsnivå";
	}
	section.title = title;
	section.intro = 'Här finns en kort beskrivning av området "' + title + '". Texten förklarar området och beskriver arbetet som ska utföras här.';
	section.articles.push(new_std_article());
	
	return section;
}

class Article {
  constructor(obj) {
	this.id = obj.id;
	this.title = obj.title;
	this.tabs = [];
	for (let i = 0; i < obj.tabs.length; i++) {
	  this.tabs.push(obj.tabs[i]);
	}
  }
}

function new_std_article() {
	article = new Article(content.std_article);
	article.id = get_uid();
	article.title = "Exempelartikel";
	let tab = new_std_tab();
	tab.title = "Flikar";
	tab.text = 'En artikel kan innehålla flera flikar och se ut i princip hur som helst. Klicka på flikarna för att se exempel på vad de kan innehålla.';
	article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Listor";
	tab.text = "En artikel kan innehålla punktlistor, t.ex. över vad som ska göras eller har gjorts.<br><ul><li>Använd The Second Brain</li><li>Utveckla din organisation</li><li>Nå framgång</li></ul>";
	article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Länkar";
	tab.text = "Artikeln kan också innehålla länkar till utbildningar, fakta eller andra viktiga saker.<br><a href='https://veckodisc.github.io/start.html'>The Second Brain</a><br><a href='https://www.zebrain.se/sv/'>Zebrain</a>";
	article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Bilder";
	tab.text = "Det går att lägga till snygga bilder.<br><img style='height: 20em;' src='/images/brain-cube.jpg' alt='Brain cube'>";
	article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Diagram";
	tab.text = "Eller förklarande diagram.<br><img style='height: 26em;' src='/images/diagram.png' alt='Diagram'>";
	article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Video";
	tab.text = 'Det går också att bädda in videor, t.ex. i utbildningssyfte.<br><iframe width="498" height="280" src="https://www.youtube.com/embed/K7QBnuF6dHg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
	article.tabs.push(tab);
	
	return article;
}

class Tab {
  constructor(obj) {
	this.id = obj.id;
	this.title = obj.title;
	this.text = obj.text;
  }
}

function new_std_tab() {
	tab = new Tab(content.std_tab);
	tab.id = get_uid();
	return tab;
}

class Connection {
  constructor(obj) {
	this.id = obj.id;
	this.section_ids = obj.section_ids;
	this.strength = obj.strength;
  }
}

function new_std_connection() {
	let connection = new Connection(content.std_connection);
	connection.id = get_uid();
	return connection;
}

function get_uid () {
	return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
}

function getConnections(sections) {
	let connections = [];

	connections.push(getConnection(sections, 0, 2));
	connections.push(getConnection(sections, 1, 2));
	connections.push(getConnection(sections, 2, 5));
	connections.push(getConnection(sections, 2, 8));
	connections.push(getConnection(sections, 2, 11));
	connections.push(getConnection(sections, 3, 5));
	connections.push(getConnection(sections, 4, 5));
	connections.push(getConnection(sections, 5, 8));
	connections.push(getConnection(sections, 5, 14));
	connections.push(getConnection(sections, 6, 8));
	connections.push(getConnection(sections, 7, 8));
	connections.push(getConnection(sections, 8, 17));
	
	connections.push(getConnection(sections, 9, 11));
	connections.push(getConnection(sections, 10, 11));
	connections.push(getConnection(sections, 11, 14));
	connections.push(getConnection(sections, 11, 17));
	connections.push(getConnection(sections, 11, 20));
	connections.push(getConnection(sections, 12, 14));
	connections.push(getConnection(sections, 13, 14));
	connections.push(getConnection(sections, 14, 17));
	connections.push(getConnection(sections, 14, 23));
	connections.push(getConnection(sections, 15, 17));
	connections.push(getConnection(sections, 16, 17));
	connections.push(getConnection(sections, 17, 26));
	
	connections.push(getConnection(sections, 18, 20));
	connections.push(getConnection(sections, 19, 20));
	connections.push(getConnection(sections, 20, 23));
	connections.push(getConnection(sections, 20, 26));

	connections.push(getConnection(sections, 21, 23));
	connections.push(getConnection(sections, 22, 23));
	connections.push(getConnection(sections, 23, 26));

	connections.push(getConnection(sections, 24, 26));
	connections.push(getConnection(sections, 25, 26));
	

	return connections;
}

function getConnection(sections, pos1, pos2) {
	let connection = new_std_connection();
	connection.section_ids = [sections[pos1].id, sections[pos2].id];
	return connection;
}


			
