const dgram = require("dgram");
const server = dgram.createSocket('udp4');
import {v5 as uuidv5} from 'uuid';

let Musician = (instrument) => {
    this.uuid = uuidv5()
    this.instrument = instrument;

    let data = {
        uuid : this.uuid,
        instrument : this.instrument,
        activeSince : Date.now()
    }

    let payload = JSON.stringify(data)
    let message = new Buffer(payload);

    server.send(message, 0, message.length, 2205, 'localhost',(err, bytes) => {
        console.log("Sending payload: " + payload + " via port " + s.address().port);
    });

    setInterval(this.update.bind(this), 500);
}

