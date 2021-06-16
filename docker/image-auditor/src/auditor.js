const dgram = require("dgram");
const net = require("net");
const UDPserver = dgram.createSocket('udp4');


const musicians = new Map();

UDPserver.bind(9900, () => {
    console.log("Joining multicast group");
    UDPserver.addMembership("239.255.22.5");
});


UDPserver.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    const json = JSON.parse(msg);

    musicians.set(json.uuid, {
        uuid : json.uuid,
        instrument : json.instrument,
        activeSince : new Date()
    });

});

const TCPServer = net.createServer((socket) => {

    console.log("Server listen on port 2205")
    socket.write(JSON.stringify(Array.from(musicians.values())));
    socket.end();
});

TCPServer.listen(2205);

setInterval(deleteOldMusicians, 1000);

function deleteOldMusicians() {
    musicians.forEach( musician => {
        if (musician.activeSince.getTime() < Date.now() - 5000) {
          musicians.delete(musician.uuid);
        }
    });
}