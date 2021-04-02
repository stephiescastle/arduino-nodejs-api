// import dependencies
require("dotenv").config();
const fetch = require("node-fetch");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// vars *️⃣ update to match your configuration
const portName = "/dev/cu.SLAB_USBtoUART"; // the name of the serial port (same as arduino port)
const baudRate = 9600; // should match the arduino's baudrate
const interval = 500; // time interval for POST requests

// an empty array to store pin data
let pins = [];
// container for our interval function
let sendData;

// setup the serial port
const port = new SerialPort(portName, { baudRate: baudRate }, function (err) {
  if (err) {
    console.log(
      "❌ Cannot connect to serial port. Make sure your arduino is plugged in and check `portName`.",
      err.message
    );
  }
});

// setup a parser to read the serial port
const parser = port.pipe(new Readline({ delimiter: "\n" })); // Read the port data

// do stuff once the port is open
port.on("open", () => {
  console.log("✅ serial port open");

  // parse data
  parser.on("data", (data) => {
    // remove any trailing whitespace and \n
    data = data.trim();
    // split at delimiter, convert to number, and assign to pins array
    pins = data.split("\t").map(Number);
  });

  // send our data to the net
  sendData = setInterval(function () {
    // create a new array based on parsed data
    // *️⃣ add more pins to this array as needed. this should correspond with your arduino code
    const allPins = [
      {
        id: "A0",
        value: pins[0],
      },
      {
        id: "A1",
        value: pins[1],
      },
      {
        id: "D2",
        value: pins[2],
      },
    ];

    // step through the array and update each pin online
    for (const pin of allPins) {
      fetch(`${process.env.API_HOST}/pins/${pin.id}`, {
        method: "PUT",
        body: JSON.stringify(pin),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
    }
  }, interval);
});

port.on("close", () => {
  console.log("❎ serial port closed");
  // stop sending data
  clearInterval(sendData);
});
