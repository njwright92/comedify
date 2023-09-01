/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const fetch = require("node-fetch");
const logger = require("firebase-functions/logger");

// Your askComicBot function
exports.askComicBot = onRequest(async (request, response) => {
    cors(request, response, async () => {
        logger.info("Received a request at /ask-comicbot", { structuredData: true });
        const prompt = request.body.prompt;

        try {
            const apiResponse = await fetch(
                "https://api-inference.huggingface.co/models/Triangles/comedian_4000_gpt_only",
                {
                    headers: {
                        Authorization: "Bearer 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",
                    },
                    method: "POST",
                    body: JSON.stringify({ inputs: prompt }),
                }
            );

            const result = await apiResponse.json();
            logger.info("Received response:", { result: result });

            // Send the bot's response back to the client
            response.json(result);

        } catch (error) {
            logger.error("Failed to get a response from the bot", { error: error });
            response.status(500).json({ error: "Failed to get a response from the bot" });
        }
    });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
