/*
    ------------------
    Initialize Variables
    ------------------
*/

//Constants
const VERSION = 0.0;
const BOOT_TIME = new Date();
const SCHEDULED_TIME = 0;
const ADMINS = ["Dino", "α|CraftSpider|Ω", "HiddenStorys"];

//Chatzy Variables
var messageTable = "X8414";
var popup = "X5721";
var messageTime = "X2087";
var messageButton = "X5794"

//Command variables
var IsSleeping = 0;

//Writing Hour variables
var ScheduledActive = false;
var ScheduledDisactive = false;

/*
	--------------------------
    User Commands dictionaries
    --------------------------
*/
var Commands = {
	"hello": function() {
		postMessage("Hello World!");
	},
	"information": function() {
		postMessage("This is JSBot, a prototype Chatzy bot program.\nMy original Developers are CraftSpider, Dino, and HiddenStorys.");
	},
	"uptime": function() {
	    var uptime = Math.floor((new Date() - BOOT_TIME)/1000);
	    
	    var weeks = Math.floor(uptime / 604800);
	    uptime -= weeks * 604800;
	    var days = Math.floor(uptime / 86400);
	    uptime -= days * 86400;
	    var hours = Math.floor(uptime / 3600);
	    uptime -= hours * 3600;
	    var minutes = Math.floor(uptime / 60);
	    uptime -= minutes * 60;
	    var seconds = Math.floor(uptime);
	    
	    var upStr = (weeks?weeks + " week" + (weeks == 1?"":"s") + ", ":"") +
	                (days?days + " day" + (days == 1?"":"s") + ", ":"") +
	                (hours?hours + " hour" + (hours == 1?"":"s") + ", ":"") +
	                (minutes?minutes + " minute" + (minutes == 1?"":"s") + ", and ":"") +
	                seconds + " second" + (seconds == 1?"":"s") + ".";
	    
		postMessage("I've been online " + upStr);
	},
	"version": function() {
		postMessage("I'm currently on version " + VERSION);
	},
	"help": function (args) {
	    if (!args[0]) {
		    var helpList = "Hello. I'm JSBot, Chatzy prototype bot. My commands are:\n";
		    for (var C in Commands) {
		    	if(C.toLowerCase() != "roulette") {
		    		helpList += "^" + C + "\n";
		    	}
		    }
		    helpList += "\nMy Admin Commands are:\n";
		    for (var C in ADMIN_COMMANDS) {
		    	helpList += "^" + C + "\n"; 
		    }
		    postMessage(helpList);
	    } else {
	        switch (args[0]) {
	            case "help":
	                postMessage("Use: ^help [Command Name]\nDescription: Help command, by default returns general information about JSBot and a list of available commands. Adding the name of another command as an argument will return a more detailed description of that command.");
	                break;
	            case "hello":
	            	postMessage("Use: ^hello\nDescription: Extremely simple default command, to prove that JSBot is awake and alert.");
	            	break;
	            case "information":
	            	postMessage("Use: ^information\nDescription: Returns a short blurb about JSBot.");
	            	break;
	            case "kill":
	                postMessage("Use: ^kill\nDescription: Causes JSBot to immediately leave the chat, and cease running. Admin only.");
	                break;
	            case "toggleSleep":
	                postMessage("Use: ^toggleSleep [time]\nDescription: Turns user commands and related features off or on. Admin only.");
	                break;
	            case "uptime":
	            	postMessage("Use: ^uptime\nDescription: Returns how long, down to the second, that JSBot has been running.");
	            	break;
	            case "version":
	            	postMessage("Use: ^version\nDescription: The version that JSBot is currently running.");
	            	break;
	            default:
	                postMessage("Sorry, no available help page for that.");
	        }
	    }
	}
};

var ADMIN_COMMANDS = {
    "toggleSleep": function(time) {
    	if (IsSleeping == 0) {
    		IsSleeping = 1;
    		postMessage("Going to sleep" + (time[0]?" for " + time[0] + " minutes":"now") + ". To wake me, type [b]^toggleSleep[/b] again.");
    	} else {
    		IsSleeping = 0;
    		postMessage("I'm awake again" + (time[0]? " for " + time[0] + " minutes":"") + ". To send me back to sleep, type [b]^toggleSleep[/b].");
    	}
    	if(time[0]) {
    	    setTimeout(function(){
    	        ADMIN_COMMANDS.toggleSleep();
    	    }, time[0] * 60000);
    	}
	},
	"kill": function() {
		postMessage("Shutting Down");
		setInterval(function() {leaveChat();}, 200);
		throw new Error("JSBot Killed by Admin");
	},
};

/*
    -----------------
    Wrapper Functions
    -----------------
*/
function elementByID(elementID) {
    return document.getElementById(elementID);
}

function elementsByClass(elementClass) {
	return document.getElementsByClassName(elementClass);
}

function leaveChat() {
    elementByID("X7769").onclick();
}

function closePopup() {
	X8071();
}

function postMessage(message) {
    var HTMLTags = ["<b>", "</b>", "<i>", "</i>", "<s>", "</s>", "<u>", "</u>"];
    var ChatzyTags = ["[b]", "[/b]", "[i]", "[/i]", "[s]", "[/s]", "[u]", "[/u]"];
    for (var tag in HTMLTags) {
        message = message.replace(HTMLTags[tag],ChatzyTags[tag]);
    }
    X4727(message);
}

function closeChat() {
	postMessage("/close");
}

function openChat() {
	postMessage("/open");
}

function toggleChatLock() {
	if(X5170.X5289) { //Variable for whether the chat is locked, of course.
		postMessage("/open");
	} else {
		postMessage("/close");
	}
}

