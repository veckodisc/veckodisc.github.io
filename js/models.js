const content = {
	"std_cube": {
		"id": "",
		"title": "",
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
	this.sections = [];
	for (let i = 0; i < obj.sections.length; i++) {
	  this.sections.push(obj.sections[i]);
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
	article.tabs[0].text = "Det här är den andra artikelns första text.";
	article.tabs[1].text = "Det här är den andra artikelns andra text.<br><br><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>";
	section.articles.push(article);
	
	return section;
}

class Article {
  constructor(obj) {
	this.id = obj.id;
	this.title = obj.title;
	this.tabs = [];
	this.tab_idx = 0;
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
	article.tabs.push(tab);
	tab = new_std_tab();
	tab.title = "Tab 2";
	tab.text = "Skriv den andra fullständiga <br>texten här.";
	console.log(tab.text);
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
	tab.id = get_uid();
	
	return tab;
}

function get_uid () {
	return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
}


			
