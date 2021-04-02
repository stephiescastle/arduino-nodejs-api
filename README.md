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
- arduino program must be printing to the serial port with a delimiter (see [/arduinoSerial/arduinoSerial.ino](/arduinoSerial/arduinoSerial.ino))
- arduino must be tethered via USB

### Getting Started

1. Set up your [arduino-json-server](https://github.com/stephiescastle/arduino-json-server)
2. Create your env file.

```bash
cp .env.dist .env
```

1. Update the `.env` file with your `API_HOST`. This corresponds to the URL of your heroku server or localhost.

2. Connect your arduino to your computer and upload the corresponding arduino program to it (you may need to modify this for the pins you are actually using)
3. Install dependencies

```bash
npm install
```

1. Run arduino-nodejs-api

```bash
npm start
```

### Test changing a value

If you don't have your arduino connected, you can manually update pin values via the `test.js` script. This is useful if you just want to test your endpoints.

```bash
node test
```
