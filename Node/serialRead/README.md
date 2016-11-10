Dieses Node Programm öffnen einen seriellen Port und gibt die empfangenen Daten im Terminal aus.

# Installation

Es muss node.js installiert sein (http://nodejs.org)

In einer Kommandozeile in das Verzeichnis wechseln, in dem die Datei index.js liegt und dort folgenden Befehl eingeben:

> npm install


# Ausführen

Um alle verfügbaren seriellen Anschlüsse aufzulisten:

> node index.js

Um das Programm zu starten und COM1 verwenden:

> node index.js COM1

# Credits

Diese Beispiele basieren auf dem Kurs von Tom Igoe:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/