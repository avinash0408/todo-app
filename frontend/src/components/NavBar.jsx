/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NavBar({apiUrl}) {
    library.add(faSignOut);
    const navigate = useNavigate();
    const onLogout = async() => {
        await axios.get(`${apiUrl}/signout`,{
            withCredentials: true
        });
        navigate('/');
    }
    return (
        <div className='h-1/20 flex p-2 text-white bg-slate-600 font-medium justify-between items-center'>
            <p>Vi-todo</p>
            <FontAwesomeIcon icon="fa fa-sign-out" onClick={onLogout} className="transition-transform duration-300 transform hover:scale-125 text-white" />
        </div>
    )
}


export default NavBar