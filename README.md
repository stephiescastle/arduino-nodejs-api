# arduino-nodejs-api

## Simple NodeJS API to allow remote communication with an Arduino

This api will allow your arduino to send and receive data to a remote server. This means you can retrieve data from other arduinos and alternatively make your data available to others. Additionally, the endpoints for your arduino can be used as a data endpoint in other apps, i.e. p5.js, Max/MSP, etc.

This is achievable by using two repos:

1. This repo is specifically the node.js app that reads from and writes to your arduino board. The node.js app runs locally alongside your arduino board.
2. The arduino-json-server repo is the server that provides the data endpoints and is usually deployed to heroku. Its data structure is closely coupled with `arduino-web-api`.

This was developed to help facilitate the creation of interactive, physical computing-based works while we all live in quarantine.

## Dependencies

### Remote Server

- The server is a separate repo that runs `json-server`
- In practice, this server can be deployed to heroku or similar for remote communication

### Local

- node.js
- arduino must be configured to work with johnny-five
- arduino must be tethered via USB

### Getting Started

1. Set up the server
2. Update your env files
3. Run node.js locally

```node
node index.js
```

### Test changing a value

If you don't have hardware to connect to your arduino, you can manually update pin values via the `update.js` script. Modify the code to update the pin and value desired, then run it:

```
node update.js
```

In this case, `update` would update pin `A0` to `1200`.

This is useful as a quick test to make sure the API and arduino are talking to each other.
