const express = require("express");
const cors = require("cors");
const appRouter = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("", appRouter);

app.listen(5000, () => {
  console.log(`server started on port 5000`);
});
