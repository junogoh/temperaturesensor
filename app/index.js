'use strict';
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var dateTime = require('node-datetime');
var deviceId = "D0001";
var connectionString = "HostName=yourhost.azure-devices.net;DeviceId=D0001;SharedAccessKey=yoursharedaccesskey";
var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(function(){
        var temperature = 20 + (Math.random() * 15);
        var humidity = 60 + (Math.random() * 20);  
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');          
        var data = JSON.stringify({ deviceId: deviceId, message: 'test', sensor: 'temperature', temperature: temperature, humidity: humidity, timestamp:formatted });
        var message = new Message(data);
        message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 5000);
  }
};

client.open(connectCallback);


