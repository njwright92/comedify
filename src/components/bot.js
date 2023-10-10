import React, { useState } from 'react';
import axios from 'axios';

const Comicbot = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const askComicbot = async () => {
        try {
            const res = await axios.post('/ask-comicbot/', { prompt });
            setResponse(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
            <button onClick={askComicbot}>Ask Comicbot</button>
            <div>{response}</div>
        </div>
    );
};

export default Comicbot;
