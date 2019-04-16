import axios from "axios";

const access_token =
  "pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g";

// Would make sense to add gzip compression to HTTP calls because the weather data is quite big

export async function handler(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback("error", {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method Not Allowed",
        msg: "Allowed Methods: [ POST ]"
      })
    });
  }

  try {
    // We assume that the query parameter is always gonna be present on the body
    const query = JSON.parse(event.body).query;
    const searchText = encodeURIComponent(query);

    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${access_token}&autocomplete=true&types=place`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    if (err.response) {
      return callback("error", {
        statusCode: err.response.status,
        body: err.response.data
      });
    } else {
      return callback("error", {
        statusCode: 500,
        body: "There was an unexpected error"
      });
    }
  }
}
