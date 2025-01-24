# ./GetWeatherFromCityName.sh
api_key=""
city="Lisbon"
curl "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$api_key&units=metric"
