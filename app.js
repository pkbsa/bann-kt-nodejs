var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { request } = require("http");
const { response } = require("express");

var connection = mysql.createConnection({
    host: "localhost",
    user: "bannkcay_siranuta13",
    password: "Jindarat1",
    database: "bannkcay_bann-kt",
});
  
connection.connect((error) => {
    if (error) console.log(error);
    else console.log("MYSQL Connected...");
});

var app = express();

app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
  

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

const publicDirectory = path.join(__dirname + "/css");
app.use(express.static(publicDirectory));

app.set("view engine", "ejs");

app.get("/", function (request, response) {
    response.render("index");
});
app.get("/aboutus", function (request, response) {
    response.render("aboutus");
});
app.get("/cats", function (request, response) {
    connection.query("SELECT * FROM catlist", function (error, results){
        if(error) throw error;
        response.render("catlist", { cats: results});
    })
});
app.get("/parents", function (request, response) {
    connection.query("SELECT * from parent", function (error, results){
        if(error) throw error;
        response.render("sirdam", { cats: results});
    })
});
app.get("/contact", function (request, response) {
    response.render("contact");
});
app.get("/admin", function (request, response){
    if (request.session.loggedin) {
        response.redirect("/admin-cats")
    }else{
        response.render("login", { message: ""});
    }
});
app.get("/admin-cats", function (request, response) {
    if (request.session.loggedin) {
        connection.query("SELECT * FROM catlist", function (error, results){
            if(error) throw error;
            response.render("addcat", { cats: results});
        })
    }else{
        response.render("login", { message: ""});
    }
});
app.get("/admin-parents", function (request, response) {
    if (request.session.loggedin) {
        connection.query("SELECT * FROM parent", function (error, results){
            if(error) throw error;
            response.render("addparent", { cats: results});
        })
    }else{
        response.render("login", { message: ""});
    }
});

app.post("/addcat", function (request, response){
    let sampleFile;
    let uploadFile;

    console.log(request.body)

    if(!request.files || Object.keys(request.files).length === 0){
        return response.status(400).send("No files were uploaded")
    }
    
    sampleFile = request.files.sampleFile;
    uploadFile = __dirname + '/css/images/catlist/' + sampleFile.name
    console.log(sampleFile)

    sampleFile.mv(uploadFile, function(error){
        if(error) return response.status(500).send(error)

        connection.query("INSERT INTO catlist SET ?",
        {
            name: request.body.name,
            image: sampleFile.name,
            gender: request.body.gender,
            age: request.body.age,
            color: request.body.color,
            price: request.body.price,
            status: parseInt(request.body.status),
        },
         (error, rows) => {
            response.redirect('/admin')
        });
    });
});

app.post("/addcatparent", function(request, response){
    let sampleFile;
    let uploadFile;

    console.log(request.body)

    if(!request.files || Object.keys(request.files).length === 0){
        return response.status(400).send("No files were uploaded")
    }

    sampleFile = request.files.sampleFile;
    uploadFile = __dirname + '/css/images/sirdam/' + sampleFile.name
    console.log(sampleFile)

    sampleFile.mv(uploadFile, function(error){
        if(error) return response.status(500).send(error)

        connection.query("INSERT INTO parent SET ?",
        {
            name: request.body.name,
            image: sampleFile.name,
            gender: request.body.gender,
        },
         (error, rows) => {
            response.redirect('/admin-parents')
        });
    });
})

app.post("/deletecat", function (request, response){
    console.log(request.body);
    let id = parseInt(request.body.id);
    connection.query("DELETE FROM catlist WHERE id = ?", [id], (error,rows) =>{
        response.redirect('/admin')
    });
});
app.post("/deleteparent", function (request, response){
    console.log(request.body);
    let id = parseInt(request.body.id);
    connection.query("DELETE FROM parent WHERE id = ?", [id], (error,rows) =>{
        response.redirect('/admin-parents')
    });
});

app.post("/auth_login", async (request, response) =>{
    var username = request.body.username;
    var password = request.body.password;
    
    if(username && password){
        connection.query("SELECT * FROM userlist WHERE username = ?",[username],async (error ,results, fields) => {
            if (results.length > 0){
                if (password === results[0].password) {
                    request.session.loggedin = true;
                    response.redirect('/admin-cats')
                } else{
                    response.status(401).render("login",{
                        message: "Password Incorrect",
                    })
                }
            }else{
                response.status(401).render("login",{
                    message: "User is not exist",
                })
            }
        });
    } else {
        response.status(401).render("login",{
            message: "Username and Password cannot be Blank",
        })  
    }
})

app.get("/logout", function (request, response) {
    console.log("User [" + request.session.username + "] logged out")
    request.session.loggedin = false;
    response.redirect("/");
    response.end();
});

app.listen(3001, function(){
    console.log("Listening at Port 3001")
  });