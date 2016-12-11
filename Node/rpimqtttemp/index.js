
var fs = require('fs');
var mqtt = require('mqtt');

var  sys = require('util');
var  exec = require('child_process').exec;
var  child = null;

var updateTime = 25000; // ms -- default: 25000 = 25 seconds

//var mqtt_server_url = 'mqtt://test.mosquitto.org';
//var mqtt_server_url = 'mqtt://m21.cloudmqtt.com';
var mqtt_server_url = 'mqtt://192.168.2.222';

var mqtt_channel = 'krawatte';

var options = {
  port: 1883,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  //username: 'IoT',
  //password: 'workshop',
};

var client  = mqtt.connect(mqtt_server_url, options);

client.on('connect', function () {
  client.subscribe(mqtt_channel);
})

client.on('message', function (topic, message) {
  console.log("from MQTT:"+message.toString());
})


//send data every 25 seconds (default) to MQTT broker
setInterval(function(){
    //console.log("reading sensor...");
    child = exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      var cputemp = stdout;

      // post to MQTT broker
      client.publish(mqtt_channel, cputemp);
      console.log('Posted temp: '+cputemp);

    }
  });}, updateTime);
