const axios = require("axios");

exports.handler = async function(event, context) {
  const { country = 'in', category = 'general', q } = event.queryStringParameters;

  const params = {
    apiKey: process.env.NEWS_API_KEY,
  };

  // If searching with query, remove category/country
  if (q) {
    params.q = q;
  } else {
    params.country = country;
    params.category = category;
  }

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
