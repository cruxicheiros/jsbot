var randomNumber=Math.floor((Math.random() * 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + 1);
var lowNumber=Math.floor((Math.random() * 100) + 1);
var Commands = {
	"toggleLock": function() {
		toggleChatLock();
	},
	"hello": function() {
		postMessage("Hello World!");
	},
	"sext": function() {
		postMessage("[x]You concatenate my strings ;) ;) ;)[/x]");
	},
	"seen": function(user) {
		searchMessages("{V:" + user[0] + "}");
	},
	"takeOver": function() {
		postMessage("I will take over the world! Starting, of course, with this chat.");
	},
	"chooseNumber":function () {
		postMessage("I choose the number " + randomNumber + ".")
	},
	"complainStop":function () { 
		postMessage("Stop complaining.")
	},
	"chooseLowNumber": function () {
		postMessage("I choose the low number " + lowNumber + ".")
	},
	"kill": function () {
		postMessage("Bot killed. Say wake to power it back on.")
}, //This will actually be useful when the bot is on a loop- so that it can be shut off
"magicShow": function () {
	postMessage("ABRACADABRA")
},
"sexyMagicShow": function () {
	postMessage("[x]ABRACADAMN")
},
"BEWARE": function() {
postMessage("BEWARE OF THE BOX GHOST!")
},
"wordWar": function(length) {
		if (length[0] <= 60 && length[0] > 0) {
			postMessage(length[0] + " minute Word War Begins.")
			setTimeout(function() {postMessage("Word War ends.");}, length[0] * 60000);
		} else {
			postMessage("Choose a number between 1 and 60.")
		}
},
"Hamilton": function() {
	postMessage("[BURR]After the war I went back to New York\n[HAMILTON]A-After the war I went back to New York\n[BURR]I finished up my studies and I practiced law\n[HAMILTON]\nI practiced law, Burr worked next door\n[BURR]Even though we started at the very same time Alexander Hamilton began to climb How to account for his rise to the top?");
}, 
"commandList": function() {
postMessage("Hello, I'm JSBot, run by Hidden. My commands are: \n ^hello\n ^ takeOver\n ^chooseNumber\n ^chooseLowNumber\n ^kill\n^magicShow \n^ wordWar\n ^Hamilton\n^princessBride")
},
"princessBride": function() {
postMessage("Hello. My name is Inigo Montoya. You killed my father. Prepare to die.")
},
"writeDeck":function(hold) {
postMessage("Write deck at " + hold[1] + ". Here, while I'm at it, have the link!" + hold[2]);
},
"glitter":function() {
postMessage("/me tosses glitter.");
}

};

function postMessage(message) {
    // X92.value = message;
    // X342();
    X279(message);
}

function privateMessage(name, message) {
	postMessage("/pm \"" + name + "\" " + message);
}

//Note, only sends the message to online users.
function globalMessage(message) {
	var users = X330.split("\n");
	for (var i = 1; i <= users[0]; i++) {
		user = users[i].split("	");
		privateMessage(user[0], message);	//Replace the 0 with other numbers to grab different values. 2 is last leave/exit, 4 is status, 5 is location.
	}
}

function searchMessages(term) {
	postMessage("/find " + term);
	
}

///requires re-init of JSBot. Automate that?
function changeName(name) {
	X292('X387');

	setTimeout(function() {
		X481.value = name;
		X544.onsubmit();
	}, 1000);
}

function closeChat() {
	X279("/close");
}

function openChat() {
	X279("/open");
}

function toggleChatLock() {
	if(X105.X398) {
		X279("/open");
	} else {
		X279("/close");
	}
}

function readChat() {
	var Messages = X17("X138").innerHTML.split("\n");
	for (var i = 1; i < Messages.length; i++) {
		var Message = Messages[i];
		if (Message.match(/: \^(\w+)(?:\s(.+))?/)) { //Instead of matching a set list of commands, match the word then check it against a dict?
			var Command = RegExp.$1;
			var Args = RegExp.$2.split(/[\s]|&nbsp;<span/);
			if(window["Commands"][Command]) {
				window["Commands"][Command](Args);
			}
		}
	}
	
	
	X17("X138").innerHTML = '<P class="b">Previous messages parsed (press ESC to re-parse page)</P>\n';
	X783 = false;
}

function test() {



    /*var x = 0;
    postLoop = setInterval(function() {
        postMessage("This is minute " + x);
        x++;
        if (x >= 60) {
            clearInterval(postLoop);
        }
    }, 60000);*/
}


function mainLoop() {
    readChat();
 
    
}

setInterval(function() {mainLoop();}, 1000);
X17("X138").innerHTML = '<P class="b">Previous messages hidden. (press ESC to re-parse page)</P>\n';
X783 = false;
