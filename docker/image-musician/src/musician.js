const dgram = require("dgram");
const server = dgram.createSocket('udp4');

function Musician(instrument) {
    this.instrument = instrument;

    let data = {
        uuid : "this.uuid",
        instrument : this.instrument,
        activeSince : Date.now()
    }

    let payload = JSON.stringify(data)
    let message = new Buffer(payload);

    server.send(message, 0, message.length, 9900, '239.255.22.5',(err, bytes) => {
        console.log("Sending payload: " + payload + " via port " + server.address().port);
    });

    function play() {
        console.log("tititi")
    }

    setInterval(play, 1000);
}

const instrument = process.argv[2];

const m1 = new Musician(instrument);

