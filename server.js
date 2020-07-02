const http = require('http');
const express = require("express");
app = express();
const port = process.env.PORT || 8080;
const hostname = '127.0.0.1';
const service = require("./models/service");
const bodyParser = require("body-parser"); //expressin mukana

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public")); //Example in ejs file just write href="/custom.css"

app.use(bodyParser.json()); //Body parser  for sending data
app.use(bodyParser.urlencoded( { "extended" : true } )); //Session järjestyksessä on väliä

app.get("/",(req, res)=>{
  res.render("index",{

  })
})
app.get("/create_game/",(req, res)=>{
    
  res.render("create_game", {
     
  })
})
app.post("/add_game/", (req, res)=>{
  service.AddGame(req.body, (err)=>{
  
 
      res.redirect("/");
  })
})



app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});