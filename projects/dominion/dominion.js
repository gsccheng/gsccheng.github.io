 // U3.W7: Design your own Code Combat Mission

// This is a solo challenge
/*
Your mission description: 
You have inherited 250 acres and are the king of your dominion. (This project is based off of a text-based game called Dominion by Kamikazegames that I use to play. Wiki can be viewed here: http://dominion.lykanthropos.com/wiki/index.php/Main_Page)

Overall mission: 1) Obtain a population of 10,000 in your dominion within 36 weeks(turns). 2) Obtain a dominion size of at least 1000 acres in 36 weeks.
Goals: 
1) Construct Buildings. 
2) Train Military.
3) Explore land.
4) Invade lands.

Characters: N/A. Your focus will be on your dominion.
Objects: 
1) Dominion. 
2) Military.
3) Construction
4) Spells

Functions:
1) Train military
2) Build buildings
3) Cast spells
4) Play dominion game

// Pseudocode
Create a dominion where you can see its status
Create a set of buildings where you can see its status
Create a method to build buildings
Create a military where you can see its status
Create a method to train military
Create a method to invade lands
Create a state of magic
Create a method to cast spells
Create a castle for improvements
Create a method for adding improvements to the castle

*/
// Initial Code

var myDom = new dom();

function depthOfObj(obj) {
	
	var depth = 1;
	for (outer in obj) {
		for (inner in obj[outer]) {
			if (typeof obj[outer][inner] == 'number') {
				depth = 2;
				break;
			}
		}
	}
	return depth;
}

function sumValues(obj) {

	var sum = 0;
	
	if (depthOfObj(obj) == 1) {
		for (key in obj) {
			sum += obj[key];
		}
	} else {
		for (outer in obj) {
			for (inner in obj[outer]) {
				sum += obj[outer][inner];
			}
		}
	}

	return sum;	
}

function roundToHundredths(num) {
	return Math.round(num * 100) / 100;
}

