/*********************************************************************************
*  WEB700 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Rushiraj Pathak Student ID: 165943234 Date: 27/09/2024
********************************************************************************/

const collegeData = require('./modules/collegeData');

collegeData.initialize().then(() => {
    console.log("Initialization successful");

    // Test getAllStudents
    collegeData.getAllStudents().then((students) => {
        console.log(`Successfully retrieved ${students.length} students`);
    }).catch((err) => {
        console.log(err);
    });

    // Test getCourses
    collegeData.getCourses().then((courses) => {
        console.log(`Successfully retrieved ${courses.length} courses`);
    }).catch((err) => {
        console.log(err);
    });

    // Test getTAs
    collegeData.getTAs().then((TAs) => {
        console.log(`Successfully retrieved ${TAs.length} TAs`);
    }).catch((err) => {
        console.log(err);
    });

}).catch((err) => {
    console.log(err);
});


