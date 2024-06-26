const form = document.querySelector("form");
const inputField = document.getElementById("city");
var cityName = 'Lahore';
let dayInfo;
let card = document.getElementsByClassName("card")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
card.classList.toggle('hide');
let myInterval;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    cityName = inputField.value;
    console.log(cityName);
    clearInterval(myInterval);



    const urlForT = 'https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city='+cityName;
    const optionsForT = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f57c48ef7bmshd10c21f5c900277p18540djsn183a37f6a946',
            'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
        }
    };
    fetch(urlForT, optionsForT)
        .then(response => response.json())
        .then((result) => {
            document.getElementById("day").innerHTML = result.day_of_week + ", " + result.day + " " + result.month + ", " + result.year;
            dayInfo = result.hour;
            myInterval = setInterval(function () {
                let hour = result.hour;
                
                let minute = result.minute;
                
                if (hour >= 13) {
                    let tempHour = hour;
                    tempHour = tempHour - 12;
                    if (minute < 10) {
                        document.getElementById("time").innerHTML = tempHour + ":" + minute + " <span class='sm-font'>PM</span>"
                    } else {
                        document.getElementById("time").innerHTML = tempHour + ":" + minute + " <span class='sm-font'>PM</span>"
                    }

                }else if(hour == "00"){
                    document.getElementById("time").innerHTML = "12" + ":" + minute + " <span class='sm-font'>AM</span>"
                }                
                else {
                    if (minute < 10) {
                        document.getElementById("time").innerHTML = hour + ":" + minute + " <span class='sm-font'>AM</span>"
                    } else {
                        document.getElementById("time").innerHTML = hour + ":" + minute + " <span class='sm-font'>AM</span>"
                    }

                }
            }, 1000)

        }).catch(err => console.log(err));



    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityName;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f57c48ef7bmshd10c21f5c900277p18540djsn183a37f6a946',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };


    fetch(url, options)
        .then(response => response.json())
        .then((result) => {
            if (result.temp == undefined) {
                wrapper.innerHTML = "you entered wrong city";
                card.classList.add("hide");

            } else {
                wrapper.innerHTML = "";
                card.classList.remove("hide");
                document.getElementById("temp").innerHTML = result.temp + " <sup>o</sup>C";
                document.getElementById("cityName").innerHTML = cityName.toUpperCase();
                document.getElementById("hum").innerHTML = "Humidity : " + result.humidity;
                document.getElementById("wind").innerHTML = "Wind Speed : " + result.wind_speed + "km/h";

                if (result.cloud_pct <= 20) {
                    document.getElementById("type").innerHTML = "Clear";
                } else if (result.cloud_pct > 20 && result.cloud_pct <= 40) {
                    document.getElementById("type").innerHTML = "Cloudy";
                } else {
                    document.getElementById("type").innerHTML = "Rainy";
                    console.log(result);
                }


                console.log(dayInfo);
                if (result.cloud_pct <= 20 && dayInfo < 13) {
                    card.style.backgroundImage = "url('sunny.jpg')";
                    card.style.color = "black";
                } else if (result.cloud_pct > 20 && result.cloud_pct <= 40 && dayInfo < 13) {
                    card.style.backgroundImage = "url('rainy.jpg')";
                    document.body.style.color = "white";
                } else if (result.cloud_pct > 20 && dayInfo > 18) {
                    document.body.style.color = "white";
                }




                console.log(result);

            }
        })
        .catch(err => console.log(err));
}
);





// document.getElementById("time").innerHTML = "";