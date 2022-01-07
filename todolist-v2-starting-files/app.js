//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemsSchema={
  name:String
};

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
  name:"Welcome to my ToDoList"
});
const item2=new Item({
  name:"Add Items using + button"
});
const item3=new Item({
  name:"Remove using checkbox"
});

const defaultItems=[item1,item2,item3];

const listSchema={name:String,items:[itemsSchema]}

const List=mongoose.model("List",listSchema);

app.get("/", function(req, res) {

  Item.find({},function(err,foundItems){
    if(foundItems.length==0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Items pushed successfully");
        }
      });
      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  })


});

app.post("/", function(req, res){

  const newItem = req.body.newItem;
  const listName=req.body.list;

  const item=new Item({
    name:newItem
  });
  if(listName=="Today"){
    item.save();
    res.redirect("/")
  }else{
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }

});

app.post("/delete",function(req,res){
  // console.log(req.body);
  const checkItemID=req.body.checkbox;
  const listName=req.body.listName;

  if(listName==="Today"){
      Item.findByIdAndRemove(checkItem,function(err){
        if(!err){
          console.log("Item deleted successfully");
          res.redirect("/");
        }
      })
  }else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkItemID}}},function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    })
  }
})

app.get("/:customListName",function(req,res){
  const customList=_.capitalize(req.params.customListName);
  // res.render("list", {listTitle:customList, newListItems: foundItems})
  
  List.findOne({name:customList},function(err,foundList){
    if(!err){
      if(!foundList){
        const list=new List({
          name:customList,
          items:defaultItems
        });
        list.save(); 
        res.redirect("/"+customList);
      }else{
        res.render("list",{listTitle:foundList.name, newListItems: foundList.items});
      }
    }
  })

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
