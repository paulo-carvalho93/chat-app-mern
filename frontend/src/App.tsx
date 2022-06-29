import "./App.css";
import { Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="chats" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
