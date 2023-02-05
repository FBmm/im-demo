import "./index.css";
import React from "react";
import { Button, Input } from "antd";

const App = () => {
  const onMatch = () => {
    socket.emit("message-match", );
  }
  return (
    <div className="container match-voice-container">
      <Button type="primary" onClick={() => onMatch}>找  人</Button>
    </div>
  );
};

export default App;
