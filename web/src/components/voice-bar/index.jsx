import "./index.css";
import React from "react";
import { useRef, useState } from "react";

const App = ({blob}) => {
  const videoRef = useRef(null)
  // var url = (window.URL || webkitURL).createObjectURL(blob);
  const play = () => {
    console.log(videoRef.current)
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }
  return (
    <div class="voice-bar" onClick={() => play()}>
      <audio width="100" ref={videoRef} src={blob}></audio>
    </div>
  );
};

export default App;
