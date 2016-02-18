'use strict'

const SensorTag = require('sensortag')
const Client = require('ibmiotf')

/**
 * You need to register your devices through IBM Bluemix's
 * IOT service (https://internetofthings.ibmcloud.com) and 
 * fill in the authentication details here...
 */
const config = {
  "org" : "",
  "id" : "sensortag",
  "type" : "sensortag",
  "auth-method" : "token",
  "auth-token" : ""
}

function connectToBroker(config, cb) {
  let deviceClient = new Client.IotfDevice(config);

  deviceClient.connect()

  deviceClient.on("connect", function () {
    console.log("Connected to MQTT Broker.")
    cb(deviceClient)
  });

  deviceClient.on("error", function (err) {
    console.error("IOTF Error: ", err)
  })
}

function connectToSensorTag(cb) {
  console.log('Looking for available sensor tags...')
  SensorTag.discover((sensor_tag) => {
    console.log(`Found sensor tag ${sensor_tag}, setting up...`)
    sensor_tag.connectAndSetUp((err) => {
      if (err) {
        console.error(err)
        return
      } 
      cb(sensor_tag)
    })
  })
}

function connectSensorTagEventsToMQTT(sensor_tag, client) {
  sensor_tag.notifySimpleKey((error) => console.error)
  sensor_tag.on('simpleKeyChange', function (left, right, reedRelay) {
    let event = {left: left, right: right}
    console.log(`Button press left (${left}) and right (${right})`)
    client.publish("sensors", "json", JSON.stringify(event), 1);
  });

  sensor_tag.notifyLuxometer((error) => console.error)
  sensor_tag.enableLuxometer((error) => console.error)
  let last_lux = -1
  sensor_tag.on('luxometerChange', (lux) => {
    if (last_lux === lux) {
      return
    }
    let event = {lux: lux}
    console.log(`Luxometer (${lux})`)
    client.publish("sensors", "json", JSON.stringify(event), 1);
    last_lux = lux
  });
}

connectToSensorTag((sensor_tag) => {
  console.log(`Listening to Sensor Tag events.`)
  connectToBroker(config, (client) => {
    connectSensorTagEventsToMQTT(sensor_tag, client)
  })
})
