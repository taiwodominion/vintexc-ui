import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import './css/App.css'

function App() {
  return (
    <Home />
    // <main className="main-content">
    //   <Routes>
    //     <Route path="/" element={<Home />}/>
    //     <Route path="/market" element={<Market />}/>
    //   </Routes>
    // </main>
  )
}

export default App
