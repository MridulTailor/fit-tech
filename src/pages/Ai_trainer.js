import React, { useRef, useState, useEffect } from "react";

const Webcam = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Could not access webcam:", error);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <video ref={videoRef} controls style={{ width: "70%", height: "70%" }} />
  );
};

export default Webcam;
