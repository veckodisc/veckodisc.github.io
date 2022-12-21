const content = {
	"std_cube": {
		"id": "",
		"title": "",
		"desc": "Beskriv projektet.",
		"sections": []
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
		"summary": "Skriv en summering här.",
		"text": "Skriv fullständig text här."
	}
};

class Cube {
  constructor(obj) {
	this.id = obj.id;
	this.title = obj.title;
	this.desc = obj.desc;
	this.sections = [];
	for (let i = 0; i < obj.sections.length; i++) {
	  this.sections.push(obj.sections[i]);
	}
  }
}

function new_std_cube(title) {
	let cube = new Cube(content.std_cube);
	cube.title = title;
	cube.id = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
	for (let i = 0; i < 27; i++) {
	section = new_std_section(i);
	  cube.sections.push(section);
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
  }
}

function new_std_section(pos) {
	section = new Section(content.std_section);
	section.id = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
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
		title += "Organisation";
	} else if (Math.floor(pos / 9) == 1) {
		title += "Group";
	} else {
		title += "Individuals";
	}
	section.title = title;
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
	article.id = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
	let tab = new_std_tab();
	tab.title = "Tab 1";
	article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Tab 2";
	article.tabs.push(tab);
	
	return article;
}

class Tab {
  constructor(obj) {
	this.id = obj.id;
	this.title = obj.title;
	this.summary = obj.summary;
	this.text = obj.text;
  }
}

function new_std_tab() {
	tab = new Tab(content.std_tab);
	tab.id = Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
	
	return tab;
}




			
