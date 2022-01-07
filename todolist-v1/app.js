const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
var items=["eat","sleep",'repeat'];
let workItems=[];
app.get('/',function(req,res){
    var today=new Date();

    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    var day=today.toLocaleDateString("en-US",options);

    res.render('index',{typeOfList:day,newListItems:items})
});

app.get('/work',function(req,res){
    res.render('index',{typeOfList:"Work",newListItems:workItems})
})

app.get('/about',function(req,res){
    res.render('about');
})

app.post('/',function(req,res){
    var item=req.body.newItem;
    // console.log(req.body)
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect('/')
    }
})

app.listen(3000,function(){
    console.log("Server is running on the port 3000");
})