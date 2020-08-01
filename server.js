const http = require('http');
const express = require("express");
app = express();
const port = process.env.PORT || 8080;
const hostname = '127.0.0.1';
const service = require("./models/service");
const bodyParser = require("body-parser"); //expressin mukana
const multer = require("multer");
const fs = require("fs");


app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public")); //Example in ejs file just write href="/custom.css"

app.use(bodyParser.json()); //Body parser  for sending data
app.use(bodyParser.urlencoded( { "extended" : true } )); //Session järjestyksessä on väliä
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    
  }
})
 


app.get("/",(req, res)=>{
 service.GetGames((err, data)=>{
  res.render("index",{
    "games": data
  })
 })
  
})
app.get("/create_game/",(req, res)=>{
    
  res.render("create_game", {
     
  })
})
app.post("/add_game/", (req, res)=>{
  service.AddGame(req.body, (err)=>{
      res.redirect("/");
  });
});
app.get("/project_details/:id/", (req, res)=>{
  id = req.params.id;
  service.GetProjectDetails(id, (err, data)=>{
    res.render("project_details",{
      "project_data" : data
    })
  })
})
app.get("/create_character/:id/", (req, res)=>{
  id = req.params.id;
  service.GetProjectDetails(id, (err, data)=>{
    res.render("create_character",{
      "project_data" : data
    })
  })
})
app.get("/characters/:id/",(req,res)=>{
  id = req.params.id;
  service.GetProjectDetails(id, (err, data)=>{
    res.render("characters",{
      
    })
  })
})
let upload = multer({ storage: storage }).single("image");

app.post("/add_character/:id/", (req, res)=>{
  id = req.params.id;
  upload(req,res, function(err){
  let path = req.file.destination;
  let name = req.file.filename;
  let source = path + "/"+name;
    service.AddCharacter(id, source, req.body, (err)=>{
      res.redirect("/");
    })
  
  })
});
 
   /* res.json({
      success: true,
      message: "Image uploaded",
      path: path,
      name : name,
      source : source
    })*/

app.get("/edit_project/:id/", (req,res)=>{
  id = req.params.id;
  service.GetProjectDetails(id, (err, data)=>{
    res.render("edit_project", {
      "project_data" : data
    })
  })
})
app.post("/edit_project/:id/",(req, res)=>{
  id = req.params.id;
  service.EditProject(req.body, (err)=>{
    res.redirect("/project_details/"+id)
  })
})
app.post("/delete/:id/",(req, res)=>{
  id = req.params.id;
  service.DeleteProject(req.body,(err)=>{
    res.redirect("/");
  })
})


app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});