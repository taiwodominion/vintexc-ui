import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Market from "./pages/Market"
import Support from "./pages/Support"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ForgotPassword from './pages/ForgotPassword'
import './css/App.css'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/market" element={<Market />}/>
        <Route path="/support" element={<Support />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
      </Routes>
  )
}

export default App
