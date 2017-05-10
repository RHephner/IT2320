var Home = {};

Home.addOrUpdateButtonClick = function (account, elementName, errorLoc, elementValue, elementMsg)
{
    Home.ResetErrors();
    var username = account.username;
    $('.msg').text("");
    $.ajax(
    {
        url: "Home/AddOrUpdateElement",
        data: { username, elementName, elementValue },
        success: function (result)
        {
            var data = JSON.parse(result);
            if (data.Message != "Success")
            {
               Home.SetError(errorLoc, elementMsg, data.Error);
            }
            else {
                payload = JSON.parse(data.Payload);
                Home.rebuildAcctGrid(payload.account);
            }
        }
    });
}

Home.bindToMouseOverAndOut = function ()
{
    $(".button").mouseover(function () { $(this).css({ "color": "#009b9b", "border": "1px solid black", "background-color": "white" }) });
    $(".button").mouseout(function () { $(this).css({ "color": "white", "border": "none", "background-color": "#009b9b" }) });
}

Home.bindAcctGridButtons = function (account)
{
    $(".updateButton").click(function ()
    {
        var name = $(this).siblings('.col1').text();
        var elementName = $(this).siblings('.col1');
        var elementValue = $(this).siblings('.col2');
        var dataValue = $(this).siblings('.col2').val();
        var elementMsg = $(this).siblings('.msg');
        Home.addOrUpdateButtonClick(account, name, elementValue, dataValue, elementMsg);
    });
}

Home.resetAddElementData = function ()
{
    $(".elementName:first").val('');
    $(".elementValue:first").val('');
}
//error CSS
Home.SetError = function (elementValue, elementMsg, errorMsg)
{
    elementMsg.text(errorMsg);
    elementMsg.css("display", "block");
    elementValue.focus();
    elementValue.css("border-color", "red");

}
//page 2 Element Builder
Home.buildAcctGridRow = function (elementName, elementValue)
{
    var accountGrid = $(".accountGrid");
    accountGrid.append($("<div></div>").addClass("row"));
    if (elementName == "username")
    {
        $('.accountGrid').children('.row:last').append($("<div></div>").addClass("col1")
                    .text("AccountName"));
        $('.accountGrid').children('.row:last').append($("<div></div>").addClass("col2 " + elementName).text(elementValue));
    }
        
    /* else if (elementName == "password") {

        $('.accountGrid').children('.row:last').append($("<div></div>").addClass("col1")
                    .text("Password"));
        $('<input/>').attr({ type: "text", class: "col2 textbox " + elementName })
            .appendTo($('.accountGrid').children(".row:last"));
        $('.accountGrid').children('.row:last').children('.textbox').val(elementValue);
    }
	
	else if (elementName == "emailadd"){

        $('.accountGrid').children('.row:last').append($("<div></div>").addClass("col1")
                    .text("Email"));
        $('<input/>').attr({ type: "text", class: "col2 textbox " + elementName })
            .appendTo($('.accountGrid').children(".row:last"));
        $('.accountGrid').children('.row:last').children('.textbox').val(elementValue);
    } */
	
    else
    {
		 
        $('.accountGrid').children('.row:last').append($("<div></div>").addClass("col1")
                    .text(elementName));
        $('<input/>').attr({ type: "text", class: "col2 textbox " + elementName })
            .appendTo($('.accountGrid').children(".row:last"));
        $('.accountGrid').children('.row:last').children('.textbox').val(elementValue);
    }
	
    $('.accountGrid').children('.row:last').append($("<div></div>").text("Update")
        .addClass("col3 button updateButton"));
 
    $('.accountGrid').children('.row:last').append($("<div></div>").addClass("msg " + elementName + "Msg"));
	
}

Home.rebuildAcctGrid = function (account)
{
    Home.buildAccountGrid(account);
    Home.resetAddElementData();
    $(".button").click(Home.ResetErrors);
    Home.bindToMouseOverAndOut();
}

Home.buildAccountGrid = function (data)
{
    var property = data;
    var username = data.username;
    var accountGrid = $(".accountGrid");
    accountGrid.empty();

    for (var name in property)
    {
        Home.buildAcctGridRow(name, property[name]);
    }
    
    $('.accountGrid').children('row:first').children('.col1').css("font-weight", "bold");
    $(".accountGrid .row .updateButton").first().css("display", "none");
    $('.accountGrid').children('row:first').children('.updateButton').hide();

    Home.bindAcctGridButtons(property);
}
Home.animatePages = function ()
{
    $(".page1").animate({
        left: '-480px', easing: "linear",
        speed: 50, height: 'hide' });

    $(".page2").css("display", "inline-block");
    
    $(".page2").animate({
        left: '0px', easing: "linear",
        speed: 50, height: 'show' });
}

