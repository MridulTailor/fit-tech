import React, { useEffect } from "react";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../VoiceInput.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const appId = process.env.REACT_APP_APPID;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const VoiceInput = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const history = useNavigate();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleClick = () => {
    if (!transcript) return;
    setTimeout(getData, 3000);
  };

  const getData = async () => {
    const options = {
      method: "POST",
      url: "https://api.cohere.ai/classify",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer 8WLghyOmBi6vJYHEENJMiuZUu8ndADQkRKAspaPs",
      },
      data: {
        inputs: [transcript],
        examples: [
          { text: "Homepage", label: "Homepage" },
          { text: "Take me to home page", label: "Homepage" },
          { text: "Show me everything at one place", label: "Homepage" },
          { text: "Show main page", label: "Homepage" },
          { text: "Predict my calories burnt", label: "Prediction" },
          { text: "Help me calculate calories burnt", label: "Prediction" },
          { text: "How much calories I burnt", label: "Prediction" },
          { text: "Show some supplements", label: "Products" },
          { text: "Healthy products", label: "Products" },
          { text: "What can I buy from here", label: "Products" },
          { text: "Take me to profile page", label: "Profile" },
          { text: "Show me profile page", label: "Profile" },
        ],
        truncate: "END",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.classifications[0].prediction);
        const pageToGo = response.data.classifications[0].prediction;
        if (pageToGo === "Homepage") {
          history("/");
        } else if (pageToGo === "Prediction") {
          history("/prediction");
        } else if (pageToGo === "Products") {
          history("/products");
        } else {
          // sleeppage
          history("/home");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="border-2 border-black w-full p-1 mx-auto bg-transparent">
      <p className=" text-black font-bold">Move around </p>
      <p className="w-50 h-24 border-2 border-gray-500 mx-auto my-2 p-1 mb-0.5 overflow-scroll overflow-hidden scrollbar-width-none text-black">
        {transcript}
      </p>
      <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
        onClick={handleClick}
        className=" bg-indigo-500 cursor-pointer text-white py-0.5 px-1 rounded-lg font-montserrat font-medium"
      >
        Hold to talk | {listening ? "ON" : "OFF"}
      </button>
    </div>
  );
};
export default VoiceInput;
