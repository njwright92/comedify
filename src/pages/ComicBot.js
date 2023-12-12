import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/navbar";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase.config";
import {
  addDoc,
  collection,
  query,
  where,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import Footer from "@/components/footer";
const ComicBot = () => {
  const [allConversations, setAllConversations] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [userUID, setUserUID] = useState(
    auth.currentUser ? auth.currentUser.uid : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const askComicbot = useCallback(async (prompt) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error making request:", error);
      alert("Error please try again");
    }
  }, []);

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
      const convoQuery = query(
        collection(db, "conversations"),
        where("uid", "==", userUID)
      );
      const querySnapshot = await getDocs(convoQuery);

      const fetchedConvos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        messages: doc.data().messages,
      }));

      setAllConversations(fetchedConvos);
    };

    if (userUID) {
      fetchConvos();
    }
  }, [userUID]);

  const saveConversation = useCallback(async () => {
    try {
      const userUID = auth.currentUser?.uid;
      if (userUID) {
        const convoCollection = collection(db, "conversations");
        const docRef = await addDoc(convoCollection, {
          uid: userUID,
          messages: conversation,
        });
        setAllConversations((prevConvos) => [
          {
            id: docRef.id,
            messages: conversation,
          },
          ...prevConvos,
        ]);
      }
      setConversation([]);
    } catch (error) {
      console.error("Error saving conversation: ", error);
    }
  }, [conversation]);

  const deleteConversation = async (docID) => {
    try {
      await deleteDoc(doc(db, "conversations", docID));

      setAllConversations(
        allConversations.filter((convo) => convo.id !== docID)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleInputChange = useCallback((e) => {
    setUserInput(e.target.value);
  }, []);

  const handleSend = useCallback(async () => {
    setIsLoading(true);
    setIsSaved(false);
    setConversation([...conversation, { from: "user", text: userInput }]);
    setUserInput("");

    try {
      const botResponses = await askComicbot(userInput);
      if (botResponses && botResponses.length > 0) {
        const botResponse = botResponses[0].generated_text;
        setConversation((prevConversation) => [
          ...prevConversation,
          { from: "bot", text: botResponse },
        ]);
      } else {
        console.error("Unexpected response format:", botResponses);
      }
    } catch (error) {
      console.error("Error in handleSend:", error);
      alert("Error please try again");
    } finally {
      setIsLoading(false);
    }
  }, [userInput, conversation, askComicbot]);

  return (
    <main
      className="flex flex-col"
      style={{
        fontFamily: "'Comic Sans MS', sans-serif",
        fontWeight: "bold",
        backgroundColor: "rgb(var(--background-rgb))",
        color: "rgb(var(--foreground-rgb))",
      }}
    >
      <Navbar />
      <h1 className="text-5xl glow m-10 mx-auto bg-black p-2.5">ComicBot!</h1>
      <div
        className="w-full mx-auto m-2 mt-5 bg-deep-red p-2 shadow-md rounded-md relative"
        style={{
          backgroundColor: `rgba(var(--deep-red), 0.2)`,
          boxShadow: "var(--neumorphism-shadow)",
        }}
      >
        <div className="input-area flex flex-col items-center">
          <textarea
            name="userInput"
            value={userInput}
            onChange={handleInputChange}
            className="p-2 border border-black rounded resize-y"
            placeholder="Write a funny take on everyday life, like 'Why is pizza round, but comes in a square box?'"
            rows="4"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-neon-blue hover:bg-bright-pastel text-white px-5 py-2 rounded mt-4 glow"
            style={{ backgroundColor: `rgba(var(--neon-blue), 0.8)` }}
          >
            Send
          </button>
        </div>
        <div className="w-full mx-auto conversation-container">
          {isLoading && (
            <div className="bot-message-container">
              <span className="text-white m-2">loading...</span>
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="1, 21"
                    d="M12 2v20M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2"
                  ></path>
                </svg>
              </div>
            </div>
          )}
          {conversation &&
            [...conversation].reverse().map((message, index) => (
              <div
                key={index}
                className={
                  message.from === "bot"
                    ? "bot-message-container"
                    : "user-message-container"
                }
              >
                <span>{message.from === "bot" ? "ComicBot:.." : "...You"}</span>
                <p
                  className={
                    message.from === "bot" ? "bot-message" : "user-message"
                  }
                >
                  {message.text}
                </p>
              </div>
            ))}
        </div>

        <button
          onClick={saveConversation}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded mt-4"
          disabled={isSaved}
        >
          {isSaved ? "Conversation Saved" : "Save Conversation"}
        </button>

        <div className="previous-conversations">
          <h2 className="text-2xl text-white text-center mb-4">
            Previous Conversations
          </h2>
          {[...allConversations].reverse().map((convo, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-300" : "bg-white"
              } conversation-container`}
            >
              {Array.isArray(convo.messages) &&
                convo.messages.map((message, i) => (
                  <div
                    key={i}
                    className={
                      message.from === "bot"
                        ? "bot-message-container"
                        : "user-message-container"
                    }
                  >
                    <span className="text-white m-2">
                      {message.from === "bot" ? "ComicBot:.." : "...You"}
                    </span>
                    <p
                      className={
                        message.from === "bot" ? "bot-message" : "user-message"
                      }
                    >
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
    </main>
  );
};

export default ComicBot;
