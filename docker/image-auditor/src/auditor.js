const dgram = require("dgram");
const net = require("net");
const UDPserver = dgram.createSocket('udp4');

const UDPmulticastAddress = '239.255.22.5';
const UDPPort = 9900;
const TCPPort = 2205;

const musicians = new Map();

const instrumentFromSong = new Map();
instrumentFromSong.set('ti-ta-ti', 'piano');
instrumentFromSong.set('pouet', 'trumpet');
instrumentFromSong.set('trulu', 'flute');
instrumentFromSong.set('gzi-gzi', 'violin');
instrumentFromSong.set('boum-boum', 'drum');

UDPserver.bind(UDPPort, () => {
    console.log("Joining multicast group");
    UDPserver.addMembership(UDPmulticastAddress);
});

UDPserver.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    const json = JSON.parse(msg);

    musicians.set(json.uuid, {
        uuid : json.uuid,
        instrument : instrumentFromSong.get(json.song),
        activeSince : new Date()
    });

});

const TCPServer = net.createServer((socket) => {

    console.log("Server listen on port 2205")
    socket.write(JSON.stringify(Array.from(musicians.values())));
    socket.end();
});

TCPServer.listen(TCPPort);

setInterval(deleteOldMusicians, 1000);

function deleteOldMusicians() {
    musicians.forEach( musician => {
        if (musician.activeSince.getTime() < Date.now() - 5000) {
          musicians.delete(musician.uuid);
        }
    });
}