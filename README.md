# bann-kt-nodejs
This website is a platform for a cattery business, built using Node.js as the backend and the EJS template engine for rendering views. The website utilizes a SQL relational database to store and retrieve information about the cattery's cats and services. The design of the website is based on the Bootstrap framework, ensuring a responsive and user-f

to run the service you will need to install all of the package include in package.json
```
npm install
```

After install all the package needed, you will need to create new SQL Database, Import the Given SQL Queries and change the credentials of the DB in app.js,
(he current DB does not work anymore since I didn't manage to extend the session of it)
```
var connection = mysql.createConnection({
    host: "localhost",
    user: "Username",
    password: "Password",
    database: "Database Name"
});
```

To run the website type :

```
npm start
```
or 
```
node app.js
```

Snapshot of the website :
<img src="./images/1home1.png" alt="img1">
<img src="./images/2aboutus.png" alt="img2">
<img src="./images/3catlist.png" alt="img3">
<img src="./images/4sir-dam.png" alt="img4">
<img src="./images/5-contact.png" alt="img5">
<img src="./images/11-login.png" alt="img6">
<img src="./images/12-cat.png" alt="img7">
<img src="./images/13-parent.png" alt="img8">
<img src="./images/14-tips.png" alt="img9">
