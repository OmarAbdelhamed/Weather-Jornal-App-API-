// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); 
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, ()=>{
    console.log(`server is running and all set at localhost : ${port}`)
})
// here is the GET request
app.get("/getWeather", (req, res) => {
    res.send(projectData)
});
// the POST request
app.post("/weatherData", (req, res)=>{
    projectData = {...req.body}
    res.end()
});