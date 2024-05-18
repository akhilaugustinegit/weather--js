const weatherForm = document.querySelector(".weatherForm");
const cityInput =document.querySelector(".cityInput");

const card =document.querySelector(".card");
const apiKey="3841f8cb881720e64922340c8048fd36";


weatherForm.addEventListener("submit", async event => {

event.preventDefault();


const city = cityInput.value;

if(city){
    try{
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);
   
    }
    catch(error){
        console.error();
        displayError(error);
    }

}
else{
    displayError("please enter a city");
}

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


const response = await fetch(apiUrl);
console.log(response);

if(!response.ok){
    throw new Error("could not fetch weather data");
}
return await response.json();
 
}

function displayWeatherInfo(data){


    const{name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;
        card.textContent="";
        card.style.display="flex";


        const cityDisplay =document.createElement("h1");

        const tempDisplay =document.createElement("p");
        const humidityDisplay =document.createElement("p");


        const descDisplay =document.createElement("p");
        const weatherDisplay =document.createElement("p");
      

        cityDisplay.textContent =city;

        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°c`;
        humidityDisplay.textContent = `Humidity :${humidity}%`;

        cityDisplay.classList.add("cityDisplay");
        card.appendChild(cityDisplay);

        tempDisplay.classList.add("tempDisplay");
        card.appendChild(tempDisplay);

        humidityDisplay.classList.add("humidityDisplay");
        card.appendChild(humidityDisplay);
        descDisplay.textContent = description;
        weatherDisplay.textContent = getWeatherEmoji(id);
        weatherDisplay.classList.add("weatherDisplay");
        card.appendChild(weatherDisplay);
        descDisplay.classList.add("descDisplay");
        card.appendChild(descDisplay);  

}
function getWeatherEmoji(weatherId){

}
function displayError(message){

    const errorDisplay = document.createElement("p");

    errorDisplay.textContent = message;

    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
}