let button = document.querySelector('#button');
let city = document.querySelector('#city-name');
let error = document.querySelector('#error');
let currentWeather = document.querySelector('#current-weather');
let buttonsScaleForecast = document.querySelector('#buttons-scale-forecast');

button.addEventListener('mouseover', (e) => {
    if(e.target.textContent == "Zééé partiii") {
        e.target.textContent = "👀☀️☁️🌪️❄️💨🌧️🌈👀";
    };
});

button.addEventListener('mouseout', (e) => {
    if(e.target.textContent == "👀☀️☁️🌪️❄️💨🌧️🌈👀") {
        e.target.textContent = "Zééé partiii";
    }
});

button.addEventListener('click', (e) => {
    let cityName = city.value.normalize('NFD').replace(/\s/g , "-").replace(/[\u0300-\u036f]/g, "").replace(/[0-9]/g, '').toLowerCase();

    /*fetch(`https://api.weatherapi.com/v1/current.json?key=4ae32182d907474e93895631210706&lang=fr&q=${cityName}/`)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error("Une erreur est survenue, n'hésite pas à contacter l'administrateur du site");
            }
        })
        .then((value) => {
            console.log(value);
        })
        .catch((err) => {
            error.style.display = "block";
            error.innerHTML = `Oups... Il y a eu un problème pour receuillir les données : ${err}<br/> N'hésite pas à contacter l'administrateur du site`;
        });*/
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ae32182d907474e93895631210706&lang=fr&days=3&q=${cityName}/`)
        .then((res) => {
            if(res.ok) {
                error.style.display = "none";
                return res.json();
            } else {
                throw new Error("Une erreur est survenue, n'hésite pas à contacter l'administrateur du site");
            }
        })
        .then((value) => {
            document.querySelector('section').style.display = "block";
            console.log(value);
            let date = new Date().getHours() + ":00";
            let lastUpdatedDate = (((new Date(value.current.last_updated).getHours() < 10) ? '0' : '') + new Date(value.current.last_updated).getHours())  + ":" + (((new Date(value.current.last_updated).getMinutes() < 10) ? '0' : '') + new Date(value.current.last_updated).getMinutes());

            document.querySelector("#name-city").innerHTML = "Météo à " + value.location.name + ", " + value.location.region + ", " + value.location.country;
            document.querySelector('#current-hour').innerHTML = "Dernière actualisation : " + lastUpdatedDate;

            currentWeather.children[0].setAttribute("src", value.current.condition.icon);
            currentWeather.children[1].innerHTML = value.current.condition.text;
            currentWeather.children[2].children[0].innerHTML = "Température : " + value.current.temp_c + "°C";
            currentWeather.children[2].children[1].innerHTML = "Ressenti : " + value.current.feelslike_c + "°C";

        })
        .catch((err) => {
            document.querySelector("#name-city").innerHTML = "";
            error.style.display = "block";
            error.innerHTML = `Oups... Il y a eu un problème pour receuillir les données : ${err}`;
        })
});

for(let i = 0 ; i < buttonsScaleForecast.children.length ; i++) {

    buttonsScaleForecast.children[i].addEventListener('click', (e) => {
        
        if(e.target.className == "") {
            e.target.classList.add('active-button-scale-forecast');
        }

        /*if(buttonsScaleForecast.children[i] == buttonsScaleForecast.children[0]) {
            buttonsScaleForecast.children[1].classList.value
        }*/
        
        /*if(buttonsScaleForecast.children[i-1] == undefined && buttonsScaleForecast.children[i+1].classList.contains("active-button-scale-forecast")) {
            buttonsScaleForecast.children[i+1].classList.remove('active-button-scale-forecast');  
        } else if(buttonsScaleForecast.children[i+1] == undefined && buttonsScaleForecast.children[i-1].classList.contains("active-button-scale-forecast")) {
            buttonsScaleForecast.children[i-1].classList.remove('active-button-scale-forecast');
        }*/

        if((buttonsScaleForecast.children[i+1] != undefined && buttonsScaleForecast.children[i+1].classList.contains('active-button-scale-forecast')) || (buttonsScaleForecast.children[i+2] != undefined && buttonsScaleForecast.children[i+2].classList.contains('active-button-scale-forecast'))) {
            if(buttonsScaleForecast.children[i+1] != undefined) {
                buttonsScaleForecast.children[i+1].classList.remove('active-button-scale-forecast');
            }
            if(buttonsScaleForecast.children[i+2] != undefined) {
                buttonsScaleForecast.children[i+2].classList.remove('active-button-scale-forecast');
            }
        } else if((buttonsScaleForecast.children[i-1] != undefined && buttonsScaleForecast.children[i-1].classList.contains('active-button-scale-forecast')) || (buttonsScaleForecast.children[i+1] != undefined && buttonsScaleForecast.children[i+1].classList.contains('active-button-scale-forecast'))) {
            if(buttonsScaleForecast.children[i-1] != undefined) {
                buttonsScaleForecast.children[i-1].classList.remove('active-button-scale-forecast');
            }
            if(buttonsScaleForecast.children[i+1] != undefined) {
                buttonsScaleForecast.children[i+1].classList.remove('active-button-scale-forecast');
            }
        } else if((buttonsScaleForecast.children[i-1] != undefined && buttonsScaleForecast.children[i-1].classList.contains('active-button-scale-forecast')) || (buttonsScaleForecast.children[i-2] != undefined && buttonsScaleForecast.children[i-2].classList.contains('active-button-scale-forecast'))) {
            if(buttonsScaleForecast.children[i-1] != undefined) {
                buttonsScaleForecast.children[i-1].classList.remove('active-button-scale-forecast');
            }
            if(buttonsScaleForecast.children[i-2] != undefined) {
                buttonsScaleForecast.children[i-2].classList.remove('active-button-scale-forecast');
            }
        }
    });
}

console.log(buttonsScaleForecast.children[0].classList.contains('active-button-scale-forecast'));