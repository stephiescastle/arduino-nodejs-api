// simple example demonstrating a blinking LED based on fetched data
require("dotenv").config();
const fetch = require("node-fetch");
const five = require("johnny-five");

// init board
const board = new five.Board({
  repl: false,
});

// init pinA0
pinA0 = {
  valueInternal: 0,
  valueListener: function (val) {},
  set value(val) {
    if (this.valueInternal !== val) {
      this.valueInternal = val;
      this.valueListener(val);
    }
  },
  get value() {
    return this.valueInternal;
  },
  registerListener: function (listener) {
    this.valueListener = listener;
  },
};

// fetch data every 500ms
var requestLoop = setInterval(function () {
  fetch(`${process.env.API_HOST}/analog/A0`)
    .then((res) => res.json())
    .then((json) => (pinA0.value = json.value))
    .then(console.log(pinA0.value))
    .catch((err) => console.log(err));
}, 500);

// arduino code
board.on("ready", () => {
  // init pins at -1 to kick-off listeners when data received
  pinA0.value = -1;

  var led = new five.Led(13);

  // listen for changed in fetched data
  pinA0.registerListener(function (val) {
    console.log("update blink rate");
    led.blink(pinA0.value);
  });
});
