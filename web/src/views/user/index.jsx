import "./index.css";
import React from "react";
import { useEffect, useCallback, useState } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../utils/ws.js";
import { setUserInfoAction } from "../../store/user/action";
import { useDispatch } from "react-redux";

const App = () => {
  const [user, setUser] = useState([]);
  const { socket, connected } = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setUserInfo = useCallback(
    (info) => dispatch(setUserInfoAction(info)),
    [dispatch]
  );
  console.log("user");
  socket.on("started", (data) => {
    setUserInfo(data);
    navigate("/room");
  });

  const onStart = (user) => {
    socket.emit("start", user);
  };

  return (
    <div className="container user-container">
      <div className="user-panel">
        <div className="user-panel__msg-box">
          <div className="user-panel__msg-box__msg">
            {connected ? "已链接" : "未连接"}
          </div>
        </div>
        <div className="user-panel__footer">
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 88px)" }}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="请输入昵称"
            />
            <Button type="primary" onClick={() => onStart(user)}>
              进入聊天
            </Button>
          </Input.Group>
        </div>
      </div>
    </div>
  );
};

export default App;
