import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Market from "./pages/Market"
import Support from "./pages/Support"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ForgotPassword from './pages/ForgotPassword'
import EnterOtp from "./pages/EnterOtp"
import ResetPassword from "./pages/ResetPassword"
import Assets from "./pages/Assets"
import Recharge from "./pages/Recharge"
import Exchange from "./pages/Exchange"
import FuturesHistory from './pages/FuturesHistory'
import AllTransactions from "./pages/AllTransactions"
import Futures from "./pages/Futures"
import AiTrading from "./pages/AiTrading"
import Withdrawal from "./pages/Withdrawal"
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
        <Route path="/enter-otp" element={<EnterOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/futures-history" element={<FuturesHistory />} />
        <Route path="/all-transactions" element={<AllTransactions />} />
        <Route path="/futures" element={<Futures />} />
        <Route path="/ai-trading" element={<AiTrading />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
      </Routes>
  )
}

export default App
