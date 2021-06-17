const dgram = require("dgram");
const server = dgram.createSocket('udp4');
const uuidLib = require('uuid');

const UDPmulticastAddress = '239.255.22.5';
const UDPPort = 9900;

const songOfInstrument = {
    piano : "ti-ta-ti",
    trumpet : "pouet",
    flute : "trulu",
    violin : "gzi-gzi",
    drum : "boum-boum"
}

function Musician(instrument) {
    this.instrument = instrument;
    this.uuid = uuidLib.v4();
    this.song = songOfInstrument[instrument];

    let data = {
        uuid : this.uuid,
        instrument : this.instrument,
        song : this.song
    }

    let payload = JSON.stringify(data)
    let message = new Buffer(payload);

    function play() {
        server.send(message, 0, message.length, UDPPort, UDPmulticastAddress,(err, bytes) => {
            console.log("Sending payload: " + payload + " via port " + server.address().port);
        });
    }

    setInterval(play, 1000);
}

const instrument = process.argv[2];

const m1 = new Musician(instrument);

