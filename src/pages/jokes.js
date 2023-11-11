import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  query,
  where,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import "font-awesome/css/font-awesome.min.css";
import Footer from "@/components/footer";

const Jokes = () => {
  const router = useRouter();
  const [jokes, setJokes] = useState([]);
  const [newJoke, setNewJoke] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [userUID, setUserUID] = useState(
    auth.currentUser ? auth.currentUser.uid : null
  );

  const handleInputChange = (e) => setNewJoke(e.target.value);

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
    const fetchJokes = async () => {
      const jokeQuery = query(
        collection(db, "jokes"),
        where("uid", "==", userUID)
      );
      const unsubscribe = onSnapshot(jokeQuery, (querySnapshot) => {
        const fetchedJokes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          joke: doc.data().joke,
        }));
        setJokes(fetchedJokes);
      });
      return () => unsubscribe();
    };
    if (userUID) {
      fetchJokes();
    }
    return () => {};
  }, [userUID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userUID) return;
    try {
      const jokeCollection = collection(db, "jokes");
      const docRef = await addDoc(jokeCollection, {
        joke: newJoke,
        uid: userUID,
      });
      const newDocId = docRef.id;
      console.log("Document written with ID: ", docRef.id);
      setJokes([{ id: newDocId, joke: newJoke }, ...jokes]);
      setNewJoke("");
    } catch (error) {
      console.error("Error adding joke: ", error);
    }
  };

  const handleCancelEdit = () => setEditingIndex(null);

  const handleEditClick = (index) => setEditingIndex(index);

  const handleEditChange = (e, index) => {
    setJokes((jokes) => {
      const newJokes = [...jokes];
      newJokes[index].joke = e.target.value;
      return newJokes;
    });
  };
  const handleEditSubmit = async (index) => {
    const editedJoke = jokes[index];
    try {
      const jokeDoc = doc(db, "jokes", editedJoke.id);
      await updateDoc(jokeDoc, {
        joke: editedJoke.joke,
        uid: userUID,
      });
      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating joke: ", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const jokeDoc = doc(db, "jokes", jokes[index].id);
      await deleteDoc(jokeDoc);
      setJokes(jokes.filter((joke, i) => i !== index));
    } catch (error) {
      console.error("Error deleting joke: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Successfully signed out.");
      router.push("/");
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <main
      className="flex flex-col p-3"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      <Navbar />
      <h1 className="text-4xl text-white text-center mb-10 glow">JokePad!</h1>
      <div className="w-full mx-auto shadow-md rounded-md text-white relative">
        <button
          onClick={handleSignOut}
          className="glow px-2 py-1 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition duration-200 absolute top-4 right-4"
        >
          Sign Out
        </button>
        <form onSubmit={handleSubmit}>
          <div className="input-area mt-5 flex flex-col items-center">
            <label htmlFor="joke" className="block text-sm font-semibold mb-2">
              Write Your Joke/Bit:
            </label>
            <textarea
              type="text"
              value={newJoke}
              onChange={handleInputChange}
              placeholder="Write your bit.."
              className=" rounded text-black"
              rows="4"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded glow"
            >
              Add Joke
            </button>
          </div>
        </form>
        <div className="jokes-list mt-8 p-3 mx-auto">
          {jokes.map((joke, index) => (
            <div
              key={index}
              className="joke-item w-full input-area mb-4 bg-white text-black p-4 rounded shadow flex justify-between items-center"
            >
              {editingIndex === index ? (
                <>
                  <textarea
                    type="text"
                    value={joke.joke}
                    onChange={(e) => handleEditChange(e, index)}
                    rows="4"
                  />
                  <div className="button-container flex space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
                      onClick={() => handleEditSubmit(index)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg flex-grow">{joke.joke}</p>
                  <i
                    className="fa fa-lg fa-pencil text-gray-500 hover:text-gray-800 cursor-pointer"
                    aria-hidden="true"
                    onClick={() => handleEditClick(index)}
                  ></i>
                  <i
                    className="fa fa-lg fa-trash text-gray-500 hover:text-gray-800 cursor-pointer ml-3"
                    aria-hidden="true"
                    onClick={() => handleDelete(index, joke)}
                  ></i>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Jokes;
