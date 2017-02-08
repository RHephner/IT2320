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