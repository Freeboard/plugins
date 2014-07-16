// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ freeboard.io-node.js                                               │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2014 Hugo Sequeira (https://github.com/hugocore)       │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                    │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Freeboard datasource plugin for node.js and socket.io.             │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function() {
	
	var nodeJSDatasource = function(settings, updateCallback) {

		var self = this,
			currentSettings = settings,
			url,
			socket,
			newMessageCallback;

		function onNewMessageHandler(message) {
			var objdata = JSON.parse(message);
			if (typeof objdata == "object") {
				updateCallback(objdata);
			} else {
				updateCallback(data);
			}
		}

		function joinRoom(roomName, roomEvent) {
			// Sends request to join the new room
			// (handle event on server-side)
			self.socket.emit(roomEvent, roomName);
			console.info("Joining room '%s' with event '%s'", roomName, roomEvent);
		}

		function discardSocket() {
			// Disconnect datasource websocket
			if (self.socket) {
				self.socket.disconnect();
			}
		}
		
		function connectToServer(url, rooms) {
			// Establish connection with server
			self.url = url;
			self.socket = io.connect(self.url,{'forceNew':true});

			// Join the rooms
			self.socket.on('connect', function() {
				console.info("Connecting to Node.js at: %s", self.url);
			});
			
			// Join the rooms
			_.each(rooms, function(roomConfig) {
				var roomName = roomConfig.roomName;
				var roomEvent = roomConfig.roomEvent;

				if (!_.isUndefined(roomName) && !_.isUndefined(roomEvent)) {
					joinRoom(roomName, roomEvent);
				}

			});
			
			self.socket.on('connect_error', function(object) {
				console.error("It was not possible to connect to Node.js at: %s", self.url);
			});
			
			self.socket.on('reconnect_error', function(object) {
				console.error("Still was not possible to re-connect to Node.js at: %s", self.url);
			});
			
			self.socket.on('reconnect_failed', function(object) {
				console.error("Re-connection to Node.js failed at: %s", self.url);
				discardSocket();
			});
			
		}


		function initializeDataSource() {
			// Reset connection to server
			discardSocket();
			connectToServer(currentSettings.url, currentSettings.rooms);

			// Subscribe to the events
			var newEventName = currentSettings.eventName;
			self.newMessageCallback = onNewMessageHandler;
			_.each(currentSettings.events, function(eventConfig) {
				var event = eventConfig.eventName;
				console.info("Subscribing to event: %s", event);
				self.socket.on(event, function(message) {
					self.newMessageCallback(message);
				});
			});
		}

		this.updateNow = function() {
			// Just seat back, relax and wait for incoming events
			return;
		};

		this.onDispose = function() {
			// Stop responding to messages
			self.newMessageCallback = function(message) {
				return;
			};
			discardSocket();
		};

		this.onSettingsChanged = function(newSettings) {
			currentSettings = newSettings;
			initializeDataSource();
		};
		
		initializeDataSource();
	};

	freeboard
			.loadDatasourcePlugin({
				type_name : "node_js",
				display_name : "Node.js (Socket.io)",
				description : "A real-time stream datasource from node.js servers using socket.io.",
				external_scripts : [ "https://cdn.socket.io/socket.io-1.0.6.js" ],
				settings : [
						{
							name : "url",
							display_name : "Server URL",
							description : "(Optional) In case you are using custom namespaces, add the name of the namespace (e.g. chat) at the end of your URL.<br>For example: http://localhost/chat",
							type : "text"
						},
						{
							name : "events",
							display_name : "Events",
							description : "The name of the events you want this datasource to subscribe to.",
							type : "array",
							settings : [ {
								name : "eventName",
								display_name : "Event",
								type : "text"
							} ]
						},
						{
							name : "rooms",
							display_name : "(Optional) Rooms",
							description : "In case you are using rooms, specify the name of the rooms you want to join. Otherwise, leave this empty.",
							type : "array",
							settings : [ {
								name : "roomName",
								display_name : "Room name",
								type : "text"
							}, {
								name : "roomEvent",
								display_name : "Name of the event to join the room",
								type : "text"
							} ]
						} ],
				newInstance : function(settings, newInstanceCallback,
						updateCallback) {
					newInstanceCallback(new nodeJSDatasource(settings,
							updateCallback));
				}
			});
}());