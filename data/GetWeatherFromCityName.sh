# ./GetWeatherFromCityName.sh
api_key="51a87b5574b14304ab2fd027544ad2ed"
city="Lisbon"
curl "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$api_key&units=metric"
