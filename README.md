# arduino-serial-fetch

This app converts serial messages from an Arduino to REST API requests. It has been developed to correspond specifically with the REST API service provided by [arduino-api-server](https://github.com/soundasobject21/arduino-api-server) and is structured solely to update pin data.

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Arduino code and `Serial.print()` format](#arduino-code-and-serialprint-format)
- [Adding more pins](#adding-more-pins)
- [Test API endpoints](#test-api-endpoints)

## Requirements

- [arduino-api-server](https://github.com/soundasobject21/arduino-api-server)
- Arduino serial messages must following a specific format. See [Arduino code and `Serial.print()` format](#arduino-code-and-serialprint-format)
- Arduino must be tethered to your computer

## Getting Started

1. First complete your [arduino-api-server](https://github.com/soundasobject21/arduino-api-server) setup
2. Download/clone this repo or [use it as a template](https://github.com/stephiescastle/arduino-serial-fetch/generate)
3. Connect your Arduino to your computer and upload the corresponding Arduino program to it. See [Arduino code and `Serial.print()` format](#arduino-code-and-serialprint-format).
4. Create your env file.

   ```bash
   cp .env.dist .env
   ```

5. Update the `.env` file with values that match your configuration:

   | var          | default                   | description                                                                                                                                                                                                                   |
   | :----------- | :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `API_HOST`   | `http://localhost:3000`   | The host URL of your API server (see [arduino-api-server](https://github.com/soundasobject21/arduino-api-server)). Note: if you are deploying with localtunnel, you should continue to use `localhost:3000` as your `API_HOST` |
   | `SERIALPORT` | `/dev/tty.SLAB_USBtoUART` | The serial port your Arduino is connected to. Should match the port name you use in the Arduino IDE.                                                                                                                          |
   | `BAUDRATE`   | `9600`                    | Match the baudrate used in your Arduino code. Check `Serial.begin(9600);` in your Arduino `setup()`                                                                                                                           |
   | `INTERVAL`   | `500`                     | Frequency of API requests (in milliseconds)                                                                                                                                                                                   |

6. Install dependencies

   ```bash
   npm install
   ```

7. Run the app

   ```bash
   npm start
   ```

   To stop the app, use ctrl-c (`^C`)

## Arduino code and `Serial.print()` format

This app assumes that your Arduino code is only printing one line to the Serial port per `loop()` iteration and is constructed like so:

```js
// for three pins
<number>\t<number>\t<number>\t\n
```

Each number represents pin data, with `\t` as the delimiter. `\n` signifies the end of the data reading for one iteration in `loop()`. It is up to the interpreter to know the order of the pins and how that should correspond to their usage (see [Adding more pins](#adding-more-pins)).

You can use [/arduinoSerial/arduinoSerial.ino](/arduinoSerial/arduinoSerial.ino) as boilerplate for your Arduino code with pins modified as needed.

## Adding more pins

The app defaults to reading and sending the following pins:

- `A0`
- `A1`
- `D2`

This can be modified by updating both the:

1. Arduino code: read the necessary pins and append to the `Serial.print` message
2. `main.js`: modify the constructed `allPins` array that is used to generate API requests.

For example, say I needed to read pins `A0`, `A3`, `D4`, and `D7`. I would need to modify my code like so:

```c++
// arduinoSerial.ino

int knobPin = A0;
int knobValue = 0;

int sensorPin = A3;
int sensorValue = 0;

int button1Pin = D4;
int button1Value = 0;

int button2Pin = D7;
int button2Value = 0;

void setup() {
  pinMode(button1Pin, INPUT);
  pinMode(button2Pin, INPUT);
  Serial.begin(9600);
}

void loop() {
  // A0 will be pins[0]
  knobValue = analogRead(knobPin);
  Serial.print(knobValue);
  Serial.print("\t");

  // A3 will be pins[1]
  sensorValue = analogRead(sensorPin);
  Serial.print(sensorValue);
  Serial.print("\t");

  // D4 will be pins[2]
  buttonValue = digitalRead(button1Pin);
  Serial.print(button1Value);
  Serial.print("\t");

  // D7 will be pins[3]
  buttonValue = digitalRead(button2Pin);
  Serial.print(button2Value);
  Serial.print("\t");

  Serial.println();

}
```

```js
// main.js excerpt
const allPins = [
  {
    id: "A0",
    value: pins[0],
  },
  {
    id: "A3",
    value: pins[1],
  },
  {
    id: "D4",
    value: pins[2],
  },
  {
    id: "D7",
    value: pins[3],
  },
];
```

> Note how the `pins[]` array index does not necessarily correspond to the Arduino pin number.

## Test API endpoints

If you don't have an Arduino connected, you can mimic one with the `test.js` script. This is useful if you just want to test your endpoints. The test script will also send API requests at the same `INTERVAL` defined in your `.env` file.

```bash
npm test
```

To stop the test, use ctrl-c (`^C`)