Home.buildAddElementGrid = function (account)
{
// Add Element Grid
    $(".page2").append($("<div></div>").addClass("addElementGrid"));
    var addElementGrid = $(".addElementGrid");

    addElementGrid.append($("<div></div>").addClass("row"));
    $(".row:last").append($("<div></div>").addClass("col1").text("ElementName"));
    $('<input/>').attr({ type: "text", class: "col2 textbox elementName" })
                 .appendTo($(".row:last"));

    addElementGrid.append($("<div></div>").addClass("row"));
    $(".row:last").append($("<div></div>").addClass("col1").text("ElementValue"));
    $('<input/>').attr({ type: "text", class: "col2 textbox elementValue" })
                 .appendTo($(".row:last"));
//error and button handling
    addElementGrid.append($("<div></div>").addClass("msg elementMsg"));

    addElementGrid.append($("<div></div>").addClass("buttonRow row"));
    $(".row:last").append($("<div></div>").text("Add").addClass("button addButton"));
    $(".addButton").click(function ()
    {
       Home.addOrUpdateButtonClick(account, $(".elementName").val(), $(".elementName"), $(".elementValue").val(), $(".elementMsg"));
    });
}

Home.buildPage2 = function (account)
{
// assign CSS
    $(".home").addClass("home-page2");
    $("h1").addClass("h1-page2");
    $(".stdParagraph").addClass("stdParagraph-page2");
// accountGrid
   $(".page2").append($("<div></div>").addClass("accountGrid"));//create accountGrid
   Home.buildAccountGrid(account);
   Home.buildAddElementGrid(account);
// mouseevent
   $(".button").click(Home.ResetErrors);
   Home.bindToMouseOverAndOut();

   Home.animatePages();
}

Home.ResetPage2Errors = function ()
{

}

Home.AccountError = function (username, usernameMsg, data)
{
   var errorMsg = "Unknown error; Contact Tech Support.";
   if (data.Username == "Invalid") 
       errorMsg = "Username does not exist.";
   Home.SetError($(".username:last"), $("usernameMsg:last"), errorMsg);
}

Home.GetAccount = function (username, usernameMsg)
{
    $.ajax({
        url: "Home/GetAccountInformation",
        data: { "Username": username.val() },
        success: function (result)
        {
            var data = JSON.parse(result);
            if (data.Message == "Success")
            {
                var payload = JSON.parse(data.Payload);
                Home.buildPage2(payload.account);
            }
            else
                Home.AccountError(username, usernameMsg, data);
        }
    });
}
//create account errors
Home.NewAcctError = function (username, usernameMsg, data)
{
    var errorMsg = "";
    if (data.EmailCon == "Invalid" || data.EmailCon == "Mismatch") 
    {
        errorMsg = (data.EmailCon == "Invalid" ?
               "E-mail address confirmation is required." :
               "E-mail confirmation does not match.");
        Home.SetError($(".emailCon"), $(".emailConMsg"), errorMsg)
    }
    if (data.EmailAdd == "Invalid")
    {
        errorMsg = "E-mail address is required and must contain an '@'.";
        Home.SetError($(".emailadd"), $(".emailaddMsg"), errorMsg)
    }
    if (data.Password == "Invalid")
    {
        errorMsg = "Password must contain at least six characters.";
        Home.SetError($(".password:last"), $(".passwordMsg:last"), errorMsg);
    }
		
    if (data.Username == "Invalid" || data.Username == "Exists")
    {
        errorMsg = (data.Username == "Invalid" ?
              "Username must be at least 6 characters." :
              "The username you entered is already taken.");
        Home.SetError($(".username:last"), $(".usernameMsg:last"), errorMsg);
    }
}
//login errors
Home.LoginError = function (username, usernameMsg, data)
{
    var errorMsg = "";
    if (data.Username == "Invalid")
    {
          errorMsg = "Must be an existing account username.";
          Home.SetError($(".username:first"), $(".usernameMsg:first"), errorMsg);
    }
    else if (data.Password == "Wrong")
    {
       errorMsg = "Wrong password for existing account.";
       Home.SetError($(".password:first"), $(".passwordMsg:first"), errorMsg);
    }
    else
    {
       errorMsg = "An unknown user error; Contact Tech Support.";
       Home.SetError($(".username:first"), $(".usernameMsg:first"), errorMsg);
    }
}

Home.ResetLoginData = function ()
{
    $(".username:first").val('');
    $(".password:first").val('');
}

Home.ResetNewAcctData = function ()
{
    $(".username:last").val('');
    $(".password:last").val('');
    $(".emailadd").val('');
    $(".emailCon").val('');
}

