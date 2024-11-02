/**********************************************************************************  
WEB700 – Assignment 03 
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source 
(including 3rd party web sites) or distributed to other students. 

Name:Rushiraj Pathak  Student ID:165943234 Date: 12/10/2024
*********************************************************************************/

const express = require("express");
const path = require("path");
const collegeData = require("./collegeData"); // Import the collegeData module

const app = express();
const HTTP_PORT = process.env.PORT || 8080; // Set the port to 8080 or an environment variable
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Route for serving the home.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// Route for serving the about.html file
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// Route for serving the htmlDemo.html file
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});
app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

app.post("/students/add", (req, res) => {
    console.log("Form data received:", req.body); // Log form data to the console

    // Define studentData based on req.body
    const studentData = {
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        email: req.body.email || "",
        addressStreet: req.body.addressStreet || "",
        addressCity: req.body.addressCity || "",
        addressProvince: req.body.addressProvince || "",
        TA: req.body.TA ? true : false, // Handle checkbox
        status: req.body.status || "Full Time",
        course: req.body.course || "1"
    };

    console.log("Processed student data:", studentData); // Log processed data for verification

    // Add the student using the processed data
    collegeData.addStudent(studentData)
        .then(() => {
            console.log("Student added successfully");
            res.redirect("/students");
        })
        .catch((err) => {
            console.error("Error adding student:", err);
            res.status(500).send("Error adding student: " + err);
        });
});


// Route to get all students, or students filtered by course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => res.json(data))  // Return filtered students as JSON
            .catch(err => res.json({ message: "no results" })); // Handle error case
    } else {
        collegeData.getAllStudents()
            .then(data => res.json(data))  // Return all students as JSON
            .catch(err => res.json({ message: "no results" })); // Handle error case
    }
});

// Route to get all TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(data => res.json(data))  // Return TAs as JSON
        .catch(err => res.json({ message: "no results" })); // Handle error case
});

// Route to get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(data => res.json(data))  // Return courses as JSON
        .catch(err => res.json({ message: "no results" })); // Handle error case
});

// Route to get a specific student by student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(data => res.json(data))  // Return student by number as JSON
        .catch(err => res.json({ message: "no results" })); // Handle error case
});

// Catch-all route for invalid paths (404 error)
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize data and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port: ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Failed to initialize data: ${err}`);
    });