function dom() {
	this.name = "Name";
	this.dominion_name = "Dominion Name";
	this.turn = 1;
	this.draftRate = 0.1;
	this.userSelection = "waiting for user";
	this.constants = {
		maxCastle: {
			science: 0.20,
			keep: 0.30,
			towers: 0.40,
			forges: 0.30,
			walls: 0.30,
			harbor_and_irrigation: 0.30,
		},
	};
	this.land = {
		plain: {
			barren: 40,
			home: 10,
			alchemy: 30,
			farm: 30,
			smithy: 0,
			masonry: 0
		},
		forest: {
			barren: 20,
			lumberyard: 20,
			forest_haven: 0
		},
		mountain: {
			barren: 20,
			ore_mine: 0,
			gryphon_nest: 0
		},
		hill: {
			barren: 20,
			factory: 0,
			guard_tower: 0,
			shrine: 0,
			barracks: 0
		},
		swamp: {
			barren: 20,
			tower: 0,
			wizard_guild: 0,
			temple: 0
		},
		cavern: {
			barren: 20,
			diamond_mine: 0,
			school: 0
		},
		water: {
			barren: 20,
			dock: 0
		}
	};
	this.military = {
		spearman: 0,
		archer: 150,
		knight: 0,
		cavalry: 0,
		spies: 25,
		wizards: 25,
		// archmages: 0
	};
	this.castle = {
		science: {
			amount: 0,
			percent_improvement: 0,
		},
		keep: {
			amount: 0,
			percent_improvement: 0,
		},
		towers: {
			amount: 0,
			percent_improvement: 0,
		},
		forges: {
			amount: 0,
			percent_improvement: 0,
		},
		walls: {
			amount: 0,
			percent_improvement: 0,
		},
		harbor_and_irrigation: {
			amount: 0,
			percent_improvement: 0,
		},	
	};	
	this.spells = {
		midas_touch: 0.1,
		gaias_watch: 0.1,
		mining_strength: 0.1
	};
	this.building_profiles = {
		alchemy: {
			land_type: "plain"
		},
		farm: {
			land_type: "plain"
		},
		smithy: {
			land_type: "plain"
		},
		masonry: {
			land_type: "plain"
		},
		home: {
			land_type: "plain"
		},
		ore_mine: {
			land_type: "mountain"
		},
		gryphon_nest: {
			land_type: "mountain"
		},
		factory: {
			land_type: "hill"
		},
		guard_tower: {
			land_type: "hill"
		},
		shrine: {
			land_type: "hill"
		},
		barracks: {
			land_type: "hill"
		},
		tower: {
			land_type: "swamp"
		},
		wizard_guild: {
			land_type: "swamp"
		},
		temple: {
			land_type: "swamp"
		},
		lumberyard: {
			land_type: "forest"
		},
		forest_haven: {
			land_type: "forest"
		},
		diamond_mine: {
			land_type: "cavern"
		},
		school: {
			land_type: "cavern"
		},
		dock: {
			land_type: "water"
		}
	};		
	this.sumBarrenLand = function(){
		var barrenLandTotal = 0;
		for (landType in this.land) {
			for (building in this.land[landType]) {
				if (building == "barren") {
					barrenLandTotal += this.land[landType].barren;
				}
			}
		}
	return barrenLandTotal;	
	};
	this.totalPopOverview = (sumValues(this.land) * 20 + this.land.plain.home * 10 - 15 * this.sumBarrenLand() + 6 * this.land.hill.barracks) * (1 + this.castle.keep.percent_improvement);
	this.overview = {
		land: sumValues(this.land),
		peasant: this.totalPopOverview * (1 - this.draftRate),
		draftee: this.totalPopOverview * this.draftRate - sumValues(this.military),
		total_pop: this.totalPopOverview,
		platinum: 100000,
		food: 15000,
		lumber: 15000,
		mana: 0,
		ore: 0,
		gem: 10000,
		boat: 0,
		research_point: 0,
		// incoming_land: 
		// incoming_building:
	};
	this.techAchievements = {
		"-10% offensive casualties": this.overview.land * 10,
		"-10% defensive casualties": this.overview.land * 10,
		"-5% exploring platinum cost": this.overview.land * 10,
		"-10% spy losses on failed operations": this.overview.land * 10,
		"-20% cost of spies": this.overview.land * 10,
		"-10% cost of spells": this.overview.land * 10,
		"-20% cost of wizards": this.overview.land * 10,
		"+10% food production": this.overview.land * 10,
		"+5% gem production": this.overview.land * 10,
		"-10% construction platinum costs": this.overview.land * 10,
		"+5% attack power": this.overview.land * 15,
		"-10% exploring platinum cost": this.overview.land * 15,
		"+5% platinum production": this.overview.land * 15,
		"+2% population maximum": this.overview.land * 15,
		"+20% lumber, 20% ore, and 10% gem production": this.overview.land * 20,
		"+6% population maximum": this.overview.land * 20,
		"+12.5% platinum production": this.overview.land * 20,
		"+10% attack power, +15% wizard strength": this.overview.land * 20,
		"-30% construction platinum costs": this.overview.land * 20,
		"-10% military training costs": this.overview.land * 20,
		"-25% offensive and defensive costs": this.overview.land * 20,
		"-20% exploring cost, +15% mana production": this.overview.land * 20,
	};
	this.bonus = {
		for_factories: Math.max ((1 - 4 * this.land.hill.factory / this.overview.land), 0.25),
		for_plat: 1 + this.castle.science.percent_improvement + this.spells.midas_touch,
		for_food: 1 + this.castle.harbor_and_irrigation.percent_improvement + this.spells.gaias_watch,
		for_ore: 1 + this.spells.mining_strength,
		forMana: this.castle.towers.percent_improvement,
		forArmy: Math.max ((1 - 2 * this.land.plain.smithy / this.overview.land), 0.64),
		forWizard: Math.max ((1 - 2 * this.land.swamp.wizard_guild / this.overview.land), 0.60),
	};
	this.cost = {
		construction_plat: (850 + (this.overview.land - 250) * 1.53) * this.bonus.for_factories,
		construction_lumber: (88 + (this.overview.land - 250) * 0.35) * this.bonus.for_factories,
		military: {
			plat: {
				spearman: 275 * this.bonus.forArmy,
				archer: 275 * this.bonus.forArmy,
				knight: 1000 * this.bonus.forArmy,
				calvary: 1250 * this.bonus.forArmy,
				spy: 500,
				wizard: 500 * this.bonus.forWizard,
				// archmage: 1000 * this.bonus.forWizard,
			},
			ore: {
				spearman: 25 * this.bonus.forArmy,
				archer: 10 * this.bonus.forArmy,
				knight: 75 * this.bonus.forArmy,
				calvary: 100 * this.bonus.forArmy,
				spy: 0,
				wizard: 0,
				// archmage: 0,
			},
		},
	};
	this.weeklyProd = {
		plat_per_wk: (this.land.plain.alchemy * 45 + Math.min (this.overview.peasant, (this.overview.land - this.land.plain.home - this.land.hill.barracks) * 20) * 2.7 ) * this.bonus.for_plat,
		food_per_wk: (this.land.plain.farm * 80 + this.land.water.dock * 35) * this.bonus.for_food - this.overview.total_pop * 0.25 - this.overview.food * 0.01,
		lumber_per_wk: this.land.forest.lumberyard * 50 - this.overview.lumber * 0.01,
		mana_per_wk: this.land.swamp.tower * 25 * this.bonus.forMana - this.overview.mana * 0.02,
		ore_per_wk: (this.land.mountain.ore_mine * 60) * this.bonus.for_ore,
		gem_per_wk: this.land.cavern.diamond_mine * 15,
		boat_per_wk: this.land.water.dock * 0.05,
		research_pts_per_wk: Math.max ((this.land.cavern.school / 2), (this.land.cavern.school * (1 - (this.land.cavern.school / this.overview.land))))	
	};	 	
};	
		
