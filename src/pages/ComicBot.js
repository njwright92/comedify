import React, { useState } from 'react';
import Navbar from './components/navbar';
import axios from 'axios';

const ComicBot = () => {
    const [conversation, setConversation] = useState([]);
    const [userInput, setUserInput] = useState('');
    const askComicbot = async (prompt) => {
        try {
            const res = await axios.post('http://localhost:3001/ask-comicbot/', { prompt });
            return res.data;
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
            const botResponses = await askComicbot(userInput); 

            
            const botResponse = botResponses[0].generated_text;

            
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
                    <textarea
                        value={userInput}
                        onChange={handleInputChange}
                        className="p-2 border border-black rounded text-black resize-y"
                        placeholder="Write your bit..."
                        rows="2"
                    />

                    <button
                        onClick={handleSend}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded mt-4 glow"
                    >
                        Send
                    </button>
                </div>
                <div className="w-full mx-auto conversation">
                    {conversation.map((message, index) => (
                        <div key={index} className={message.from === 'bot' ? 'bot-message-container' : 'user-message-container'}>
                            <span className="text-black m-2">{message.from === 'bot' ? 'ComicBot:..' : '...You'}
                            </span>
                            <p className={message.from === 'bot' ? 'bot-message' : 'user-message'}>
                                {message.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </main >
    );
};

export default ComicBot;
