const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());
let fetch;

import('node-fetch').then(module => {
    fetch = module.default;
});

app.post('/ask-comicbot/', async (req, res) => {
    console.log("Received a request at /ask-comicbot");
    const prompt = req.body.prompt;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify({ "inputs": prompt })
            }
        );

        const result = await response.json();
        console.log("Received response:", result);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get a response from the bot' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
