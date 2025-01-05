import React from "react";
import{Route,Routes} from 'react-router-dom';
import UserLogin from './pages/userLogin.jsx';
import UserSignup from "./pages/userSignup.jsx";
import CaptainLogin from "./pages/captainLogin.jsx";
import CaptainSignUp from "./pages/captainSignUp.jsx";
import Start from "./pages/start.jsx";
import Home from "./pages/home.jsx";
import UserProtectWrapper from "./pages/userProtectWrapper.jsx";
const App = () => {
    return <div>
        <Routes>
            <Route path='/' element={<Start />} />               
            <Route path='/login' element={<UserLogin />} />               
            <Route path='/signup' element={<UserSignup />} />               
            <Route path='/captain-login' element={<CaptainLogin />} />               
            <Route path='captain-signup' element={<CaptainSignUp />} />  
            <Route path='/home' element={
                <UserProtectWrapper>
                    <Home />
                </UserProtectWrapper>
            } />             
        </Routes>

    </div>
    }

export default App;

