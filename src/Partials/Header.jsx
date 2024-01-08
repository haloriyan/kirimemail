import React, { useEffect, useState } from "react";
import config from "../config";
import Initial from "../components/Initial";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [initial, setInitial] = useState('');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let nm = window.localStorage.getItem('name');
            setName(nm);
            setEmail(window.localStorage.getItem('email'));

            let names = nm.split(" ");
            let init = names[0][0];
            if (names.length > 1) {
                init = `${init}${names[1][0]}`;
            }
            setInitial(init);
        }
    }, [isLoading]);

    const loggingOut = () => {
        window.localStorage.removeItem('google_access_token');
        navigate('/login');
    }

    return (
        <div className="fixed top-0 left-0 right-0 h-70 flex row item-center pl-4 pr-4 bg-gold index-4 gap-20">
            <h1 className="m-0 text size-20 flex grow-1">{config.app_name}</h1>
            {
                name !== null &&
                <>
                    <div className="h-40 ratio-1-1 rounded-max flex centerize bg-white text bold">
                        {initial}
                    </div>
                    <div className="flex column">
                        <div className="text bold size-14">{name}</div>
                        <div className="text size-12">{email}</div>
                    </div>
                    <div className="text red bg-white pointer p-1 pl-2 pr-2 rounded small bold" onClick={loggingOut}>
                        Logout
                    </div>
                </>
            }
        </div>
    )
}

export default Header;