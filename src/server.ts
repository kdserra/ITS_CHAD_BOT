import express = require("express");
import { Utils } from "./utils";

const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  Utils.PrintTimestamped("Server is now running on port:" + PORT);
});