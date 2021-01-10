require("dotenv").config();
const fetch = require("node-fetch");

let pin = {
  id: "A0",
  value: 1200,
};

// updates pin A0
fetch(`${process.env.API_HOST}/analog/A0`, {
  method: "PUT",
  body: JSON.stringify(pin),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.log(err));
