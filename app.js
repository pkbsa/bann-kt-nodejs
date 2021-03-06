var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const querystring = require('querystring');

const { request } = require("http");
const { response } = require("express");

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
    connection.query("SELECT * from tips", function (error, results){
        if(error) throw error;
        response.render("index", { tips: results});
    })
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
app.get("/cats/:id", function (request, response) {
    let cat_id = request.params.id;
    if(!cat_id){
        return response.status(400).send({error: true,message: "Please provide cat id."});
    }
    connection.query("SELECT * FROM catlist where id=?",cat_id, function(error,data,fields){
        if(error) throw error;
        response.render("content",{cats: data});
    })

});
app.get("/admin", function (request, response){
    if (request.session.loggedin) {
        response.redirect("/admin-cats")
    }else{
        response.render("login", { message: ""});
    }
});
app.get("/admin-index", function (request, response) {
    if (request.session.loggedin) {
        connection.query("SELECT * FROM tips", function (error, results){
            if(error) throw error;
            response.render("addtips", { tips: results});
        })
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
app.get("/admin-content/:id", function (request, response) {
    let cat_id = request.params.id;
    if (request.session.loggedin) {
        connection.query("SELECT * FROM catlist where id=?",cat_id, function (error, results){
            if(error) throw error;
            response.render("addcontent", { cats: results});
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

app.post("/addtips", function (request, response){
    let sampleFile;
    let uploadFile;

    console.log(request.body)

    if(!request.files || Object.keys(request.files).length === 0){
        connection.query("INSERT INTO tips SET ?",
        {
            title : request.body.title,
            text : request.body.text, 
            image : null,
        },
        (error, rows) => {
            response.redirect('/admin-index')
        });
    }else{
        sampleFile = request.files.sampleFile;
        uploadFile = __dirname + '/css/images/index/slide/' + sampleFile.name
        console.log(sampleFile)

        sampleFile.mv(uploadFile, function(error){
            if(error) return response.status(500).send(error)

            connection.query("INSERT INTO tips SET ?",
            {
                title : request.body.title,
                text : request.body.text,
                image : sampleFile.name, 
            },
            (error, rows) => {
                response.redirect('/admin-index')
            });
        });
    }
});

app.post("/updatetips", function (request,response){
    console.log(request.body);
    let id = request.body.id;
    
    if(!request.files || Object.keys(request.files).length === 0){
        console.log("no file founded");
        connection.query("UPDATE tips SET ? WHERE id = ?",
        [   
            {
                title : request.body.title,
                text : request.body.text, 
            },
            parseInt(id),
        ],
        (error, rows) => {
            response.redirect('/admin-index')
        });
    }else{
        sampleFile = request.files.sampleFile;
        uploadFile = __dirname + '/css/images/index/slide/' + sampleFile.name
        console.log(sampleFile)

        sampleFile.mv(uploadFile, function(error){
            if(error) return response.status(500).send(error)

            connection.query("UPDATE tips SET ? WHERE id = ?",
            [   
                {
                    title : request.body.title,
                    text : request.body.text, 
                    image : sampleFile.name,
                },
                parseInt(id),
            ],
            (error, rows) => {
                response.redirect('/admin-index')
            });
        });
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

app.post("/updatecats", function (request,response){
    console.log(request.body);
    let id = request.body.id;
    
    if(!request.files || Object.keys(request.files).length === 0){
        console.log("no file founded");
        connection.query("UPDATE catlist SET ? WHERE id = ?",
        [   
            {
                name: request.body.name,
                gender: request.body.gender,
                age: request.body.age,
                color: request.body.color,
                price: request.body.price,
                status: parseInt(request.body.status),
            },
            parseInt(id),
        ],
        (error, rows) => {
            response.redirect('/admin-cats')
        });
    }else{
        sampleFile = request.files.sampleFile;
        uploadFile = __dirname + '/css/images/catlist/' + sampleFile.name
        console.log(sampleFile)

        sampleFile.mv(uploadFile, function(error){
            if(error) return response.status(500).send(error)

            connection.query("UPDATE catlist SET ? WHERE id = ?",
            [   
                {
                    name: request.body.name,
                    gender: request.body.gender,
                    age: request.body.age,
                    color: request.body.color,
                    price: request.body.price,
                    status: parseInt(request.body.status),
                    image : sampleFile.name,
                },
                parseInt(id),
            ],
            (error, rows) => {
                response.redirect('/admin-cats')
            });
        });
    }
});

app.post("/addcatimg", function(request, response){
    sampleFile = request.files.sampleFile;

    if(!request.files || Object.keys(request.files).length === 0){
        return response.status(400).send("No files were uploaded")
    }
    sampleFile = request.files.sampleFile;
    uploadFile = __dirname + '/css/images/catlist/' + sampleFile.name
    console.log(sampleFile)

    sampleFile.mv(uploadFile, function(error){
        if(error) return response.status(500).send(error)

        connection.query("UPDATE catlist SET "+request.body.title+"= ? WHERE id = ?",
        [
        
        sampleFile.name,
    
        request.body.id,
        ],
         (error, rows) => {
            response.redirect('/admin-content/'+request.body.id)
        });
    });
})

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

app.post("/deletetip", function (request, response){
    console.log(request.body);
    let id = parseInt(request.body.id);
    connection.query("DELETE FROM tips WHERE id = ?", [id], (error,rows) =>{
        response.redirect('/admin-index')
    });
});
app.post("/deletecat", function (request, response){
    console.log(request.body);
    let id = parseInt(request.body.id);
    connection.query("DELETE FROM catlist WHERE id = ?", [id], (error,rows) =>{
        response.redirect('/admin')
    });
});
app.post("/deleteimg", function(request, response){
    connection.query("UPDATE catlist SET "+request.body.title+"= NULL WHERE id = ?",
    [
    request.body.id,
    ],
     (error, rows) => {
        response.redirect('/admin-content/'+request.body.id)
    });
})
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

app.listen(3000, function(){
    console.log("Listening at Port 3000")
  });