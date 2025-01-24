// TODO Icones e chuva

"use strict";

let urlBasis = "https://api.openweathermap.org/data/2.5/weather";
let key = "51a87b5574b14304ab2fd027544ad2ed";

function getWeather(in_city) {
    let units = "metric";

    let url =
        `${urlBasis}?q=${in_city}&appid=${key}&units=${units}`;

    let headers = new Headers();

    let init = {
        method: "GET",
        headers: headers,
        mode: "cors",
        cache: "default",
    };

    fetch(
        url,
        init,
    )
    .then(
        response => {
            if (response.ok) {
                return response.json();
            } // End if
            else {
                let erro = "";
                switch (response.status) {
                    case 404:
                        erro =
                        "Ocorreu um erro no acesso ao servidor " +
                        "- página não encontrada!";
                        break;
                    case 500:
                        erro = "Ocorreu um erro no acesso ao servidor!"
                        break;
                    default:
                        erro = "Ocorreu um erro no request!";
                }
                return Promise.reject(erro);
            } // End else - tratamento de erro
        })
        .then( response => {
            displayWeather(response);
        });
} // End function getWeather

function capitalizeFirstLetter(in_string) {
    return in_string.charAt(0).toUpperCase() + in_string.slice(1);
}

function displayWeather(in_weatherJson) {

    // Beaufort scale
    // Wind speed lower limit in m/s -> Name
    let arr_windScale = [
        [0, "Calm"],
        [0.3, "Light Air"],
        [1.6, "Light breeze	"],
        [3.4, "Gentle breeze"],
        [5.5, "Moderate breeze"],
        [8, "Fresh breeze"],
        [10.8, "Strong breeze"],
        [13.9, "High wind, near gale"],
        [17.2, "Gale"],
        [20.8, "Strong gale"],
        [24.5, "Storm"],
        [28.5, "Violent storm"],
        [32.7, "Hurricane"]
    ];

    let windName = "";

    let dNow = new Date();


    let options = {
        month: "short",
        day: "numeric"
    };
    
    let sDate = `${dNow.toLocaleDateString("en-US", options)}`;

    options = {

        hour: "numeric",
        minute: "numeric"
    };

    sDate = `${sDate}, ${dNow.toLocaleTimeString('en-US', options)
    .toLowerCase()
    .replace(" ", "")}`;

    document.querySelector(".orange-text").innerHTML = sDate;

    document.getElementById("cidade-e-pais").innerHTML = 
    `${in_weatherJson.name}, ${in_weatherJson.sys.country}`;

    document.getElementById("temperatura").innerHTML = 
    `${in_weatherJson.main.temp.toFixed()}°C`;

    for (let index = arr_windScale.length - 1; index >= 0 ; index-- ) {
        if ( in_weatherJson.wind.speed >= arr_windScale[index][0] ) {
            windName = arr_windScale[index][1];
            break;
        }
    }

    document.getElementById("resumo").innerHTML = 
    `Feels like ${
        in_weatherJson.main.feels_like.toFixed(0)
    }°C. ${
        capitalizeFirstLetter(in_weatherJson.weather[0].description)
    }. ${windName}`;

    // Obter a direção do vento
    // Mapeamento das direções do vento
    let arr_wind = [
        [0, "N"],
        [22.5, "NNE"], 
        [45, "NE"],
        [67.5, "ENE"],
        [90, "E"],
        [112.5, "ESE"],
        [135, "SE"],
        [157.5, "SSE"],
        [180, "S"],
        [202.5, "SSW"],
        [225, "SW"],
        [247.5, "WSW"],
        [270, "W"],
        [292.5, "WNW"],
        [315, "NW"],
        [337.5, "NNW"],
        [360, "N"]
    ];

    let divisao = 22.5;
    let angulo = in_weatherJson.wind.deg;

    let windDirection = "";

    for (let index = 0; index < arr_wind.length; index++ ) {

        if ( angulo >= arr_wind[index][0]-divisao/2 && angulo < arr_wind[index][0]+divisao/2  ) {
            windDirection = arr_wind[index][1];
            break;
        }
    }

    document.querySelector(".wind-line").innerHTML =
    `${in_weatherJson.wind.speed.toFixed(1)}m/s ${windDirection}`;

    document.querySelector(".pressure").innerHTML = 
    `${in_weatherJson.main.pressure}hPa`;

    document.getElementById("humidity").innerHTML +=
    `${in_weatherJson.main.humidity}%`;

    document.getElementById("visibility").innerHTML +=
    `${(in_weatherJson.visibility/1000).toFixed(1)}km`;

    let a = 6.112;
    let b = 17.67;
    let c = 243.5;

    let T = in_weatherJson.main.temp;

    let gamma = Math.log(in_weatherJson.main.humidity/100) + b*T/(c+T);

    let Td = c * gamma / ( b - gamma );

    document.getElementById("dew").innerHTML += `${Math.round(Td)}°C`;
}

let cidade = "Lisboa";
getWeather(cidade);

