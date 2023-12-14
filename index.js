const express = require('express');
const axios = require('axios');

const app = express();
const apiKey = 'b30ae6c21a51b73cea2fabf25dd360a5';
app.use(express.json());

app.use(express.static('public'));


app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = await getWeatherData(cities);
    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getWeatherData(cities) {
  const weatherData = {};

  for (const city of cities) {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

      weatherData[city] = `${response.data.main.temp}°C`;
    } catch (error) {
      weatherData[city] = 'Not found';
    }
  }

  return weatherData;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
