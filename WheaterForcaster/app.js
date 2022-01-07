const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post('/',function(req,res){
    // console.log(req.body.cityName);
    const query=req.body.cityName;
    const apiKey="2b88d12ed3df684c0e7b895fe85980ce";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    // console.log(url);
    https.get(url,function(response){
        // console.log(response);
        response.on('data',function(data){
            const info=JSON.parse(data);
            // console.log(data);
            const temperature=info.main.temp;
            const weatherDescription=info.weather[0].description;

            res.write("<p>The Weather is  "+weatherDescription+"</p>")
            res.write("<h1>The temperature of "+query+" is "+ temperature+" degree celsius</h1>")
            res.send();
            // console.log(temperature,weatherDescription)
        })
    })

})

app.listen(3000,function(){
    console.log("Server is running on the port 3000");
})
