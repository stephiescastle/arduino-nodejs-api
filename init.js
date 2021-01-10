// Not in use
// DB starts with all pins initialized.
// the tricky part here was clearing everything and then adding everything sequentially
// this is still preferred way and only having proto itemsin the hosted db but can't figure it out yet
require("dotenv").config();
const fetch = require("node-fetch");

// let pin = {
//   id: "A1",
//   value: 0,
// };

const pins = ["A0", "A1", "A2", "A3"];

// clear out any old pins before init
function deletePins() {
  pins.forEach((pin) => {
    fetch(`${process.env.API_HOST}/analog/${pin}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  });
}
// create Pins
function createPins() {
  pins.forEach((pin) => {
    const pinObject = {
      id: pin,
      value: 0,
    };
    fetch(`${process.env.API_HOST}/analog`, {
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
  createPins();
}

init();

// make pins array available to other scripts
module.exports = pins;
