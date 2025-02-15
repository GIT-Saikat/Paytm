import  {BrowserRouter, Route, Routes}  from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard  from "./pages/Dashboard";
import Transactions from "./pages/Transaction";
import './index.css'



function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/transaction" element={<Transactions/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
