express = require("express");
app = express();
app.listen(3000);
app.use(express.static(__dirname));
//const fileUpload = require("express-fileupload");
const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 
//app.use(fileUpload());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
userdata = {};
userfiles={};

app.post("/:username/update", (req, res) => {
if (req.body.topaste != "" ) 
  userdata[req.param("username")].push(req.body.topaste);
    if (req.file != null){
    console.log(req.files)
    upload.single(req.files)
    userfiles[req.param("username")].push(JSON.stringify(req.file));
  }
  res.redirect("/" + req.param("username"));
});
app.get("/:username/delete", (req, res) => {
  if(userdata[req.param("username")]!=undefined){
  delete userdata[req.param("username")]
  res.send("username "+req.param("username")+" deleted sucessfully")
  }
  else
    res.send("no user exist with username "+req.param("username"))
});
app.get("/:username/new", (req, res) => {
  if(userdata[req.param("username")]==undefined){
  userdata[req.param("username")] = [];
  userfiles[req.param("username")] = [];
  res.send("new user created " + req.param("username"));
  }
  else
    res.send("user already exist "+req.param("username"))
});
app.get("/:username/:pastestring", (req, res) => {
  userdata[req.param("username")].push(req.param("pastestring"));
  res.redirect("/" + req.param("username"));
});

app.get("/:username", (req, res) => {
  username = req.param("username");
  if (!Object.keys(userdata).includes(username)) {
    res.send("no user exist with this name");
  } else {
    userData = userdata[username];
    res.render("pasteit.ejs", { data: userData, username: username });
  }
});
