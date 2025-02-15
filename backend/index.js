const express = require("express");
const  mainRouter = require("./routes/index");
const app = express();
const cors  = require ("cors");

app.use(cors());
app.use(express.json());//boddy parser

app.use("api/v1",mainRouter);

app.listen(3000);

