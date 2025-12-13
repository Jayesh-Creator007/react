import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SendData from "./SendData";
import ShowData from "./ShowData";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/show" />} />
        <Route path="/send" element={<SendData />} />
        <Route path="/send/:id" element={<SendData />} />
        <Route path="/show" element={<ShowData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
