import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import "../css/home.css";
import "../css/index.css";
import logo from "../assets/logo.png";

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
    if (!isHeld && shouldFetch && transcript.trim()) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; nameCookie=`);
      let myName;
      if (parts.length === 2) {
        // console.log ('from frontend: ', parts.pop().split(";").shift());
        myName = parts.pop().split(";").shift();
      }
      console.log('from frontend again: ', myName);
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/home/",
            { transcript: transcript, nameCookie: myName },
            { withCredentials: true },
            {
              headers: {
                Authorization: `JWT ${jwtToken}`,
                "Content-Type": "application/json",
              }, // pass the token, if any, to the server
            }
          );
          const generatedText = await response.data;
          const responseElement = document.querySelector(".response h3");
          responseElement.innerText = generatedText;
          resetTranscript();
          setShouldFetch(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [isHeld, shouldFetch, resetTranscript, transcript]);

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
          <div className="box">
            <div className="response">
              <h3></h3>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login?error=protected" />
      )}
    </>
  );
}

export default Home;
