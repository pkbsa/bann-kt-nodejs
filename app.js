var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { request } = require("http");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bann-kt",
});
  
connection.connect((error) => {
    if (error) console.log(error);
    else console.log("MYSQL Connected...");
});

var app = express();

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
    response.render("sirdam");
});
app.get("/contact", function (request, response) {
    response.render("contact");
});
app.get("/addcat", function (request, response) {
    connection.query("SELECT * FROM catlist", function (error, results){
        if(error) throw error;
        response.render("addcat", { cats: results});
    })
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
            response.redirect('/addcat')
        });
    });
});
app.post("/deletecat", function (request, response){
    console.log(request.body);
    let id = parseInt(request.body.id);
    connection.query("DELETE FROM catlist WHERE id = ?", [id], (error,rows) =>{
        response.redirect('/addcat')
    });
});


app.listen(3001, function(){
    console.log("Listening at Port 3001")
  });