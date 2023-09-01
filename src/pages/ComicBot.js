import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import axios from 'axios';
import { db, auth } from '../firebase/firebase';
import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";


const ComicBot = () => {
    const [allConversations, setAllConversations] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const askComicbot = async (prompt) => {
        try {
            const res = await axios.post('http://localhost:3001/ask-comicbot/', { prompt });
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const userUID = auth.currentUser ? auth.currentUser.uid : null;
        console.log("User UID:", userUID); // Debugging line to ensure you have a UID

        if (userUID) {
            const q = query(collection(db, "conversations"), where("uid", "==", userUID));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedConversations = [];
                querySnapshot.forEach((doc) => {
                    fetchedConversations.push(doc.data().messages);
                });
                console.log("Fetched Conversations:", fetchedConversations);
                setAllConversations(prevConversations => [...prevConversations, ...fetchedConversations]);
            }, (error) => {
                console.error("Error retrieving conversations:", error);
            });

            return () => {
                unsubscribe();
            };
        }
    }, []);


    const saveConversation = async () => {
        const userUID = auth.currentUser ? auth.currentUser.uid : null;
        console.log("Saving conversation for UID:", userUID);
        if (userUID) {
            try {
                const convoCollection = collection(db, "conversations");
                await addDoc(convoCollection, {
                    uid: userUID,
                    messages: conversation,
                });
                console.log("Conversation saved");
                setAllConversations([...allConversations, conversation]);
                setConversation([]);
            } catch (error) {
                console.error("Error saving conversation: ", error);
            }
        }
    };


    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = async () => {
        setIsSaved(false);
        setConversation([...conversation, { from: 'user', text: userInput }]);
        setUserInput('');

        try {
            const botResponses = await askComicbot(userInput);


            const botResponse = botResponses.generated_text;


            setConversation(prevConversation => [...prevConversation, { from: 'bot', text: botResponse }]);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <main
            className="flex flex-col p-3"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">ComicBot!</h1>
            <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
                <div className="input-area flex flex-col items-center">
                    <textarea
                        value={userInput}
                        onChange={handleInputChange}
                        className="p-2 border border-black rounded text-black resize-y"
                        placeholder="ask me anything.."
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
                <button
                    onClick={saveConversation}
                    className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded mt-4 glow"
                    disabled={isSaved}
                >
                    {isSaved ? 'Conversation Saved' : 'Save Conversation'}
                </button>

                <div className="previous-conversations">
                    <h2 className="text-2xl text-black text-center mb-4">Previous Conversations</h2>
                    {allConversations.map((convo, index) => (
                        <div key={index} className={`${index % 2 === 0 ? "bg-gray-300" : "bg-white"} conversation-container`}>
                            {convo.map((message, i) => (
                                <div key={i} className={message.from === 'bot' ? 'bot-message-container' : 'user-message-container'}>
                                    <span className="text-black m-2">{message.from === 'bot' ? 'ComicBot:..' : '...You'}
                                    </span>
                                    <p className={message.from === 'bot' ? 'bot-message' : 'user-message'}>
                                        {message.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main >
    );
};


export default ComicBot;
