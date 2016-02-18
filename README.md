# Demonstration Code for "Developer Week 2016" Presentation

This repository contains the demonstration code I used during my presentation at the "Developer Week 2016" conference on "Internet of (JavaScript) Things". The demonstrations showed you how to create Internet of Things applications with JavaScript, using tools like Node-RED, MQTT and IBM Bluemix. If you want to run the demos again, follow the steps below...

## Node-RED Running Locally

1. Install [Node-RED](http://nodered.org)
2. Install [SensorTag](http://flows.nodered.org/node/node-red-node-sensortag) and [Blink(1)](http://flows.nodered.org/node/node-red-node-blink1) nodes
3. Import message flow in [local_flows.json](https://github.com/jthomas/developer_week_2016/blob/master/local_flows.json)

## Node-RED on IBM Bluemix

1. Sign-up for [IBM Bluemix](https://bluemix.net)
2. Deploy [Node-RED Boilerplate]()
3. Create [IOTF service](https://internetofthings.ibmcloud.com/#/) and register devices.
4. Run local bridge code, [blink1_bridge.js](https://github.com/jthomas/developer_week_2016/blob/master/blink1_bridge.js) and [sensortag_bridge.js](https://github.com/jthomas/developer_week_2016/blob/master/sensortag_bridge.js) 
5. Import message flow from [mqtt_flows.json](https://github.com/jthomas/developer_week_2016/blob/master/mqtt_flows.json) 

Slides for my talk are available [here](https://speakerdeck.com/jthomas/internet-of-javascript-things).

