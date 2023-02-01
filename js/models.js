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
		"intro": "Beskriv vad som ska göras här.",
		"position": -1,
		"articles": [],
		"checklists": [],
		"fulfillment": 0,
		"connections": []
	},
	"std_article": {
		"id": "",
		"title": "Artikel-titel",
		"tabs": []
	},
	"std_tab": {
		"id": "",
		"title": "Tab-titel",
		"text": "Skriv fullständig text här."
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
		title += "History, ";
	} else if (pos % 3 == 1) {
		title += "Test Plans, ";
	} else {
		title += "Revised Plans, ";
	}
	if (Math.floor(pos / 3) % 3 == 0) {
		title += "Conditions, ";
	} else if (Math.floor(pos / 3) % 3 == 1) {
		title += "Actions, ";
	} else {
		title += "Missions, ";
	}
	if (Math.floor(pos / 9) == 0) {
		title += "Individuals";
	} else if (Math.floor(pos / 9) == 1) {
		title += "Group";
	} else {
		title += "Organisation";
	}
	section.title = title;
	section.articles.push(new_std_article());
	let article = new_std_article();
	//article.tabs[0].text = "Det här är den andra artikelns första text.";
	//article.tabs[1].text = "Det här är den andra artikelns andra text.<br><br><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>";
	section.articles.push(article);
	
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
	let tab = new_std_tab();
	tab.title = "Tab 1";
	//article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Tab 2";
	tab.text = "Skriv den andra fullständiga <br>texten här.";
	//article.tabs.push(tab);
	
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
	connections.push(getConnection(sections, 14, 15));
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


			
