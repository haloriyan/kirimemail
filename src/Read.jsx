import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Partials/Header";
import LeftMenu from "./Partials/LeftMenu";
import HeadNavigation from "./Partials/HeadNavigation";
import getFromPayloads from "./components/getFromPayload";
import moment from "moment";
import RC4 from "./components/RC4";
import AES from "./logging";

const Read = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);
    const [key, setKey] = useState(null);
    const [enctype, setEnctype] = useState(null);

    const [subject, setSubject] = useState('');
    const [from, setFrom] = useState('');
    const [date, setDate] = useState(moment());
    const [parts, setParts] = useState([]);

    useEffect(() => {
        let tok = window.localStorage.getItem('google_access_token');
        if (tok === null) {
            navigate('/login');
        } else {
            setToken(tok);
        }
    }, []);

    useEffect(() => {
        if (key === null) {
            setKey(window.localStorage.getItem('encryption_key'));
        }
    }, [key]);
    useEffect(() => {
        if (enctype === null) {
            setEnctype(window.localStorage.getItem('encryption_type'));
        }
    }, [enctype]);

    useEffect(() => {
        if (isLoading && token !== null && key !== null && enctype !== null) {
            setLoading(false);

            axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': "application/json"
                }
            })
            .then(response => {
                let res = response.data;
                let payloads = res.payload.headers;
                
                setFrom(getFromPayloads('from', payloads));
                setDate(getFromPayloads('date', payloads));
                setSubject(getFromPayloads('subject', payloads));

                let rc4 = new RC4(key);
                if (enctype.toLowerCase() === 'aes') {
                    console.log(res.snippet);
                    axios.get(`http://127.0.0.1:1234/AES.php?text=${res.snippet}&key=${key}&action=decrypt`)
                    .then(response => {
                        let res = response.data;
                        console.log(res);
                        setParts(res);
                    })
                } else if (enctype.toLowerCase() === 'rc4') {
                    console.log(res.snippet, atob(res.snippet));
                    let rc4Dec = rc4.decrypt(atob(res.snippet));
                    setParts(rc4Dec);
                } else {
                    let rc4Dec = rc4.decrypt(atob(res.snippet));
                    axios.get(`http://127.0.0.1:1234/AES.php?text=${rc4Dec}&key=${key}&action=decrypt`)
                    .then(response => {
                        let res = response.data;
                        console.log(res);
                        setParts(res);
                    });
                }
            })
        }
    }, [isLoading, token]);

    return (
        <>
            <Header />
            <HeadNavigation from={from.split("<")[0]} date={date} title={subject} />
            <LeftMenu active={'inbox'} enctype={enctype} setEnctype={setEnctype} />
            <div className="content" style={{top: 140}}>
                {parts}
            </div>
        </>
    )
}

export default Read;