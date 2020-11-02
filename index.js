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

app.get('/:username/:pastestring',(req,res)=>{
    username=req.param("username")
    pastestring=req.param("pastestring")
    if(Object.keys(userdata).includes(username)) 
    {   userdata[username].push(pastestring)
        formatedresponce=getformated(userdata[username])
        console.log(formatedresponce)
        res.send(formatedresponce).end()
    }
    else{
    userdata[username]=[pastestring]
    res.send(userdata[username])
    }
})

app.get('/:username',(req,res)=>{
    username=req.param("username")
    if(Object.keys(userdata).includes(username)){
        res.send(userdata[username]).ends()
    }
    res.send("user name not found")
})