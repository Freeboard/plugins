// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ freeboard.io-node.js                                               │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2014 Hugo Sequeira (https://github.com/hugocore)       │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                    │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Simple node.js and sockets.io server to test the node.js plugin.   │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

/*
 * Configurations and helpers
 */
var namespace = '/shows';
var room = 'got';
var refreshTimer = 1000; 
var connectionscounter = 0;
var eventNames = ['house.stark.jon', 'house.lannister.tyrion'];
var serverport = 8989;

/*
 * Project dependencies
 */
var io = require('socket.io')(serverport);

/*
 * Collects data
 */

// Implement the methods to handle the new events
function newEventCallback(eventName, message) {

	// Construct the json object to be propagated
	var json = {
		value: message.value,
		time_stamp: message.time_stamp,
	};
	
	// Invokes propagation
	propagatesEvent(eventName, JSON.stringify(json));
}

// Connection to external data sources
function connectToExternalSources() {
	
	// Simulate the connection and new messages with a timer function
	setInterval(function() {
		for (var i=0; i<eventNames.length; i++) {
			
			// construct message
			var oneHourInMilis = 3600000;
			var message = {
				value: Math.floor(Math.random()*101),
				time_stamp: new Date().getTime()+(i*oneHourInMilis)
			};
			
			
			newEventCallback(eventNames[i], message);
			
		}
	}, refreshTimer);
	
}

/*
 * Data propagation
 */

// Propagates event through all the connected clients
function propagatesEvent(eventName, event) {
	if (connectionscounter>0) {
		io.of(namespace).to(room).emit(eventName, event);
		console.log("New event propagated in: Namespace='%s' Room='%s' EventName='%s' Event='%s'", namespace, room, eventName, event);
	}
}

/*
 * Handle Sockets.io connections
 */

// Event handlers
io.of(namespace).on('connection', function(socket) {
	
	console.log("New client connected.");
	
	// Do some logic for every new connection
	connectionscounter++;
	
	// On subscribe events join client to room
    socket.on('subscribe', function(room) {
    	socket.join(room);
    	console.log("Client joined room: " + room);
    });
        
    // On disconnect events
    socket.on('disconnect', function(socket) {
    	console.log("Client disconnect from rooms.");
    	connectionscounter--;
    });
    
});

function puts(message) {
	console.log(message);
}

/*
 *  Run
 */
console.log("Starting Node.js server with namespace='%s' and room='%s'", namespace, room);
connectToExternalSources();