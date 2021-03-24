require("dotenv").config();
const fetch = require("node-fetch");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("/dev/tty.SLAB_USBtoUART", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" })); // Read the port data

let pins = [];

// const byte DATA_MAX_SIZE = 32;
// char data[DATA_MAX_SIZE];   // an array to store the received data

port.on("open", () => {
  console.log("serial port open");
});
parser.on("data", (data) => {
  // console.log("got word from arduino:", data);
  data = data.trim();
  pins = data.split("\t");
  // console.log(pins);
});

// var sendLoopSingle = setInterval(function () {
//   const localPinA0 = {
//     id: "A0",
//     value: pins[0],
//   };
//   fetch(`${process.env.API_HOST}/pins/A0`, {
//     method: "PUT",
//     body: JSON.stringify(localPinA0),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.log(err));
// }, 200);

var sendLoopAll = setInterval(function () {
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
      id: "A2",
      value: pins[2],
    },
  ];

  for (const pin of allPins) {
    console.log(`${process.env.API_HOST}/pins/${pin.id}`);
    fetch(`${process.env.API_HOST}/pins/${pin.id}`, {
      method: "PUT",
      body: JSON.stringify(pin),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }
}, 200);
