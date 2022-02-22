require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/prestamo", function(req, res) {
  res.render("prestamo");
});

app.post("/prestamo", function(req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let contactNumber = req.body.contactNumber;
  let studentNumber = req.body.studentNumber;
  let department = req.body.department;
  let choice = req.body.choice;

  let userInfo = {
    name: name,
    email: email,
    contactNumber: contactNumber,
    studentNumber: studentNumber,
    department: department,
    choice: choice
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: process.env.SENTTO,
    subject: "Prestamo de Equipo",
    text: `Informacion del solicitante:\n
    Nombre: ${req.body.name}\n
    Numero de estudiante: ${req.body.studentNumber}\n
    Email: ${req.body.email}\n
    Numero de Contacto: ${req.body.contactNumber}\n
    Departamento: ${req.body.department}\n
    Prestamo de Equipo: ${req.body.choice}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      console.log("paso algo");
    } else {
      console.log("Email Sent");
      res.redirect("prestamo");
    }
  })
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
