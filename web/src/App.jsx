import './App.css'
import Room from './views/room/index'
import User from './views/user/index'
import Home from './views/home/index'
import MatchVoice from './views/match/message'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/user" element={<User />} />
        <Route path="/match/voice" element={<MatchVoice />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
