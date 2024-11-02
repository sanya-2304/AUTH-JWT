const express=require('express')
const jwt=require('jsonwebtoken')

const app=express()
app.use(express.json())

const JWT_SECRET="randomjwtsecret"
const users=[];

app.post('/signup', function(req, res){
    const username=req.body.username
    const password=req.body.password
    users.push({
        username:username, 
        password:password
    })
    res.send({
        message:"Thank you for signing up."
    })
})
app.post('/signin', function(req, res){
    const username=req.body.username
    const password=req.body.password
    const findUser=users.find(user=>user.username===username && user.password===password);
    if(findUser){
        const token=jwt.sign({
            username:username
        }, JWT_SECRET);
        res.header("token", token)
        res.json({
            token:token
        })
       
    }else{
        res.send({
            message:"Credentails incorrect."
        })
        return
    }
})
function auth(req, res, next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token, JWT_SECRET);
    if(decodedData.username){
        next();
    }else{
        res.send({
            message:"You are not logged in."
        })
    }
}
app.get('/me', auth, function(req, res){
    try{
const username=decodedData.username
const finduser=users.find(user=>user.username===username);
if(finduser){
    res.send({
        username:finduser.username,
        password:finduser.password
    })
}else{
    res.status(401).send({ message: "Unauthorized" });
} }
catch(err){
    res.status(401).send({ message: "Invalid token" });
}
})

app.listen(2000)