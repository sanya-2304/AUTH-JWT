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
app.get('/me', function(req, res){
const token=req.headers.token;
const decodedData=jwt.verify(token, JWT_SECRET)
const username=decodedData.username
const finduser=users.find(user=>user.username===username);

})

app.listen(2000)