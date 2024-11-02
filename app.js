const express=require('express')
const jwt=require('jsonwebtoken')
const path = require('path');

const app=express()
app.use(express.json())
const JWT_SECRET = "randomjwtsecret";
const users=[];
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.post('/signup', function(req, res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username, password
    })
    res.send({
        message:"Thank you for signing up." 
    })
})
app.post('/signin', function(req, res){
    const username=req.body.username;
    const password=req.body.password;
    const findUser=users.find(user=>user.username===username && user.password===password);
    if(findUser){
        const token=jwt.sign({username:findUser.username}, JWT_SECRET);
        res.send({
            token:token
        })
    } else{
        res.status(401).send({ message: "Credentials incorrect." });
    }
})
function auth(req, res, next){
    const token=req.headers.token;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try{
    const verifytoken=jwt.verify(token, JWT_SECRET);
    const checkuser=users.find(user=>user.username===verifytoken.username);
    if(checkuser){
        req.user=checkuser
        next();
    }else{
        res.status(401).send({message:"unauthorized"})
    }
    }catch(err){
        res.status(401).send({ message: "Invalid token" });
    }
}

app.get('/me', auth,function(req, res){
    const checkuser=req.user
res.send({
    username:checkuser.username,
    password:checkuser.password
})
})
app.listen(2500);