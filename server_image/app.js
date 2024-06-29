const express = require("express");
 
const app = express();
 
// app.use("/static", express.static("public"));
app.use("/", express.static("./public"));

 
app.listen(2000, () => {console.log("Listening on port 2000")});