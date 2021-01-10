// check the endpoint for any data

require("dotenv").config();
const fetch = require("node-fetch");

let json;
async function start() {
  const response = await fetch(`${process.env.API_HOST}/db`);
  json = await response.json();
  console.log(json);
}
start();

// another way to write this
// fetch(`${process.env.API_HOST}/pins`)
//     .then(res => res.json())
//     .then(json => console.log(json[0].value))
//     .catch(err => console.log(err));