function reloadForm() {
	document.getElementById("radio_buttons").reset();
	myDom.userSelection = "waiting for user"; // This is needed since the myDom.userSelection declaration in the for loop is only done if it finds a check, which doesn't happen after the entries are reset
	play_dominion();
}

function attack_generator() {
	// alert("Your highness, our scouts have detected movement just beyond the Eastern Hills. We may be attacked in the coming weeks!")
}

function objToStringForPrompt(obj) {
	
	var overview = "";		
	if (depthOfObj(obj) == 1) {
		for (var i in obj) {
			if (i[6] == 't' && i[1] == 'e' && i[0] == 'p') {   //to check if value is a percent
			 overview += i + ": " + roundToHundredths(100 * obj[i]) + "\n";
			} else {
			overview += i + ": " + obj[i] + "\n";
			}
		}
	} else {
		for (var outer in obj) {
			var insideString = ""; 															
			for (var inner in obj[outer]) {
				if (inner[6] == 't' && inner[1] == 'e' && inner[0] == 'p') {   //to check if value is a percent									
					insideString += "    " + inner + ": " + roundToHundredths(100 * obj[outer][inner]) + "\n";	
				} else {
					insideString += "    " + inner + ": " + obj[outer][inner] + "\n";	
				}
			}
			if (outer[6] == 't' && outer[1] == 'e' && outer[0] == 'p') {   //to check if value is a percent	
				overview += outer + ":\n" + roundToHundredths(100 * insideString) + "\n";
			} else {
				overview += outer + ":\n" + insideString + "\n";
			}
		}
	}
	
	return overview;
}

