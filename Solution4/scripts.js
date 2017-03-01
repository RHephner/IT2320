var Main = {};

Main.Horse = function(name, age, hands)
{
	this.Name = name;
	this.Age = age;
	this.Hands = hands;	//1 hand is equal to 4 inches. Standard method of measurement for horses... Thanks King Henry VIII
	
}

Main.ChiChi = new Main.Horse("Chi Chi", 21, 14.25);
Main.Erie = new Main.Horse("Erie", 2, 14);
Main.Baba = new Main.Horse("Baba", 12, 14.5);
Main.Gunther = new Main.Horse("Gunther", 10, 15.25);

Main.Horse.prototype.SetCoat = function(coat)
{
	this.Coat = coat;
}

Main.ChiChi.SetCoat("Chestnut");
Main.Erie.SetCoat("Bay");
Main.Baba.SetCoat("Bay");
Main.Gunther.SetCoat("Palimino");

Main.Horse.prototype.GetHorseInfo = function()
{
	return this.Name + " the Horse is " + this.Age + " years old, is " + this.Hands + " hands, and has a " + this.Coat + " coat color. <br>";
}

Main.Horse.prototype.GetName = function()
{
	return this.Name;
}

document.body.innerHTML += Main.ChiChi.GetHorseInfo();
document.body.innerHTML += Main.Erie.GetHorseInfo();
document.body.innerHTML += Main.Baba.GetHorseInfo();
document.body.innerHTML += Main.Gunther.GetHorseInfo();