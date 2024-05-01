const form = document.querySelector("form");
const inputField = document.getElementById("city");
var cityName = 'lahore';
form.addEventListener("submit", (e) => {
    e.preventDefault();
    cityName = inputField.value;
    console.log(cityName);
    try {
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
                    document.getElementsByClassName("wrapper")[0].innerHTML = "you entered wrong city";

                } else {
                    // document.getElementById("sunset").innerHTML = result.temp + " <sup>o</sup>C";
                    console.log(result);
                }
            })
            .catch(err => document.write(err));
    } catch (error) {
        document.write(error);
    }
})