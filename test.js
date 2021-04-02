// manually update pins to test endpoint

require("dotenv").config();
const fetch = require("node-fetch");

function getRandomNumber() {
  const min = Math.ceil(0);
  const max = Math.floor(255);
  return Math.floor(Math.random() * (max - min) + min);
}

const allPins = [
  {
    id: "A0",
    value: getRandomNumber(),
  },
  {
    id: "A1",
    value: getRandomNumber(),
  },
  {
    id: "D2",
    value: getRandomNumber(),
  },
];

for (const pin of allPins) {
  console.log(`${process.env.API_HOST}/pins/${pin.id}`);
  fetch(`${process.env.API_HOST}/pins/${pin.id}`, {
    method: "PUT",
    body: JSON.stringify(pin),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}
