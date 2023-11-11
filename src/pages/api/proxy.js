const axios = require("axios");

const API_URL =
  "https://api-inference.huggingface.co/models/njwrigh92/t-5-comedy";
const headers = {
  Authorization: "Bearer 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",
};

const apiRequestHandler = async (req, res) => {
  try {
    const { data } = await axios.post(API_URL, req.body, { headers });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error proxying request:", error);
    const { status } = error.response || {};
    res.status(status || 500).json({ error: error.message });
  }
};

module.exports = apiRequestHandler;
