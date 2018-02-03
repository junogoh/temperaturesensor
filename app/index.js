'use strict';
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var dateTime = require('node-datetime');
var config = require('/etc/azure-iot-edge/config.json');
var deviceId = "";

console.log("Connection String:"+config.deviceConnectionString);

var dcsArray = config.deviceConnectionString.split(";");
for(var i = 0; i < dcsArray.length; i++){
	if (dcsArray[i].startsWith("DeviceId=")){
	deviceId = dcsArray[i].replace("DeviceId=","");
	}
}

console.log("DeviceID:"+deviceId);


var connectionString = config.deviceConnectionString;
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
        var data = JSON.stringify({ deviceId: deviceId, sensor: 'temperature', temperature: temperature, humidity: humidity, timestamp:formatted });
        var message = new Message(data);
        message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 10000);
  }
};

client.open(connectCallback);


