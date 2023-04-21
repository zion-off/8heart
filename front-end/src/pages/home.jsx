import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import "../css/home.css";
import "../css/index.css";
import logo from "../assets/logo.png";
import { one, two, three, four, five } from "../assets/tier.js";

// main function
function Home() {
  const jwtToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [voiceInput, setVoiceInput] = useState("");
  const [isHeld, setIsHeld] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get("http://localhost:8000/protected/home/", {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        // do nothing
        console.log(res);
      })
      .catch((err) => {
        setIsLoggedIn(false); // update this state variable, so the component re-renders
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!isHeld && shouldFetch) {
      const fetchData = async () => {
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: `From most preferred to least preferred, my partner's love languages are: ${one}, ${two}, ${three}, ${four}, and ${five}. ${transcript} Answer based on the given information.`,
            max_tokens: 500,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
          }
        );
        const generatedText = response.data.choices[0].text.trim();
        const responseElement = document.querySelector(".response h3");
        responseElement.innerText = generatedText;
        resetTranscript();
        setShouldFetch(false);
      };

      fetchData();
    }
  }, [isHeld, shouldFetch, transcript, resetTranscript]);

  const handleHold = (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      setIsHeld(true);
      SpeechRecognition.startListening();
    }
  };

  const handleRelease = () => {
    setIsHeld(false);
    SpeechRecognition.stopListening();
    setVoiceInput(transcript);
    setShouldFetch(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="home-container">
          <div className={`eight-ball ${isHeld ? "held" : ""}`}>
            <img
              src={logo}
              alt=""
              onMouseDown={handleHold}
              onMouseUp={handleRelease}></img>
          </div>

          <div className="response">
            <h3></h3>
          </div>
        </div>
      ) : (
        <Navigate to="/login?error=protected" />
      )}
    </>
  );
}

export default Home;
