express = require("express")
app=express()
app.listen(3000)
app.use(express.static(__dirname));
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
userdata={}

function getformated(querytoformat){
    var formatedresponce="";
    querytoformat.forEach(element => {
        formatedresponce+=element+"<br>"
    });
    return formatedresponce
}


app.post("/:username/update",(req,res)=>{
userdata[req.param("username")].push(req.body.topaste) 
res.redirect('/'+req.param("username"))
})
app.get("/:username/new",(req,res)=>{
    userdata[req.param("username")]=[]
    res.send("new user created "+req.param("username"))
})

app.get('/:username',(req,res)=>{
    username=req.param("username")
    if(!Object.keys(userdata).includes(username)){
        res.send("no user exist with this name")
    }
    else{
    userData=userdata[username]
    res.render("pasteit.ejs",{"data":userData,"username":username})
    }
})