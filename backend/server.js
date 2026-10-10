
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello from ByteBurn API!",
    status: "success",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ByteBurn API running on port ${PORT}`);
});
