import axios from "axios";

const token = "60302a764d39e7a9c131da130128ce78";

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
    const coords = JSON.parse(event.body).coords;
    const searchText = encodeURIComponent(coords);

    const response = await axios.get(
      `https://api.darksky.net/forecast/${token}/${searchText}?units=si&exclude=minutely`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    if (err.response) {
      callback("error", {
        statusCode: err.response.status,
        body: err.response.data
      });
    } else {
      callback("error", {
        statusCode: 500,
        body: "There was an unexpected error"
      });
    }
  }
}
