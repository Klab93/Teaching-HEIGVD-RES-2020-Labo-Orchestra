const dgram = require("dgram");
const net = require("net");
const UDPserver = dgram.createSocket('udp4');


let musicians = [];

UDPserver.bind(9900, () => {
    console.log("Joining multicast group");
    UDPserver.addMembership("239.255.22.5");
});


UDPserver.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    musicians.push(JSON.parse(msg));
});

const TCPServer = net.createServer((socket) => {

    console.log("Server listen on port 2205")
    socket.write(JSON.stringify(musicians));

    socket.on("error", (err) => {
        console.log(`Error: ${err}`);
    });
});

TCPServer.listen(2205, "localhost");

