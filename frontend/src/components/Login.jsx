/* eslint-disable react/prop-types */

import { memo, useCallback, useState } from "react";

const Login = memo(function Login({ toggleLogin,handleLogin }) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function handleClick() {
        toggleLogin();
    }
    const onSubmit = useCallback((e) =>{
        e.preventDefault();
        let loginData = {email,password};
        setEmail('');
        setPassword('');
        handleLogin(loginData);
    },[email,password,handleLogin]);

    return (
        <>
            <form className="space-y-6 w-full" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                    <input type="email" name="email" value={email} placeholder="something@gmail.com" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' required 
                    onChange={e => {setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                    <input type="password" name="password" value={password} placeholder="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' required 
                    onChange={e => {setPassword(e.target.value)}} minLength="6"/>
                </div>
                <button type="submit" className='w-full text-white bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-slate-800'>Login</button>
            </form>
            <a onClick={handleClick} className="block mt-8 text-sm text-gray-400 cursor-pointer hover:text-black text-center">First time here? Register !!</a>
        </>
    )
})

export default Login