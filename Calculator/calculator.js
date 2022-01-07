const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post('/',function(req,res){
    var data=req.body;
    var num1=Number(data.num1);
    var num2=Number(data.num2);
    var result=num1+num2;
    res.send("The Result of the calculation is :"+result)
})

app.listen(3000,function(){
    console.log("Connected to Server at 3000")
})