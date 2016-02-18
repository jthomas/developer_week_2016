'use strict'

const Blink1 = require('node-blink1')
const Client = require('ibmiotf')

const COLOURS = {
  "red":"#FF0000", "green":"#00FF00", "blue":"#0000FF", "cyan":"#00FFFF",
  "white":"#FFFFFF", "warmwhite":"#FDF5E6", "oldlace":"#FDF5E6",
  "purple":"#800080", "magenta":"#FF00FF", "pink":"#FF69B4",
  "yellow":"#FFFF00", "amber":"#FFD200", "orange":"#FFA500",
  "black":"#000000", "off":"#000000"
}

var blink1 = new Blink1()
blink1.setRGB(255, 255, 255)
blink1.fadeToRGB(1000, 0, 0, 0)

/**
 * You need to register your devices through IBM Bluemix's
 * IOT service (https://internetofthings.ibmcloud.com) and 
 * fill in the authentication details here...
 */
const config = {
  "org" : "",
  "id" : "blink1",
  "type" : "blink1",
  "auth-method" : "token",
  "auth-token" : ""
}

function connectToBroker(config) {
  let deviceClient = new Client.IotfDevice(config);

  deviceClient.connect()

  deviceClient.on("connect", function () {
    console.log("Connected to MQTT Broker.")
  });

  deviceClient.on("error", function (err) {
    console.error("IOTF Error: ", err)
  })

  deviceClient.on("command", (commandName, format, payload, topic) => {
    const colour = payload.toString().toLowerCase()
    if (commandName === 'blink' && COLOURS.hasOwnProperty(colour)) {
      const rgb = COLOURS[colour]
      const r = parseInt(rgb.slice(1,3), 16)
      const g = parseInt(rgb.slice(3,5), 16)
      const b = parseInt(rgb.slice(5), 16)
      blink1.fadeToRGB(250, r, g, b)
    }
  })
}

connectToBroker(config)
