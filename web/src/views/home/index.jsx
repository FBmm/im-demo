import "./index.css";
import React from "react";
import { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../utils/ws.js";

const App = () => {
  const [users, setUsers] = useState([]);
  const { socket, connected } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("users");
    socket.on("user-list", (data = {}) => {
      setUsers(data.users);
    });
  }, []);

  const onTitleClick = () => {
    navigate("/room");
  };

  return (
    <div className="container home-container">
      <div className="panel home-panel">
        <div className="home-panel__msg-box">
          <div className="home-panel__msg-box__msg">
            {connected ? "已链接" : "未连接"}
          </div>
        </div>
        <List
          className="home-user-list"
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://randomuser.me/api/portraits/women/42.jpg" />
                }
                title={<span className="home-user-list__title" onClick={() => onTitleClick()}>{item}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default App;
