// simple example demonstrating a blinking LED based on fetched data
require("dotenv").config();
const fetch = require("node-fetch");
const five = require("johnny-five");

// init board
const board = new five.Board({
  repl: false,
});

// init pinA0
// TODO: find a way to generate this dynamically for all pins
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
    .then(console.log("fetched value: " + pinA0.value))
    .catch((err) => console.log(err));
}, 500);

// arduino code
board.on("ready", () => {
  // init pins at -1 to kick-off listeners functions when data received
  pinA0.value = -1;

  var led = new five.Led(13);

  // set up my sensor on pin A0
  const sensor = new five.Sensor({
    pin: "A0",
    freq: 50,
    threshold: 10,
    type: "analog",
  });

  // need to store the last read value of the sensor
  // so we can send it to the server
  let sensorVal = 0;

  sensor.on("change", function () {
    // update the sensor value when it changes
    sensorVal = this.value;
  });

  // Uncomment out this code block if you want to read from your pin directly
  // read directly from my sensor to update blink value
  // sensor.on("change", function () {
  //   const scaledVal = this.scaleTo(0, 2000);
  //   led.blink(scaledVal);
  // });

  // Comment out this code block if you are reading from you pinA0 directly
  // listen for changes in data fetched from the server
  pinA0.registerListener(function (val) {
    console.log("update blink rate");
    led.blink(pinA0.value);
  });

  // regularly send values of my pins to the server
  var sendLoop = setInterval(function () {
    const localPinA0 = {
      id: "A0",
      value: sensorVal,
    };
    fetch(`${process.env.API_HOST}/analog/A0`, {
      method: "PUT",
      body: JSON.stringify(localPinA0),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }, 500);
});
