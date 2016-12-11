Dieses Node Programm empfängt Daten
von einem MQTT Broker
und zeigt sie auf WS2812 LEDs an

# Installation

Es muss node.js installiert sein (http://nodejs.org)

In einer Kommandozeile in das Verzeichnis wechseln, in dem die Datei index.js liegt und dort folgenden Befehl eingeben:

> npm install


# Konfigurieren

Die Adresse des MQTT Brokers muss in der Datei index.js angepasst werden. Dazu dient die Variable mqtt_server_url.

# Ausführen

Dieser Befehl führt das Programm aus:

> node index.js
