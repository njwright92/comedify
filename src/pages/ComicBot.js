import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { addDoc, collection, query, where, doc, deleteDoc, getDocs } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import Footer from '@/components/footer';


const ComicBot = () => {
    const router = useRouter();
    const [allConversations, setAllConversations] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [userUID, setUserUID] = useState(auth.currentUser ? auth.currentUser.uid : null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Loading');


    const askComicbot = async (prompt) => {
        try {
            const res = await axios.post('/api/proxy', { prompt });
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUID(user.uid);
            } else {
                setUserUID(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        const fetchConvos = async () => {
            const convoQuery = query(collection(db, "conversations"), where("uid", "==", userUID));
            const querySnapshot = await getDocs(convoQuery);

            const fetchedConvos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                messages: doc.data().messages
            }));


            setAllConversations(fetchedConvos);
        };

        if (userUID) {
            fetchConvos();
        }
    }, [userUID]);


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
        setConversation([]);
    };

    const deleteConversation = async (docID) => {
        try {
            await deleteDoc(doc(db, "conversations", docID));

            setAllConversations(allConversations.filter(convo => convo.id !== docID));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = async () => {
        setIsLoading(true);
        setIsSaved(false);
        setConversation([...conversation, { from: 'user', text: userInput }]);
        console.log('Sending this input to bot:', userInput);
        setUserInput('');

        const loadingInterval = setInterval(() => {
            setLoadingText(prev => prev + '.');
            if (loadingText.length > 'Loading...'.length) {
                setLoadingText('Loading');
            }
        }, 500);

        try {
            const botResponses = await askComicbot(userInput);
            console.log('Received this response from bot:', botResponses);

            const botResponse = botResponses.response;

            setConversation(prevConversation => [...prevConversation, { from: 'bot', text: botResponse }]);
        } catch (error) {
            console.error(error);
        } finally {
            clearInterval(loadingInterval);  // Stop loading animation
            setIsLoading(false);
        }
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                alert('Successfully signed out.');
                router.push('/');
            })
            .catch((error) => {
                alert(`An error occurred: ${error.message}`);
            });
    };

    return (
        <main
            className="flex flex-col p-3"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">ComicBot!</h1>
            <div className="w-full mx-auto m-2 mt-5 bg-white p-8 shadow-md rounded-md relative">
                <a onClick={handleSignOut}
                    className="glow px-2 py-1 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition duration-200 absolute top-4 right-4">
                    Sign Out
                </a>
                <div className="input-area flex flex-col items-center">
                    <textarea
                        value={userInput}
                        onChange={handleInputChange}
                        className="p-2 border border-black rounded text-black resize-y"
                        placeholder="ask me anything.."
                        rows="2"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded mt-4 glow"
                    >
                        Send
                    </button>
                    {isLoading && (
                        <div className="loading-indicator">
                            Loading...
                        </div>
                    )}
                </div>
                <div className="w-full mx-auto conversation">
                    {conversation.map((message, index) => (
                        <div key={index} className={message.from === 'bot' ? 'bot-message-container' : 'user-message-container'}>
                            <span className="text-black m-2">{message.from === 'bot' ? 'ComicBot:..' : '...You'}</span>
                            <p className={message.from === 'bot' ? 'bot-message' : 'user-message'}>
                                {message.text}
                            </p>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bot-message-container">
                            <span className="text-black m-2">ComicBot:..</span>
                            <p className="bot-message">{loadingText}</p>
                        </div>
                    )}
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
                            {convo.messages.map((message, i) => (
                                <div key={i} className={message.from === 'bot' ? 'bot-message-container' : 'user-message-container'}>
                                    <span className="text-black m-2">{message.from === 'bot' ? 'ComicBot:..' : '...You'}</span>
                                    <p className={message.from === 'bot' ? 'bot-message' : 'user-message'}>
                                        {message.text}
                                    </p>
                                </div>
                            ))}
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => deleteConversation(convo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main >
    );
};


export default ComicBot;