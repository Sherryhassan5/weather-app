const form = document.querySelector("form");
const inputField = document.getElementById("city");
var cityName = "Lahore";
let dayInfo = new Date();
let card = document.getElementsByClassName("card")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
card.classList.toggle("hide");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  cityName = inputField.value;
  console.log(cityName);

  const url =
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + cityName;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f57c48ef7bmshd10c21f5c900277p18540djsn183a37f6a946",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      if (result.temp == undefined) {
        wrapper.innerHTML = "you entered wrong city";
      } else {
        wrapper.innerHTML = "";
        card.classList.toggle("hide");
        document.getElementById("temp").innerHTML =
          result.temp + " <sup>o</sup>C";
        document.getElementById("cityName").innerHTML = cityName.toUpperCase();
        document.getElementById("hum").innerHTML =
          "Humidity : " + result.humidity;
        document.getElementById("wind").innerHTML =
          "Wind Speed : " + result.wind_speed + "km/h";

        if (result.cloud_pct <= 20) {
          document.getElementById("type").innerHTML = "Clear";
        } else if (result.cloud_pct > 20 && result.cloud_pct <= 40) {
          document.getElementById("type").innerHTML = "Cloudy";
        } else {
          document.getElementById("type").innerHTML = "Rainy";
        }

        if (result.cloud_pct <= 20 && dayInfo.getHours() < 13) {
          card.style.backgroundImage = "url('sunny.jpg')";
          card.style.color = "black";
        } else if (
          result.cloud_pct > 20 &&
          result.cloud_pct <= 40 &&
          dayInfo.getHours() < 13
        ) {
          card.style.backgroundImage = "url('rainy.jpg')";
          document.body.style.color = "white";
        } else if (result.cloud_pct > 20 && dayInfo.getHours() > 18) {
          document.body.style.color = "white";
        }

        console.log(result);
      }
    })
    .catch((err) => console.log(err));
});

let day = dayInfo.getDay();
let today;
switch (day) {
  case 1:
    today = "Monday";
    break;
  case 2:
    today = "Tuesday";
    break;
  case 3:
    today = "Wednesday";
    break;
  case 4:
    today = "Thursday";
    break;
  case 5:
    today = "Friday";
    break;
  case 6:
    today = "Saturday";
    break;
  case 7:
    today = "Sunday";
    break;
  default:
    console.log("fail");
}

let month = dayInfo.toLocaleString("default", { month: "long" });
let date = dayInfo.getDate();
let year = dayInfo.getFullYear();
document.getElementById("day").innerHTML =
  today + ", " + date + " " + month + ", " + year;

// Function to get the current time of a city by its name
async function getCityTime(cityName) {
  // Step 1: Get latitude and longitude by city name
  let urll =
    "https://maps.googleapis.com/maps/api/geocode/json?&address=" + cityName;
  const geocodeResponse = await fetch(urll);
  const geocodeData = await geocodeResponse.json();
  console.log(geocodeData.results);
  if (!geocodeData.results || geocodeData.results.length === 0) {
    throw new Error("No results found for the specified city name.");
  }
  const { lat, lng } = geocodeData.results[0].geometry.location;

  // Step 2: Get timezone by latitude and longitude
  const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
  const timezoneResponse = await fetch(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}`
  );
  const timezoneData = await timezoneResponse.json();
  const { timeZoneId } = timezoneData;

  // Step 3: Get dateTime by given timeZoneId
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timeZoneId,
  });
  return currentTime;
}

// Example usage
getCityTime("New York").then((time) => console.log(time));

// GEt date in the js
const date = new Date().getDay();
console.log(date);

setInterval(function () {
  let now = new Date();

  let hour = now.getHours();
  let minute = now.getMinutes();

  if (hour >= 12) {
    let tempHour = hour;
    tempHour = tempHour - 12;
    if (minute < 10) {
      document.getElementById("time").innerHTML =
        tempHour + ":0" + minute + " <span class='sm-font'>PM</span>";
    } else {
      document.getElementById("time").innerHTML =
        tempHour + ":" + minute + " <span class='sm-font'>PM</span>";
    }
  } else {
    if (minute < 10) {
      document.getElementById("time").innerHTML =
        hour + ":0" + minute + " <span class='sm-font'>AM</span>";
    } else {
      document.getElementById("time").innerHTML =
        hour + ":" + minute + " <span class='sm-font'>AM</span>";
    }
  }
}, 1000);

// document.getElementById("time").innerHTML = "";
