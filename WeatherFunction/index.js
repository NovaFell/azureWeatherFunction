const fetch = require('node-fetch');

module.exports = async function (context, req) {
    const city = req.query.city || (req.body && req.body.city);
    if (!city) {
        context.res = {
            status: 400,
            body: "Please pass a city name on the query string or in the request body"
        };
        return;
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=impoerial`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            context.res = {
                status: 200,
                body: data
            };
        } else {
            context.res = {
                status: data.cod,
                body: data.message
            };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error fetching weather data"
        };
    }
};
