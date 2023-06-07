const axios = require("axios");

const getWeather = async (req, res, next) => {
  try {
    console.log(req.body.cities);
    const cities = req.body.cities;
      const citiesWeather = [];
      const finalisedCityWeather = []
    // const response = await axios.get(
    //   `https://api.api-ninjas.com/v1/geocoding?city=lagos`,
    //   { headers: { "X-Api-Key": "sJM19WM8mrfDjHA4QgVdiQ==1qdnJ904vdwuwAvl" } }
    // );
    // console.log(response.data);
    for (const city in cities) {
      console.log(cities[city]);
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/geocoding?city=${cities[city]}`,
        { headers: { "X-Api-Key": "sJM19WM8mrfDjHA4QgVdiQ==1qdnJ904vdwuwAvl" } }
      );
      citiesWeather.push(response.data[0]);
      console.log(response.data);
      }
      for (const cityIndex in citiesWeather) {
          console.log(
            citiesWeather[cityIndex]["latitude"],
            citiesWeather[cityIndex]["longitude"]
          );
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${citiesWeather[cityIndex]["latitude"]}&longitude=${citiesWeather[cityIndex]["longitude"]}&current_weather=true`
          );
          const countryInfo = {
              country: citiesWeather[cityIndex],
              data: response.data
          };
          finalisedCityWeather.push(countryInfo)
      }
    return res.status(200).json({
      status: "success",
      message: finalisedCityWeather,
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(500).json({
      message: error.toString(),
      status: "error",
    });
  }
};

module.exports = { getWeather };
