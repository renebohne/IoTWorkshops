/*
inspired by Tom Igoe: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/
*/



var mqtt = require('mqtt');
var mqtt_server_url = 'mqtt://test.mosquitto.org';
var mqtt_channel = 'workshop';
var mqtt_clientname = 'myname';



var client  = mqtt.connect(mqtt_server_url);
 
client.on('connect', function () {
  client.subscribe(mqtt_channel)
  client.publish(mqtt_channel, 'Hello mqtt: '+mqtt_clientname)
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log("from MQTT:"+message.toString());
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
   if(m.indexOf(";")===-1)
   {
       console.log("ERROR: serial message is not compatible!");
       return;
   }
    var m = data.split(";");
    for(var i=0; i<m.length;i=i+2)
    {
        client.publish(m[i], m[i+1]);         
    }
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}
