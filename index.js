const express = require("express");
const app = express();

const cors = require("cors");
const userRoute = require("./routes/v1/user.route");

app.use(express.json());
app.use(cors());

app.use("/api/v1", userRoute);

app.use("/api/v1", (req, res) => {
  res.send("Welcome To Random User System");
});

app.all("*", (res, req) => {
  res.send("No File path found");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
