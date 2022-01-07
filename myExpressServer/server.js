
const express=require('express');

const app=express();


app.get('/',function(request,res){
    res.send('This is Home')
})
app.get('/contact',function(req,res){
    res.send("Contact me at AJBAJWA")
})

app.get('/about',function(req,res){
    res.send("Hi i am Aj i m super Cool OKAY!!!!");
})

app.get('/hobbies',function(req,res){
    res.send('None');
})

app.listen(3000,function(){
    console.log("Server started at 3000")
}); 