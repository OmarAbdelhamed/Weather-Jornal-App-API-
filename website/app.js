/* Global Variables */

// const { json } = require("body-parser");

// Create a new date instance dynamically with JS
let d = new Date();
const newDate = d.toDateString();
// here is my api key
const APIkey = "fe0c44e03d38a0e18dc52341c32d61b0"
// here i selected the button from the DOM
const generate = document.querySelector("#generate")

// here i did add an event Listener to the button to call the Data
// and inside it i made a variuble to get the value of the zipcode and the feeling 
// then i used try and catch to make sure every thing is running right
// inside imade two variubles to allow postData function to use weatherTemp and getCity functions 
// then i made a call for postData and UpdateUi functions
generate.addEventListener("click", async ()=>{
    const ZipCode = document.querySelector("#zip").value
    const feelings = document.querySelector("#feelings").value
    try{
        const temp = await weatherTemp(ZipCode)
        const city = await getCity(ZipCode)

        await postData(temp, feelings, city,)
        await UpdateUi()
        document.getElementById('entry').style.opacity = 1;
        
    }catch(err){
        console.log(err);
    }
})

// here is a function to get the temp 
async function weatherTemp(ZipCode){
    const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${ZipCode},&appid=${APIkey}&units=metric`
        
        const res = await fetch(fullURL)
        const data = await res.json()

        const temp = data.main.temp
        return temp
}

// and here is another function to get the city name fon the data
async function getCity(ZipCode){
    const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${ZipCode},&appid=${APIkey}&units=metric`

        const res = await fetch(fullURL)
        const data = await res.json()
        const city = data.name
        return city

}

// this is the post function to post hte data
async function postData(temp, feelings, city){
    await fetch('/weatherData', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feelings: feelings,
            city: city,
        })
    });
}

// function to GET the project Data and updating the UI Dynamically with the data 
// also added try and catch to make sure there is no problems with the code
    async function UpdateUi(){
    const nodeRes = await fetch('/getWeather');
    
    try {
        const finalData = await nodeRes.json();
            console.log(finalData);
        document.getElementById("city").innerHTML = finalData.city;
        document.getElementById("date").innerHTML = finalData.date;
        document.getElementById("temp").innerHTML = finalData.temp + '&degC';
        document.getElementById("content").innerHTML = finalData.feelings;
      } catch (error) {
        console.log('there is a problem');
      }
    
}
