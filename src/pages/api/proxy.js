// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/infer', req.body);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
