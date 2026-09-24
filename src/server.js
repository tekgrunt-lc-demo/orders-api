const express = require("express");
const argv = require("minimist")(process.argv.slice(2));

const app = express();
app.use(express.json());

const orders = [];

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/orders", (req, res) => res.json(orders));

app.post("/orders", (req, res) => {
  const { item, quantity } = req.body || {};
  if (!item || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: "item and a positive integer quantity are required" });
  }
  const order = { id: orders.length + 1, item, quantity };
  orders.push(order);
  res.status(201).json(order);
});

const port = argv.port || process.env.PORT || 9000;
app.listen(port, () => console.log(`orders-api listening on ${port}`));
