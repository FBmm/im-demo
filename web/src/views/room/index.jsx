import "./index.css";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { useSocket } from "../../utils/ws.js";
import { createRecorder } from "../../utils/recorder";
import MsgBar from "../../components/msg-bar/index";
import VoiceBar from "../../components/voice-bar/index";
import {  useStateUserInfo } from '../../store/hooks/user'
let mediaRecorder;

let chunks = []

const App = () => {
  const [msgs, setMsgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const { socket, connected } = useSocket();
  const userInfo = useStateUserInfo();

  useEffect(() => {
    socket.on("trigger", (res) => {
      console.log(res);
      if (res.type === "user-list") {
        setUsers(res.data);
        console.log(2312);
      }
    });
    socket.emit("users");
    socket.emit("history");
    socket.on("message", (data) => {
      console.log(data.msgs);
      setMsgs(data.msgs);
    });
  }, []);

  const onSendMsg = (msg) => {
    socket.emit("send", {
      type: "text",
      msg,
    });
    setMsg("");
  };

  const [voiceStart, setVoiceStart] = useState("");

  const onSendVoiceStart = (e) => {
    console.log(e);
    setVoiceStart(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      (stream) => {
        console.log("授权成功！");
        createRecorder(stream);
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.onstart = () => {
          console.log("start", mediaRecorder.state);
        };
        mediaRecorder.onstop = () => {
          console.log("stop", mediaRecorder.state);
          // 数据块合成blob对象
          var blob = new Blob(chunks, { type: "audio/webm;codecs=opus" });
          console.log(blob);

          var audio = document.createElement("audio");
          var url = (window.URL || webkitURL).createObjectURL(blob);
          // audio.src = url;
          // audio.controls = true;
          // document.body.appendChild(audio);
          // console.log(audio, url);

          socket.emit("send", {
            type: "voice",
            blob: url,
          });
        };
        mediaRecorder.ondataavailable = (e) => {
          console.log("data");
          console.log(e);
          chunks = [e.data];
        };
      },
      () => {
        console.error("授权失败！");
      }
    );
  };

  const onSendVoiceEnd = (e) => {
    console.log(e);
    setVoiceStart(false);
    mediaRecorder?.stop?.();
  };

  return (
    <div className="container room-container">
      {/* <div className="user-list">
        {users.map((item) => (
          <div>{item}</div>
        ))}
      </div> */}
      <div className="room-panel">
        <div className="room-panel__msg-box">
          <div className="room-panel__msg-box__msg">
            <span>{connected ? "已链接" : "未连接"}</span>
            <span>  {userInfo && userInfo.name}</span>
          </div>
          {msgs.map((item) => (
            <div>
              {/* <div className="room-panel__msg-box__msg">{item}</div> */}
              {item.type === "text" ? (
                <MsgBar content={item.msg} isMe={true}></MsgBar>
              ) : (
                <VoiceBar blob={item.blob} isMe={true}></VoiceBar>
              )}
            </div>
          ))}
        </div>
        <div className="room-panel__footer">
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 180px)" }}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button type="primary" onClick={() => onSendMsg(msg)}>
              发送
            </Button>
            <Button
              type="info"
              onMouseDown={onSendVoiceStart}
              onMouseUp={onSendVoiceEnd}
            >
              {voiceStart ? "语音输入中" : "按下发送语音"}
            </Button>
          </Input.Group>
        </div>
      </div>
    </div>
  );
};

export default App;
