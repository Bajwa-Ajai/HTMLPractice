const express=require('express');
const request=require('request');
const bodyParser=require('body-parser');
const https=require('https');


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
})

app.post('/',function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    

    const data={
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName 
            }
    }
    const jsonData=JSON.stringify(data); 
    console.log(jsonData);
    const url="https://us20.api.mailchimp.com/3.0/lists/6d474a66a1/members"

    const options={
        method:"POST",
        auth:"AJB:5625285871a013cb58146be8f7188333-us20"
    }

    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+'/success.html')
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post('/failure',function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("Server is Running on port 3000")
})


// https://us20.api.mailchimp.com/3.0/lists/6d474a66a1/members>


// API key:5625285871a013cb58146be8f7188333-us20
//Audience id :6d474a66a1 
