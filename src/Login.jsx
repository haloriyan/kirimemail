import React, { useEffect, useState } from "react";
import config from "./config";
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [key, setKey] = useState('');

    useEffect(() => {
        if (token === null) {
            let tok = window.localStorage.getItem('google_access_token');
            if (tok !== null) {
                // navigate('/inbox');
            }
        }
    }, [token, navigate]);

    const loggingIn = useGoogleLogin({
        flow: "implicit",
        scope: ["https://mail.google.com/"],
        onSuccess: response => {
            axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": "Bearer " + response.access_token,
                }
            })
            .then(res => {
                res = res.data;
                window.localStorage.setItem('google_access_token', response.access_token);
                window.localStorage.setItem('name', res.name);
                window.localStorage.setItem('email', res.email);
                window.localStorage.setItem('encryption_key', key);
                window.localStorage.setItem('encryption_type', 'AES');
                
                navigate('/inbox');
            })
        }
    })

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex column item-center justify-center">
                <form className="w-40" onSubmit={e => {
                    if (key !== "") {
                        loggingIn();
                    }
                    e.preventDefault();
                }}>
                    <div className="group">
                        <input type="text" id="key" onInput={e => setKey(e.currentTarget.value)} />
                        <label htmlFor="key">Kunci Enkripsi :</label>
                    </div>
                    <button className="gold w-100 mt-2" onClick={() => {
                        if (key !== "") {
                            loggingIn();
                        }
                    }}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;