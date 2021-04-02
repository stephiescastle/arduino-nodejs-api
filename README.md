# arduino-nodejs-api

## Simple NodeJS API to allow remote communication with an Arduino

This api will allow your arduino to send and receive data to a remote server. This means you can retrieve data from other arduinos and alternatively make your data available to others. Additionally, the endpoints for your arduino can be used as a data endpoint in other apps, i.e. p5.js, Max/MSP, etc.

This is achievable by using two repos:

1. [arduino-nodejs-api](https://github.com/stephiescastle/arduino-nodejs-api) - (aka this repo) - The node.js app that reads from and writes to your arduino board. The node.js app runs locally alongside your arduino board.
2. [arduino-json-server](https://github.com/stephiescastle/arduino-json-server) - The server that provides the data endpoints and is deployed to heroku.

This was developed to help facilitate the creation of interactive, physical computing-based works while we all live in quarantine.

## Dependencies

- [arduino-json-server](https://github.com/stephiescastle/arduino-json-server)
- node.js
- arduino must be configured to work with [johnny-five](http://johnny-five.io/platform-support/#arduino-uno) (i.e. upload `StandardFirmataPlus` to the board)
- arduino must be tethered via USB

### Getting Started

1. Set up your [arduino-json-server](https://github.com/stephiescastle/arduino-json-server)
2. Create your env file.

```bash
cp .env.dist .env
```

3. Update the resulting `.env` file with your `API_HOST`. This corresponds to the URL of your heroku server. Leave as is if you are testing locally.

4. Connect your arduino to your computer (it should already be configured to work with johnny-five)
5. Install dependencies

```bash
npm install
```

6. Run arduino-nodejs-api locally

```bash
npm start
```

### Controlling the arduino

Code for the arduino is located in `index.js` and uses the johnny-five library.

### Test changing a value

If you don't have hardware connected to your arduino, you can manually update pin values via the `test.js` script. Modify the pin and value as needed in `test.js`, then run it:

```js
// pin A0 as defined in update.js
let pin = {
  id: "A0",
  value: 1200,
};
```

```bash
node test
```

In this case, you should expect the value of `A0` to be updated to `1200`.