function searchMessages(term, poster) {
	postMessage("/find " + (poster?"{V:" + poster + "} ":"") + (term?term:""));
}

function privateMessage(name, message) {
	postMessage("/pm \"" + name + "\" " + message);
}

function globalMessage(message) { //Note, only sends the message to online users.
	var users = X3884.split("\n");
	for (var i = 1; i <= users[0]; i++) {
		user = users[i].split("	");
		privateMessage(user[0], message);	//Replace the 0 with other numbers to grab different values. 2 is last leave/exit, 4 is status, 5 is location.
	}
}

function editRoomBoard(message, method, key) {  //Method is the style of editing to use. Options are: 0/default, overwrite. 1, append. 2, prepend. 3, replace.
    postMessage("/rb");
    setTimeout(function() {
        var BoardMessage = elementByID("X6196");
        switch (method) {
            case 1:
                BoardMessage.value = BoardMessage.value + "\n" + message;
                break;
            case 2:
                BoardMessage.value = message + "\n" + BoardMessage.value;
                break;
            case 3:
                if (BoardMessage.value.match(new RegExp(key, "g")).length > 1) {
                    BoardMessage.value = BoardMessage.value.replace(new RegExp(key + ".+?" + key, "g"), key + message + key);
                }
                break;
            default:
                BoardMessage.value = message;
        }
        X565.onclick();
    }, 150);
}

//requires re-init of JSBot. Automate that?
function changeName(name) {
	X8752('X6610');T

	setTimeout(function() {
		X4964.value = name;
		X2575.onsubmit();
	}, 1000);
}

/*
	-------------------
	Arbitrary functions
	-------------------
*/

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/*
    -------------------
    Main loop functions
    -------------------
*/

function scheduledEvent() {
    d = new Date();
    
    if (d.getUTCHours() == SCHEDULED_TIME && d.getUTCMinutes() == 0 && !ScheduledActive) {
        postMessage("[b]Scheduled Event[/b] has begun!");
        ScheduledActive = true;
        ScheduledDisactive = false;
    } else if (d.getUTCHours() == (SCHEDULED_TIME == 23 ? 0 : SCHEDULED_TIME + 1) && d.getUTCMinutes() == 0 && !ScheduledDisactive) {
        postMessage("[b]Scheduled Event[/b] is over!");
        ScheduledDisactive = true;
        ScheduledActive = false;
    }
}

function readChat() {
    if (!elementByID("X4233") && elementByID(messageTable).firstChild.innerHTML != "Previous messages parsed (press ESC to re-parse page)") { //First check is if we're on a page with normal chat table. Second is that that page is parsed.
        return;
    }
	var Messages = elementByID(messageTable).innerHTML.split("\n");
	for (var i = 1; i < Messages.length; i++) {
		var Message = Messages[i];
		if (Message.match(/<b .*>(.*)<\/b>: \^(\w+)(?:\s(.+))?(?:&nbsp;)/)) { //Instead of matching a set list of commands, match the word then check it against a dict?
		    var User = RegExp.$1;
			var Command = RegExp.$2;
			var Args = RegExp.$3.split(/\s/);
		    var isAdmin = false;
			for (var U in ADMINS) {
			    if (User == ADMINS[U]) {
			        isAdmin = true;
			        break;
			    }
			}
			if (window["ADMIN_COMMANDS"][Command] && isAdmin) {
			    window["ADMIN_COMMANDS"][Command](Args);
			} else if (IsSleeping == 1) {
				break;
			} else if (window["ADMIN_COMMANDS"][Command] && !isAdmin) {
			    postMessage("Sorry, that command is Admin only.");
			} else if (window["Commands"][Command]) {
				window["Commands"][Command](Args);
			} else {
			    postMessage("Sorry, I don't understand that. May I suggest ^help?");
			}
		}
	}
	
	
	elementByID(messageTable).innerHTML = '<P class="b">Previous messages parsed (press ESC to re-parse page)</P>\n';
	X8614 = false;
}

function readPMs() {
    var ReceivedPM = elementByID(popup).innerHTML;
    if (ReceivedPM.match(/<!--X1046-->.+>(.+)<\/em>.+X5999">\^(\w+)[\W]?(?:\s(.+))?(?:<\/div><p)/)) {
        var User = RegExp.$1;
        var Command = RegExp.$2;
		var Args = RegExp.$3.split(/\s/);
		var isAdmin = false;
		for (var U in ADMINS) {
		    if (User == ADMINS[U]) {
		        isAdmin = true;
		        break;
		    }
		}
		if (window["ADMIN_COMMANDS"][Command] && isAdmin) {
		    window["ADMIN_COMMANDS"][Command](Args);
		} else if (IsSleeping == 1) {
			closePopup();
			return;
		} else if (window["ADMIN_COMMANDS"][Command] && !isAdmin) {
		    privateMessage("Sorry, that command is Admin only, and I don't recognize you!");
		} else if (window["Commands"][Command]) {
			window["Commands"][Command](Args);
		} else {
		    privateMessage("Sorry, I don't understand that. May I suggest ^help?");
		}
    }
}

function mainLoop() {
    readChat();
    scheduledEvent();
    readPMs();
    
}

/*
    -------------------
    Initialization Code
    -------------------
*/
elementByID(messageTable).innerHTML = '<P class="b">Previous messages parsed (press ESC to re-parse page)</P>\n';
X8614 = false;
setInterval(function() {mainLoop();}, 1000);
setInterval(function() {postMessage("");}, 60000*10);
