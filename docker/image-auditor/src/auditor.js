const dgram = require("dgram");
const server = dgram.createSocket('udp4');

let musicians = [];

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

const s = dgram.createSocket('udp4');
s.bind(2205, () => {
    console.log("Joining multicast group");
    s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

