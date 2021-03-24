// manually update a pin
// used for testing

require("dotenv").config();
const fetch = require("node-fetch");

// const pin = {
//   id: "A0",
//   value: 1200,
// };

const allPins = [
  {
    id: "A0",
    value: 10,
  },
  {
    id: "A1",
    value: 356,
  },
  {
    id: "A2",
    value: 487,
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
// updates pin A0
// fetch(`${process.env.API_HOST}/pins/A0`, {
//   method: "PUT",
//   body: JSON.stringify(pin),
//   headers: { "Content-Type": "application/json" },
// })
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.log(err));

// // update multiple pins
// fetch(`${process.env.API_HOST}/pins/A1`, {
//   method: "PUT",
//   body: JSON.stringify(allPins[1]),
//   headers: { "Content-Type": "application/json" },
// })
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.log(err));
