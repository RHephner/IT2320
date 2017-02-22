var Home = {};

var selectedCell = "";
var cellBackGround = "";

$(document).ready(function () {
    var cells = $(".cell");
    var colorCount = 0;

    for (var i = 0; i < cells.length; i++)
    {   //sets up checkerboard array
        var cell = $(cells[i]);
        var isDark = colorCount % 2 == 0;
        var isNextRow = (i + 1) % 8 == 0;
        colorCount += isNextRow ? 2 : 1;
        cell.css("background-color", isDark ? "navy" : "white");

        $(cell).click(function ()
        {
            var thisCell = $(this);
            thisCellClass = thisCell.attr("class");
            if (selectedCell.length > 0)
            {
                //moves cell to selected location
                thisCell.attr("class", selectedCell.attr("class"));
                selectedCell.attr("class", "cell"); 
                
                //remove hightlight and reset cell state
                thisCell.removeClass("highlight"); 
                selectedCell.css("background-color", cellBackGround);
                cellBackGround = "";
                selectedCell = "";
            }
            else
            {
                if (thisCellClass.length > 1) 
                {
                    //selects and highlights cell
                    cellBackGround = thisCell.css("background-color");
                    thisCell.addClass("highlight");
                    selectedCell = thisCell;
                }
            }
        });
    }
});