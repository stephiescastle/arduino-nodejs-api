// Not in use / WIP
// DB starts with all pins initialized.
// the tricky part here was clearing everything and then adding everything sequentially
// this is still preferred way and only having proto items in the hosted db but can't figure it out yet
// this would allow for flexibility in the number of pins used (i.e. could be used for an arduino Mega)
require("dotenv").config();
const fetch = require("node-fetch");

// let pin = {
//   id: "A1",
//   value: 0,
// };

// add all analog pins on an Arduino Uno
const pins = ["A0", "A1", "A2", "A3", "A4", "A5"];

// clear out any old pins before init to avoid JSON errors (duplicate ID)
function deletePins() {
  pins.forEach((pin) => {
    fetch(`${process.env.API_HOST}/pins/${pin}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  });
}
// init pins
function createPins() {
  pins.forEach((pin) => {
    const pinObject = {
      id: pin,
      value: 0,
    };
    fetch(`${process.env.API_HOST}/pins`, {
      method: "POST",
      body: JSON.stringify(pinObject),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  });
}

function init() {
  deletePins();
  // TODO: create after delete is complete
  createPins();
}

init();

// make pins array available to other scripts
module.exports = pins;
