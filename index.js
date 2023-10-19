const express = require("express");
const router = require("./routes/reminder_router");

const app = express();

app.use(express.json());
app.use("/api/v1/reminder", router);

app.listen(process.env.PORT, () => {
  console.log("🚀 Listening server");
});
