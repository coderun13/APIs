const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
const {v4: uuidv4 } = require('uuid');
uuidv4(); // => '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override')

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); // path for views folder


app.use(express.static(path.join(__dirname,"public"))); // path for public folder
app.use(methodOverride('_method'))

app.use(express.urlencoded ({ extended : true })); //standard line //middleware
app.use(express.json());//middleware


app.listen(port,() => {
    console.log(`listening at port ${port}`);
});


let posts = [
    {
        id: uuidv4(),
        username: "snehalsingh",
        content: "New to coding!"
    },
    {
         id: uuidv4(),
        username: "aryansingh",
        content: "Working Hard" 
    },
    {
         id: uuidv4(),
        username: "icey",
        content: "Learning full stack webdev"
    },
]


app.get("/posts", (req,res) => { //all posts page
    res.render("index.ejs",{posts});
});

app.get("/posts/new", (req,res) => { //create post page
    res.render("new.ejs");
});

app.get("/posts/:id", (req,res) => { //create post page
   let {id} = req.params;
   let post = posts.find((p) => id == p.id);
   res.render("show.ejs",{post});
   //console.log(post);
  //res.send("post requests working");
});


app.post("/posts", (req,res) => { 
    let {username,content} =req.body;
    let id = uuidv4();
    posts.push({id,username,content});
   console.log(req.body);
   res.redirect("/posts");
  // res.send("post requests working"); //submit page(confirmation)
});

app.patch("/posts/:id",(req,res)=> { //patch request
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => { //create post page
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs",{post});

});

app.delete("/posts/:id",(req,res)=> { //delete request
    let {id} = req.params;
   posts = posts.filter((p) => id !== p.id);
   res.redirect("/posts");
});