/* eslint-disable react/prop-types */
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = memo(function ProtectedRoute(props,{apiUrl}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                 await axios.get(`${apiUrl}/checkAuth`, { 
                    withCredentials: true 
                });
                setIsAuthenticated(true);
            } catch (err) {
                console.log(err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    // Show loading state while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return isAuthenticated ? props.children : <Navigate to="/" />;
});

export default ProtectedRoute;
