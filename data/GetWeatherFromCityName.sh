# To run: use ./GetWeatherFromCityName.sh
api_key="d4cde55b3771d3e97882a32af3b4a774"
curl "https://api.openweathermap.org/data/2.5/weather?q=Reboleira&appid=$api_key&units=metric" | json
