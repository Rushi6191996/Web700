/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Pathak Rushiraj
   Student ID: 165943234
   Date: 09 Sep, 2024
*
********************************************************************************/ 


const serverVerbs = ["GET", "GET", "GET", "POST", "GET", "POST"];


const serverPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout"];


const serverResponses = [
  "Welcome to WEB700 Assignment 1",
  "This assignment was prepared by Rushiraj Pathak",
  "Rushiraj Pathak: rnpahtak@myseneca.ca",
  "User Logged In",
  "Main Panel",
  "Logout Complete"
];


function httpRequest(method, path) {
    for (let i = 0; i < serverPaths.length; i++) {
        if (serverVerbs[i] === method && serverPaths[i] === path) {
            return `200: ${serverResponses[i]}`;
        }
    }
    return `404: Unable to process ${method} request for ${path}`;
}


console.log(httpRequest("GET", "/")); 
console.log(httpRequest("GET", "/about")); 
console.log(httpRequest("GET", "/contact")); 
console.log(httpRequest("POST", "/login")); 
console.log(httpRequest("POST", "/logout")); 
console.log(httpRequest("PUT", "/")); 
console.log(httpRequest("GET", "/randomPath")); 


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function automateTests() {
    const testVerbs = ["GET", "POST"];
    const testPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout", "/randomPath1", "/randomPath2"];

    function randomRequest() {
        const randVerb = testVerbs[getRandomInt(testVerbs.length)];
        const randPath = testPaths[getRandomInt(testPaths.length)];
        console.log(httpRequest(randVerb, randPath));
    }

    setInterval(randomRequest, 1000);
}

automateTests();