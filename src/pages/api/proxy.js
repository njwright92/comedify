const axios = require("axios");

const API_URL =
  "https://api-inference.huggingface.co/models/njwrigh92/t-5-comedy";
const headers = {
  Authorization: "Bearer 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",
};

module.exports = async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body, { headers: headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
