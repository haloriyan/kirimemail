import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Middleware = ({children}) => {
    const [token, setToken] = useState(null);
    const [authenticated, authenticating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) {
            authenticating(true);
            let tok = window.localStorage.getItem('google_access_token');
            if (tok === null) {
                navigate('/login');
            }
            setToken(tok);
        }
    }, [authenticated])
    
    return (
        <>
            {
                token !== null && children
            }
        </>
    )
}

export default Middleware