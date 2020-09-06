const express = require("express");
const connectDB = require("./config/db");
const Cors = require("cors");

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use(Cors());

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.use("/", (req, res) => {
  res.json({
    status: "Working",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