function play_dominion() {

	var week = myDom.turn;
	
	document.getElementById("title").innerHTML = "Ruler " + myDom.name + " of " + myDom.dominion_name + " --<em> WEEK " + week + "</em><br>";
	document.getElementById("goals_in_upper_right").innerHTML = "GOALS BY WEEK 36:<br>1) Grow to 1000 acres<br>2) Grow to a population of 10,000";
	
	var mainOverview = "";
	for (var i in myDom.overview) { 							//to display the overview object
		mainOverview += i + ": " + myDom.overview[i] + "<br>";
	}

	document.getElementById("overview").innerHTML = "MAIN OVERVIEW:<br>" + mainOverview;
	document.getElementById("prompt").innerHTML = "\nYour Majesty, please choose an action from the following:";

	if (myDom.overview.land >= 1000 && myDom.overview.total_pop >= 10000) {
		alert("You've won! But you can keep playing to set a high score!");
	}
	
	if (week > 36 && (myDom.overview.land < 1000 || myDom.overview.total_pop < 10000)) {
		var play_again = prompt("RAWWWR you loser. Type in \"I'm not a loser!\" to play again");
		if (play_again === "I'm not a loser!") {
			return play_dominion();
	 }
	}		

	var button_statuses = document.getElementsByName("user_selection");
	for (var i=0, len = button_statuses.length; i < len; i++) {
		if (button_statuses[i].checked) {
			myDom.userSelection = button_statuses[i].value;
		}
	}
	
	switch (myDom.userSelection) {
		
		case "Construct":
		
			// alert(JSON.stringify(myDom.land, null, 4));
			
			var building_summary = objToStringForPrompt(myDom.land);

			var building = prompt("BUILDING SUMMARY:\n\n" + building_summary + "\n\n" + "Buildings cost " + myDom.cost.construction_plat + " platinum and " + myDom.cost.construction_lumber + " lumber.\n\n" + "Your Majesty, please type in a building type you want to build");				
			var building_qty = prompt("How many " + building + "(s) would you like to build?");
			var plat_cost = myDom.cost.construction_plat * building_qty;
			var lumber_cost = myDom.cost.construction_lumber * building_qty;

			if (myDom.land[myDom.building_profiles[building].land_type].barren >= building_qty && plat_cost <= myDom.overview.platinum && lumber_cost <= myDom.overview.lumber) {
				
				myDom.land[myDom.building_profiles[building].land_type].barren -= building_qty;
				myDom.overview.platinum -= plat_cost;
				myDom.overview.lumber -= lumber_cost;
				alert("Certainly at once! We will build " + building_qty + " " + building + "(s) at a cost of " + plat_cost + " platinum and " + lumber_cost + " lumber!");
				reloadForm();
			} else {
				alert("Your Majesty, our treasurer informs me that we have insufficient resources for your request! Also, I am a little hard of hearing and may have misinterpreted that. Can you please clarify?");
			}
			break;
			
		case "Train":
		
			var militaryOverview = objToStringForPrompt(myDom.military);		//to display the current military size
			var militaryCosts = "";

			for (var i in myDom.cost.military.plat) { 							//to display the military costs per person
				militaryCosts += i + ": " + myDom.cost.military.plat[i] + " platinum and " + myDom.cost.military.ore[i] + " ore.\n";
			}

			var toTrain = prompt("MILITARY OVERVIEW:\n\ndraft rate: " + myDom.draftRate * 100 + "%\ndraftees: " + myDom.overview.draftee + "\n" + militaryOverview + "\nYour Majesty, it would cost the following to train our military:\n\n" + militaryCosts + "\nWhat would you like to train?\n");
			
			if (toTrain == "draft rate") {
				myDom.draftRate = toTrainQty / 100;
				var newDraftRate = prompt("What new draft rate percent number do you want?");
				alert("We will change our draft rate to " + newDraftRate + "%!")
				
			} else {
				var toTrainQty = prompt("How many " + toTrain + "(s) would you like to train? If you want to change the draft rate, say a percent number.");
				var platCost = myDom.cost.military.plat[toTrain] * toTrainQty; 
				var oreCost = myDom.cost.military.ore[toTrain] * toTrainQty; 
							
				if (myDom.military.draftee >= toTrainQty && platCost <= myDom.overview.platinum && oreCost <= myDom.overview.ore) {
	
					myDom.military.toTrain += toTrainQty;
					myDom.overview.platinum -= platCost;
					myDom.overview.ore -= oreCost;
					alert("Certainly at once! We will train " + toTrainQty + " " + toTrain + "(s) at a cost of " + platCost + " platinum and " + oreCost + " ore!");
					reloadForm();
					
				} else {
					alert("Your Majesty, our treasurer informs me that we have insufficient resources for your request! Also, I am a little hard of hearing and may have misinterpreted that. Can you please clarify?");
				}
			}
	
			break;
			
		case "Invest":
		
		var castleOverview = objToStringForPrompt(myDom.castle);  //to display the castle overview
		var techAchievementOverview = objToStringForPrompt(myDom.techAchievements);

		var toInvest = prompt(castleOverview + "research points: " + myDom.overview.research_point + "\n\nTECHNOLOGICAL ACHIEVEMENTS with RESEARCH POINTS NEEDED(feature coming soon):\n" + techAchievementOverview + "\nYour Majesty, what part of our castle do you want to invest in?\n\n");
		var toInvestResource = prompt("What resource do you want to invest? (gem, lumber, ore, or platinum)");
		var toInvestQty = prompt(castleOverview + "\nYour Majesty, how many " + toInvestResource + "(s) would you like to invest in our castle?\n\n");
		
		if (toInvestQty <= myDom.overview[toInvestResource]) {

			switch (toInvestResource) {
			
				case "gem":
				
					myDom.castle[toInvest].amount += toInvestQty * 12;
					myDom.castle[toInvest].percent_improvement = myDom.constants.maxCastle[toInvest] * (1 - Math.exp(-1 * myDom.castle[toInvest].amount / (4000 * myDom.overview.land + 15000)));
					myDom.overview.gem -= toInvestQty;
					reloadForm();
					break;
				
				case "lumber":
				
				 	myDom.castle[toInvest].amount += toInvestQty * 2;
					myDom.overview.lumber -= toInvestQty;
					reloadForm();
					break;
					
				case "ore":
				
					myDom.castle[toInvest].amount += toInvestQty * 2;
					myDom.overview.ore -= toInvestQty;
					reloadForm();
					break;
					
				case "platinum":
				
					myDom.castle[toInvest].amount += toInvestQty * 1;
					myDom.overview.platinum -= toInvestQty;
					reloadForm();
					break;
			}	
				
			} else {
				alert("Your Majesty, our treasurer informs me that we have insufficient resources for your request! Also, I am a little hard of hearing and may have misinterpreted that. Can you please clarify?");
		}
		
		reloadForm();
		break;
			
		case "End Week":	
			alert("myDom.land.plain.farm + myDom.land.water.dock" + myDom.bonus.for_food + "myDom.overview.total_pop + myDom.overview.food");
			myDom.turn ++;
			myDom.overview.platinum += myDom.weeklyProd.plat_per_wk;
			myDom.overview.food += myDom.weeklyProd.food_per_wk;	
			myDom.overview.lumber += myDom.weeklyProd.lumber_per_wk;
			myDom.overview.mana += myDom.weeklyProd.mana_per_wk;
			myDom.overview.ore += myDom.weeklyProd.ore_per_wk;
			myDom.overview.gem += myDom.weeklyProd.gem_per_wk;
			myDom.overview.boat += myDom.weeklyProd.boat_per_wk;
			myDom.overview.research_point += myDom.weeklyProd.research_pts_per_wk;
				
			break;
	}
	
}


