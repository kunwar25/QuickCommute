import React from "react";
import{Route,Routes} from 'react-router-dom';
import Home from './pages/home.jsx';
import UserLogin from './pages/userLogin.jsx';
import UserSignup from "./pages/userSignup.jsx";
import CaptainLogin from "./pages/captainLogin.jsx";
import CaptainSignUp from "./pages/captainSignUp.jsx";
const App = () => {
    return <div>
        <Routes>
            <Route path='/' element={<Home />} />               
            <Route path='/login' element={<UserLogin />} />               
            <Route path='/signup' element={<UserSignup />} />               
            <Route path='/captain-login' element={<CaptainLogin />} />               
            <Route path='captain-signup' element={<CaptainSignUp />} />               
        </Routes>

    </div>
    }

export default App;

