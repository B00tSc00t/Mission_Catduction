'use strict';

var container = document.createElement('div');  // create a div and reference it in js as the container variable
container.className = 'console';  // add class="console" to that div
document.querySelector('body').append(container);  // add our div to the html body at the end

var reactorIsOK = false;  // initial state, as a top-level variable

// call the makeConsole function (loaded onto window by js-console.js previously in the html),
// and pass the function our div, some paramaters, and keep reference to it with the controller variable:
var controller = window.makeConsole(container, {
    welcomeMessage: 'Welcome to ShipOS.  Type \"help\" for a list of available Unix commands.',
    promptLabel: '/home/engineer$ ',
    commandValidate: function(line){
        if (line == "") return false;
        else return true;
    },
    commandHandle: processInput,  // register our processInput function as the callback handler for when a command has been "entered"
    autofocus: true,
    animateScroll: true,
    promptHistory: false,
    charInsertTrigger: function(keycode,line) {
        // Never allow zero.
        return keycode != '\0'.charCodeAt();  // fixed bug from original examples!  needed to be \0, not just 0
    }
});

function processInput(cmdLine) {
    let params = cmdLine.split(" ");  // split input line into an array of paramaters, using space as delimiter

    switch(params[0]) {
        case 'help': {
            return [{msg: 'Available commands:  cd, ls, cat, echo, exit, hint', className: 'js-console-message-value'}];
        }
        case 'cd': {
            if(params[1])  {  // if there is more to the string than just cd, then deny the command;  no exploring the filesystem!
                return [{msg: 'Permission denied.', className: 'js-console-message-error'}];
            } else { 
                return [{msg: 'Current directory:  /home/engineer', className: 'js-console-message-value'}];
            }
        }
        case 'ls': {
            if(params[1])  {  // if there is more to the string than just ls, then deny the command;  no exploring the filesystem!
                // *** should we allow parameters like -l?  maybe later for bonus points
                return [{msg: 'Permission denied.', className: 'js-console-message-error'}];          
            } else {
                // var res = document.createElement('p');
                // res.innerHTML = 'Catmandu-coords.txt <strong>reset-reactor</strong>';  // *** trying to mix files types and color code them on the same line;  not working
                // return res;
                return [{msg: 'reset-reactor', className: 'js-console-message-value'}];
            }
        }
        case 'cat': {
            if(!params[1]) {
                return [{msg: 'Missing file parameter.  Did you think was real Unix where the cat command could be used alone?  Nope.', className: 'js-console-message-error'}];
            }
            if(params[1] === 'reset-reactor') {
                return [{msg: 'Cannot display the contents of executable file \'reset-reactor\'.  Permission denied.', className: 'js-console-message-error'}];
            } else {
                return [{msg: 'Unknown file.', className: 'js-console-message-error'}];
            }
        }
        case 'echo': {
            if(params[1]) {
                return [{msg: cmdLine.slice(5), className: 'js-console-message-value'}];  // splice the string, cutting out 'echo ' and keeping everything to the end (which is default if second param is omitted)
            }
            return '';  // no parameters?  just return an empty line
        }
        case './reset-reactor': {
            reactorIsOK = true;
            return [{msg: 'Reactor has been reset, ship\'s propulsion returning to normal!', className: 'js-console-message-value'}];
        }
        case 'hint': {
            return [{msg: 'Do a web search for how to execute Unix commands in the current directory.', className: 'js-console-message-value'}];
        }
        case 'exit': {
            // *** handle exit code here, go on to next scene or stay in previous one
            if(reactorIsOK) {
                return [{msg: 'EXITING, (reactor in GOOD state)...', className: 'js-console-message-value' }];
            } else {
                return [{msg: 'EXITING, (reactor still in bad state)...', className: 'js-console-message-value' }];
            }
        }

        default: {
            return [{msg: 'Unknown command', className: 'js-console-message-error' }];
        }
    }  // end of switch
}
