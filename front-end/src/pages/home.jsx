import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../css/home.css";
import "../css/index.css";
import logo from "../assets/logo.png";

// main function
function Home() {
  const [voiceInput, setVoiceInput] = useState("");
  const [isHeld, setIsHeld] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!isHeld && shouldFetch) {
      const fetchData = async () => {
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: `From most preferred to least preferred, my partner's love languages are: physical touch, gift giving, acts of service, quality time, and words of affirmation. ${transcript} Answer based on the given information.`,
            max_tokens: 500,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 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",
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
  );
}

export default Home;
