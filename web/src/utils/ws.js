import { io } from "socket.io-client";
import { useState, useEffect } from 'react';

let $socket
export function createSocket () {
  $socket = io("ws://localhost:3000", {
    reconnection: false, //关闭自动重连
    transports: ["websocket"],
  });
  return $socket;
};

export function useSocket() {
  console.log($socket)
  const [connected, setConnected] = useState(false)
  useEffect(() => {
    if ($socket?.connected) {
      setConnected(true)
    } else {
      $socket.on('connect', () => {
        setConnected(true)
      })
    }
  }, [])
  return {socket: $socket, connected}
}
