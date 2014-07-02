freeboard.io-node.js
=========

This is a datasource plugin to connect freeboard.io dashboards to real-time node.js servers.

  - Subscribe to real-time events using WebSockets (Sockets.io)
  - Listen for events from different servers
  - Restrict events from only certain [namespaces or rooms](http://socket.io/docs/rooms-and-namespaces/)

Installation
--------------

1. Place the file ```/datasources/plugin_node.js``` in  yours freeboard.io plugins folder (```freeboard-master/js/freeboard/plugins```).

2. Edit your freeboard.io main HTML file and add the plugin to the header:

```js
<script type="text/javascript">
	head.js(
			...
			"js/freeboard/plugins/plugin_node.js",
```

Testing
--------------

1. Follow the steps of the installation section to place the ```/datasources/plugin_node.js``` file in yours freeboard.io plugins folder (```freeboard-master/js/freeboard/plugins```).

2. You can run the **sample node.js server** (located at ```/datasources/plugin_nodejs_sample/plugin_node_sample_server.js```) with this command:

```js
node plugin_node_sample_server.js
```

3. Place and open the **sample freeboard.io dashboard** (located at ```/datasources/plugin_nodejs_sample/plugin_node_sample_client.html```) in yours freeboard.io root folder (```freeboard-master/```).

Requirements
--------------

To run the sample server make sure you have following dependencies installed:

1. [Node.js](http://nodejs.org)

2. [Socket.io](http://socket.io)

Screenshots
--------------

In this screenshot, you can see the sample server and dashboard running with multiple clients receiving data in real-time.

![Image](/datasources/plugin_nodejs_sample/plugin_node_sample_screenshot.png)

License
----

MIT
