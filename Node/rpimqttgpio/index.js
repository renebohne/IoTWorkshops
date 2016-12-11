var NUMLEDS = 32;
var ws281x = require('rpi-ws281x-native');
ws281x.init(NUMLEDS);

var mqtt = require('mqtt');

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
  show(message);
})


function show(cpm)
{
	var renderData = new Uint32Array(NUMLEDS);
	for(var i=0; i<NUMLEDS;i++)
	{
		renderData[i] = 0;
		if(cpm > i)
		{
			renderData[i] = 0x0000FF;//blue
		}
	}
	ws281x.render(renderData);
}


process.on('SIGINT', function(){
	ws281x.reset();
	process.nextTick(function() { process.exit(0);})
});
