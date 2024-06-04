# To run: use ./GetWeatherFromCityName.sh
api_key=""
curl "https://api.openweathermap.org/data/2.5/weather?q=Reboleira&appid=$api_key&units=metric" | json
