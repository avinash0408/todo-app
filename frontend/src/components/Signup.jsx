/* eslint-disable react/prop-types */
import { memo, useState, useCallback } from "react";

const Signup = memo(function Signup({ toggleLogin,handleSignup }) {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [conPassword,setConPassword] = useState('');

    function handleClick() {
        toggleLogin();
    }
    
    const onSubmit = useCallback((e) =>{
        e.preventDefault();
        if(conPassword!=password){
            alert("Password & Confirm Password must match");
            setPassword('');
            setConPassword('');
        }else{
            let signupData = {name,email,password};
            handleSignup(signupData);
            setName('');
            setEmail('');
            setPassword('');
            setConPassword('');
        }
        
    },[name,email,password,conPassword,handleSignup]);

    return (
        <>
            <form className="flip-out space-y-6 w-full" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="fullName" className='block mb-2 text-sm font-medium text-gray-900'>Full Name</label>
                    <input type="text" name="fullName" placeholder="Enter your name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' required 
                    value={name} onChange={e => {setName(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                    <input type="email" name="email" placeholder="something@gmail.com" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' required 
                    value={email} onChange={e => {setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                    <input type="password" name="password" placeholder="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' required minLength="6"
                    value={password} onChange={e => {setPassword(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='block mb-2 text-sm font-medium text-gray-900'>Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Re-Enter your password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' required minLength="6"
                    value={conPassword} onChange={e => {setConPassword(e.target.value)}}/>
                </div>
                <button type="submit" className='w-full text-white bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-slate-800'>Signup</button>
            </form>
            <a onClick={handleClick} className="flip-out block mt-6 text-sm text-gray-400 cursor-pointer hover:text-black text-center">Existing user? Login here !!</a>
        </>
    )
})

export default Signup