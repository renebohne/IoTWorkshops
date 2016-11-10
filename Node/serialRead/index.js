/*
inspired by Tom Igoe: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/
*/

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
        
        return 1;
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
   console.log(data);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}
