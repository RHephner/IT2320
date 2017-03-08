function displayAnimals(pets)
{
	var htmlText = "";
	var petsTotal = 0;
	var animalsAverage = 0;
	var count = 0;
	for (animals of pets.currentAnimals)
	{
		htmlText += " <br> <b>Type of Pet: </b>" + animals.animalType + "<br><br>";
		
		for(petsLineItem of animals.animalList)
		{
			htmlText += "<b>Pet Name: </b>" + petsLineItem.petName + "<br> <b>Age: </b>" + petsLineItem.petAge + "<br> <b>Color: </b>" + petsLineItem.petColor + "<br><br>";
			count++;
			petsTotal += petsLineItem.petAge;
			animalsAverage = (parseFloat(petsTotal / count).toFixed(2));
		}
		htmlText += "================ <br> <b> Total Age of Pets: </b>" + petsTotal + "<br>";
		
	}
	htmlText += "<b>Average  Age: </b>" + animalsAverage +  "<br> ================ <br>";
	$("#AnimalDiv").html(htmlText);
}


function DisplayAnimals()
{
	return {
		"currentAnimals" : [
			{
				"animalType" : "Dogs",
				"animalList" : 
				[		
					{
						"petName" : "Hughy",
						"petColor" : "Black",
						"petAge" : 7
						
					},
		
					{
						"petName" : "Abby",
						"petColor" : "White",
						"petAge" : 3
					}
				]
			},
			
			{
				"animalType" : "Cats",
				"animalList" : 
				[		
					{
						"petName" : "Indy",
						"petColor" : "White",
						"petAge" : 4
						
					},
		
				]
			},
			
			{
				"animalType" : "Horses",
				"animalList" : 
				[
		
					{
						"petName" : "Chi Chi",
						"petColor" : "Chestnut",
						"petAge" : 21
					},
		
					{
						"petName" : "Erie",
						"petColor" : "Bay",
						"petAge" : 2
					},
		
					{
						"petName" : "Baba",
						"petColor" : "Bay",
						"petAge" : 12
					},
					
					{
						"petName" : "Gunther",
						"petColor" : "Palimino",
						"petAge" : 10
					}
				]
			}		
		]
	};
}


$(document).ready(function()
{
	$("#ShowAnimalsButton").click(function()
	{
		var pets = DisplayAnimals();
		displayAnimals(pets);
	});
});