In diesen Ordnern befinen sich die Beispiele, die in Node.js geschrieben sind. Sie werden auf einem PC (oder Raspberry Pi) ausgeführt.

helloworld ist das einfachste Beispiel, um mit Node.js zu starten.

serialRead kann genutzt werden, um die serielle Kommunikation zu testen und um diesen Teil des Projekts isoliert zu verstehen.

serial2mqtt ist das eigentliche Projekt, das die meisten interessieren wird. Es empfängt Daten von der seriellen Schnittstelle und leitet die an einen eingestellten MQTT Broker weiter. Das passende Arduino Sketch heisst SensorSerial.

# Credits

Diese Beispiele basieren auf dem Kurs von Tom Igoe:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/