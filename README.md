freeboard.io-node.js
=========

This is a datasource plugin to connect freeboard.io dashboards to real-time node.js servers.

  - Subscribe to real-time events using WebSockets (Sockets.io)
  - Listen for events from different servers
  - Restrict events from only certain [namespaces or rooms](http://socket.io/docs/rooms-and-namespaces/)

Installation
--------------

1. Place the file ```/datasources/plugin_node.js``` in  ```/js/freeboard/plugins``` of your freeboard.io installation.

2. Edit your freeboard.io main HTML file and add the plugin to the header:

```js
<script type="text/javascript">
	head.js(
			...
			"js/freeboard/plugins/plugin_node.js",
```

Testing
--------------

1. You can test this plugin by running the node.js **sample server** (located in the ```/datasources/plugin_nodejs_sample/``` folder) with this command:

```js
node plugin_node_sample_server.js
```

2. Open the **sample freeboard.io client** with your browser, e.g. Chrome, located at:

```js
/datasources/plugin_nodejs_sample/plugin_node_sample_client.html
```

Requirements
--------------

To run the sample server make sure you have following dependencies installed:

1. [Node.js](http://nodejs.org)
2. [Socket.io](http://socket.io)


Screenshots
--------------

In this screenshot, you can see the sample server and dashboard running with multiple clients receiving data in real-time.

![Image](/datasources/plugin_nodejs_sample/plugin_node_sample_example.png)

License
----

MIT