Home.createRow = function (parent, labelName, className)
{
// create content row
    parent.append($("<div></div>").addClass("row"));
    var row = $(".row:last");
// create columns
    row.append($("<div></div>").text(labelName).addClass("col1"));

    row.append($("<div></div>").addClass("col2"));
    $('<input/>').attr({ type: "text", class: "textbox" + " " + className }).appendTo($(".col2:last"));
// error messages
    var errorClass = "msg " + className + "Msg";
    parent.append($("<div></div>").addClass(errorClass));
}

Home.NewAcctButtonClick = function ()
{
    Home.ResetLoginData();
    var username = $(".username:last");
    var usernameMsg = $(".usernameMsg:last");
    $.ajax(
    {
        url: "Home/CreateAccount",
        data:
        {
            "Username": username.val(),
            "Password": $(".password:last").val(),
            "EmailAdd": $(".emailadd").val(),
            "EmailCon": $(".emailCon").val()
        },
        success: function (result)
        {
            var data = JSON.parse(result);
            data.Message == "Success" ?
               Home.GetAccount(username, usernameMsg) :
               Home.NewAcctError(username, usernameMsg, data);
        }
    });
}

Home.LoginButtonClick = function ()
{
    Home.ResetNewAcctData();
    var username = $(".username:first");
    var usernameMsg = $(".usernameMsg:first");
    $.ajax(
    {
        url: "Home/Login",
        data:
        {
            "Username": username.val(),
            "Password": $(".password:first").val()
        },
        success: function (result)
        {
            var data = JSON.parse(result);
            data.Message == "Success" ?
                 Home.GetAccount(username, usernameMsg) :
                 Home.LoginError(username, usernameMsg, data);
        }
    });
}

Home.ResetErrors = function ()
{
    $(".msg").text("");
    $(".msg").css("display", "none");
    $(".textbox").css({"border-color": "black", "border-width": "1px" });
}

Home.buildLoginGrid = function (page)
{
// Create Login Grid
    page.append($("<div></div>").addClass("loginGrid"));
    var loginGrid = $(".loginGrid");
// add rows 1 and 2
    loginGrid.append($("<h2></h2").text("Log In").addClass("loginHeader"));
    var textString = "Already have an account with us? ";
    textString += "Returning users may log in by entering ";
    textString += "their site username and password.";
    loginGrid.append($("<div></div>").text(textString).addClass("loginBox1"));
    loginGrid.append($("<div></div>").addClass("loginBox2"));

    var loginBox2 = $(".loginBox2");
    Home.createRow(loginBox2, "Username", "username");
    Home.createRow(loginBox2, "Password", "password"); 
// buttons
    loginBox2.append($("<div></div>").addClass("buttonRow row"));
    $(".row:last").append($("<div></div>").text("Log In").addClass("button loginButton"));
}

Home.buildNewAccountGrid = function (page)
{
// Create Account Grid
    page.append($("<div></div>").addClass("newAcctGrid"));
    var newAcctGrid = $(".newAcctGrid");
// description
    newAcctGrid.append($("<h2></h2").text("Create New Account").addClass("newAcctHeader"));
    var textString = "New users, please create a new account by ";
    textString += "providing us with some basic information.";
    newAcctGrid.append($("<div></div>").text(textString).addClass("newAcctBox1"));
// boxes
    newAcctGrid.append($("<div></div>").addClass("newAcctBox2"));
    var newAcctBox2 = $(".newAcctBox2");

    Home.createRow(newAcctBox2, "Username", "username"); 
    Home.createRow(newAcctBox2, "Password", "password"); 
    Home.createRow(newAcctBox2, "E-mail Address", "emailadd"); 
    Home.createRow(newAcctBox2, "Repeat E-Mail Address", "emailCon");
// buttons
    newAcctBox2.append($("<div></div>").addClass("buttonRow row")); 
    $(".row:last").append($("<div></div>").text("Create Account").addClass("button newAcctButton")); 
}


Home.bindPage1Events = function ()
{
    $(".button").mouseover(function () { $(this).css({ "background-color": "white", "color": "#009b9b", "border": "1px solid black" }) });
    $(".button").mouseout(function () { $(this).css({ "background-color": "#009b9b", "color": "white", "border": "none" }) });
    $(".button").click(Home.ResetErrors);
    $(".loginButton").click(Home.LoginButtonClick);
    $(".newAcctButton").click(Home.NewAcctButtonClick);
}

Home.buildPage1 = function ()
{
    var page = $(".page1");
    Home.buildLoginGrid(page);
    page.append($("<div></div>").addClass("separator"));
    Home.buildNewAccountGrid(page);
}

$(document).ready(function ()
{
    $(document).ajaxError(function ()
    {
        alert("An error occurred on the website! Please contact Tech Support.");
    });
    Home.buildPage1();
    Home.bindPage1Events();
});