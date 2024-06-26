// Require the express module
const express = require("express");
// Create an instance of the express application
const app = express();
// Require the path module
const path = require("path");
// Require the express-ejs-layouts module
const ejsLayouts = require("express-ejs-layouts");
// Require the reminder_controller module from the specified path
const reminderController = require("./controller/reminder_controller");
// Require the auth_controller module from the specified path
const authController = require("./controller/auth_controller");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming request bodies with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

// Use EJS layouts for rendering views
app.use(ejsLayouts);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Define routes for handling reminders
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);

// Implement routes for updating and deleting reminders
// Update a reminder with the specified id
app.post("/reminder/update/:id", reminderController.update);
// Delete a reminder with the specified id
app.post("/reminder/delete/:id", reminderController.delete);
// 👌 Ignore for now
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
