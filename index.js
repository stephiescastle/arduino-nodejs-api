require("dotenv").config();
const fetch = require("node-fetch");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const interval = 500; // *️⃣ time interval for POST requests
let pins = []; // empty array to store pin data

// setup our serial port
const port = new SerialPort(
  "/dev/cu.SLAB_USBtoUART", // *️⃣ the name of the serial port you want to open (same as arduino port)
  { baudRate: 9600 }, // *️⃣ be sure to match the arduino's baudrate
  function (err) {
    if (err) {
      console.log("Error: ", err.message);
    }
  }
);

// setup our parser to read the serial port
const parser = port.pipe(new Readline({ delimiter: "\n" })); // Read the port data

// do stuff once the port is open
port.on("open", () => {
  console.log("serial port open");

  // parse received data
  parser.on("data", (data) => {
    // remove any trailing whitespace and \n
    data = data.trim();
    // split at delimiter and put into the pins array
    pins = data.split("\t");
  });

  // send our data to the net
  var sendData = setInterval(function () {
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
  console.log("serial port closed");
  // stop sending data
  clearInterval(sendData);
});
