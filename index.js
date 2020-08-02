const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.use("/test", (req, res) => {
  res.json({
    status: "Working",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
