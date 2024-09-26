import { useState } from "react";
import axios from "axios";
import Login from "../components/Login";
import Signup from "../components/Signup";


/* eslint-disable react/prop-types */
function AuthPage({ handleAuthentication, apiUrl }) {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const onToggleLogin = () => {
        setIsLoginForm(!isLoginForm);
    }
    const doLogin = async (loginData) => {
        let authFlag = false;
        try {
            await axios.post(`${apiUrl}/signin`, loginData,{
                withCredentials: true
            });
            authFlag = true;
        }catch (err) {
            authFlag = false;
            alert(err.response.data.message);
        }
        handleAuthentication(authFlag);
    }
    const doSignup = async (signupData) => {
        try {
            await axios.post(`${apiUrl}/signup`, signupData,{
               headers :{
                   authorization: "your token comes here",
               }
           })
           let {email,password} = signupData; 
           doLogin({email,password});
       }catch (err) {
           alert(err.response.data.message);
           handleAuthentication(false);
       }
       
    }

    return (
        <div className="container flex flex-col items-center justify-center h-screen bg-gray-100 min-w-full">
            <div className={`relative w-80 perspective ${isLoginForm ? 'h-80' : 'h-[32rem]'}`}>
                <div className={`p-4 sm:p-6 absolute w-full h-full bg-white border-gray-200 rounded-lg shadow transition-transform duration-500 ${isLoginForm ? 'flip-in' : 'flip-out'}`}>
                    {isLoginForm ? <Login toggleLogin={onToggleLogin} handleLogin={doLogin} loginForm={isLoginForm} />
                        : <Signup toggleLogin={onToggleLogin} handleSignup={doSignup} loginForm={isLoginForm} />}
                </div>
            </div>
        </div>
    )
}

export default AuthPage
