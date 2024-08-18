import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Game } from "./Pages/Game";
import { Landing } from "./Pages/Landing";

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}/> 
      <Route path="/game" element={<Game />}/> 
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
