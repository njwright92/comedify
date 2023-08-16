import React, { useState } from 'react';
import Navbar from './components/navbar';
import axios from 'axios';

const ComicBot = () => {
    const [conversation, setConversation] = useState([]);
    const [userInput, setUserInput] = useState('');
    const askComicbot = async (prompt) => {
        try {
            const res = await axios.post('http://localhost:3001/ask-comicbot/', { prompt });
            return res.data; // Return the whole data object
        } catch (error) {
            console.error(error);
        }
    };



    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = async () => {
        setConversation([...conversation, { from: 'user', text: userInput }]);
        setUserInput('');

        try {
            const botResponses = await askComicbot(userInput); // Get the bot's response directly

            // If you want to use just the first response
            const botResponse = botResponses[0].generated_text;

            // Append the bot's response to the conversation
            setConversation(prevConversation => [...prevConversation, { from: 'bot', text: botResponse }]);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-4">
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">ComicBot</h1>
            <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
                <div className="input-area flex flex-col items-center">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        className="p-2 border border-black rounded text-black"
                        placeholder="Write your bit..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded mt-4 glow"
                    >
                        Send
                    </button>
                </div>
                <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
                    {conversation.map((message, index) => (
                        <div
                            key={index}
                            className={message.from === 'bot' ? 'bot-message-container' : 'user-message-container'}>
                            <p
                                className={message.from === 'bot' ? 'bot-message' : 'user-message'}>
                                {message.text}
                            </p>
                            {message.from === 'bot' && <span className="text-black">Bot:..</span>}
                        </div>
                    ))}
                </div>
            </div>
        </main >
    );
};

export default ComicBot;
