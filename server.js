/** @format */

const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");
const md5 = require("md5");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
	host: "192.168.42.227",
	database: "chat_apps",
	user: "wsl",
	password: "031299",
});

db.connect((err) => {
	if (err) throw err;
	console.log("Database Connected Successfully....🔥");

	app.get("/", (req, res) => {
		res.render("index", {
			titleApp: "SIMPLE CHATTING APP 😊",
			headTitle: "LOGIN FOR START CHATTING 🚪",
		});
	});

	app.post("/login", (req, response) => {
		const email = req.body.email;
		const password = req.body.password;
		const query = `SELECT * FROM users WHERE email = '${email}' AND password= '${md5(
			password
		)}'`;
		db.query(query, (err, result) => {
			if (err) throw err;
			console.log(response.status(200).send({ message: "success" }));
		});
		console.log(email);
		console.log(password);
		response.redirect("/");
	});
});

app.listen(3001, () => {
	console.log("------------------------");
	console.log("server is ready now ! 🔥");
	console.log("------------------------");
});
