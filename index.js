require("dotenv").config();
const fetch = require("node-fetch");
const five = require("johnny-five");

// init board
const board = new five.Board({
  repl: false,
});

var pins = ["A0", "A1", "A2"];

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

var requestLoop = setInterval(function () {
  fetch(`${process.env.API_HOST}/analog/A0`)
    .then((res) => res.json())
    .then((json) => (pinA0.value = json.value))
    .then(console.log(pinA0.value))
    .catch((err) => console.log(err));
}, 500);

board.on("ready", () => {
  // init pins at 0 when board is ready to kick-off listeners
  pinA0.value = 0;

  var led = new five.Led(13);

  pinA0.registerListener(function (val) {
    console.log("update blink rate");
    led.blink(pinA0.value);
  });
});