// Validating Empty Field
function check_empty() {

	if (document.getElementById('name').value == "" || document.getElementById('dominion_name').value == "") {
		alert("I beg your pardon? Can you please rephrase that?");
	} else {
		myDom.name = document.getElementById("name").value;
		myDom.dominion_name = document.getElementById("dominion_name").value;

		alert (myDom.name + "! As you can you can see beyond these balcony doors... and watch your step here, there is a random elevated marble step, don't ask me why talk to the architects... is your dominion of " + myDom.dominion_name + " that has been bestowed upon you. We must grow to the size of 1,000 acres and 10,000 population within 36 weeks! And if we don't?\n\n*shudders*\n\nYou don't want to know. Legend has it that if we do not meet these goals an indomitable creature would awaken and would call us the most terrible of names that would demoralize even the greatest of men.");
		document.getElementById('popup').style.display = "none";
		document.getElementById('intro').style.display = "none";
		document.getElementById('body').style.display = "block";
		document.getElementById('background_image').style.backgroundPosition = "top left";
		
		// var x = document.getElementById("default_selection").checked = true;		 //sets "End Week" as the default	user selection	
		// myDom.userSelection = "waiting for user";
		document.getElementById("radio_buttons").reset();
		play_dominion();
	}
}

function show_popup() {
	
document.getElementById('popup').style.display = "block";
document.getElementById('intro').style.display = "none";

}

function hide_popup() {
document.getElementById('popup').style.display = "none";
}



// Refactored Code

// It is a work in progress. I ended up naturally refactoring as I continued coding. For example, when I found I needed to convert an object to text, I just made a function for it to keep my code dry. I also started using the camel case notation instead of using underscores. However, I wanted to keep the underscores for the variables that end up getting displayed to the user since I think that is reasier to read.




// Reflection
// I ran into issues in my object where certain values couldn't be defined yet because it called upon keys within the object that are further down the object. So, I fixed this by rearranging the order of definitions.
// Unfortunately this game is not winnable yet because I didn't code for a way to gain land (by exploring or attacking). I hope to pick at this project until I get it at a point where all radio button actions are properly coded. I also want to actually write test code as I code. It would help me in cases where my new code may have broke something else that I did not foresee.
// 
//
//
//
//
//