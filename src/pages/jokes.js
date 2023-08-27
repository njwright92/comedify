import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { doc, query, where, getDocs, updateDoc, collection, addDoc } from "firebase/firestore";
import Navbar from './components/navbar';
import 'font-awesome/css/font-awesome.min.css';


const Jokes = () => {
    const [jokes, setJokes] = useState([]);
    const [newJoke, setNewJoke] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const userUID = auth.currentUser ? auth.currentUser.uid : null;

    const handleInputChange = (e) => {
        setNewJoke(e.target.value);
    };

    useEffect(() => {
        const fetchJokes = async () => {
            const jokeQuery = query(collection(db, "jokes"), where("uid", "==", userUID));
            const querySnapshot = await getDocs(jokeQuery);
            const fetchedJokes = [];
            querySnapshot.forEach((doc) => {
                fetchedJokes.push(doc.data().joke);
            });
            setJokes(fetchedJokes);
        };

        if (userUID) {
            fetchJokes();
        }
    }, [userUID]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userUID) {
            try {
                const jokeCollection = collection(db, "jokes");
                const docRef = await addDoc(jokeCollection, {
                    joke: newJoke,
                    uid: userUID
                });
                console.log("Document written with ID: ", docRef.id);
                setJokes([newJoke, ...jokes]);
                setNewJoke('');
            } catch (error) {
                console.error("Error adding joke: ", error);
            }
        }
    };


    const handleEditClick = (index) => {
        setEditingIndex(index);
    };

    const handleEditChange = (e, index) => {
        const newJokes = [...jokes];
        newJokes[index] = e.target.value;
        setJokes(newJokes);
    };

    const handleEditSubmit = async (index) => {
        const editedJoke = jokes[index];
        try {
            const jokeDoc = doc(db, "jokes", userUID);
            await updateDoc(jokeDoc, {
                joke: editedJoke,
                uid: userUID
            });
            console.log("Document updated with userUID: ", userUID);
            setEditingIndex(null);
        } catch (error) {
            console.error("Error updating joke: ", error);
        }
    };

    return (
        <main
            className="flex flex-col"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">JokePad!</h1>
            <div className="w-full mx-auto shadow-md rounded-md text-white">
                <form onSubmit={handleSubmit}>
                    <div className="input-area flex flex-col items-center">
                        <label
                            htmlFor="joke"
                            className="block text-sm font-semibold mb-2">Write Your Joke/Bit:
                        </label>
                        <textarea
                            value={newJoke}
                            onChange={handleInputChange}
                            placeholder="Write your bit.."
                            className=" rounded text-black"
                            rows='4'
                            required />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded glow">Add Joke
                        </button>
                    </div>
                </form>
                <div className="jokes-list mt-8 p-3 mx-auto">
                    {jokes.map((joke, index) => (
                        <div
                            key={index}
                            className="joke-item mb-4 bg-white text-black p-4 rounded shadow flex justify-between items-center"
                        >
                            {editingIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={joke}
                                        onChange={(e) => handleEditChange(e, index)}
                                    />
                                    <button onClick={() => handleEditSubmit(index)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg flex-grow">{joke}</p>
                                    <i className="fa fa-lg mr-3 fa-pencil text-gray-500 hover:text-gray-800 cursor-pointer" aria-hidden="true" onClick={() => handleEditClick(index)}></i>
                                </>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
};

export default Jokes;