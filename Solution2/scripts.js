window.onload = function PageLoad()
{
var theButton = document.getElementByClassName("thebutton");
	
theButton.addEventListener("click", SwitchHobby);
}
//After removing the onclick="SwitchHobby() from the button in html I have been unable to get the function working unobtrusively. 
//If you can provide feedback or critique it would be greatly appreciated.
function SwitchHobby()
{
var divsToHide = document.getElementsByClassName("Skiing"); 
var divsToShow = document.getElementsByClassName("Kayaking");
    	
	for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none";
		
    }
	for(var i = 0; i < divsToShow.length; i++){
        divsToShow[i].style.display = "inline";
    }
	
document.getElementById("button").remove()	
}

