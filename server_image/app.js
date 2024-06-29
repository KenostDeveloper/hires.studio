const express = require("express");
 
const app = express();
 
// app.use("/static", express.static("public"));
app.use("/static", express.static("./public"));
 
app.use("/", function(_, response){
     
    response.send("<h1>Главная страница</h1>");
});
 
app.listen(2000, () => {console.log("Listening on port 2000")});