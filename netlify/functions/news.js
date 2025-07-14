const axios = require("axios");

exports.handler = async function(event, context) {
  const { country = 'in', category = 'general' } = event.queryStringParameters;

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country,
        category,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
