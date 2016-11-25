/*
inspired by Tom Igoe: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/
*/



var mqtt = require('mqtt');

//var mqtt_server_url = 'mqtt://test.mosquitto.org';
//var mqtt_server_url = 'mqtt://m21.cloudmqtt.com';
var mqtt_server_url = 'mqtt://192.168.2.222';

var mqtt_channel = 'workshop';
var mqtt_clientname = 'myname';

var options = {
  port: 1883,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  //username: 'IoT',
  //password: 'workshop',
};

var client  = mqtt.connect(mqtt_server_url, options);
 
client.on('connect', function () {
  client.subscribe(mqtt_channel)
  client.publish(mqtt_channel, 'Hello mqtt: '+mqtt_clientname)
})
 
client.on('message', function (topic, message) {
  console.log("from MQTT:"+message.toString());
  myPort.write(message.toString());
    //client.end();
})


var SerialPort = require('serialport');


var portName = process.argv[2];
if(portName==undefined)
    {
        console.log("usage: node index.js <PORTNAME>\n");
        console.log("available serial ports:")
        SerialPort.list(function(err, ports) 
        {
            ports.forEach(function(port)
            {
                console.log(port.comName);
            });
        });
        client.end();
        return -1;
    }


var myPort = new SerialPort(portName, {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: SerialPort.parsers.readline("\n")
 });

myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function sendSerialData(data) {
   console.log("from serial: "+data);
   if(data.indexOf(":")===-1)
   {
       console.log("ERROR: serial message is not compatible!");
       return;
   }
    var m = data.split(":");
    for(var i=0; i<m.length;i=i+2)
    {
        console.log("publishing: "+m[1])
        //client.publish('workshop/'+m[i], m[i+1]);
        client.publish(mqtt_channel, m[i+1]);
    }
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}
