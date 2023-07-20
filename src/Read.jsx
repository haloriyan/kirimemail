import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Partials/Header";
import LeftMenu from "./Partials/LeftMenu";
import HeadNavigation from "./Partials/HeadNavigation";
import getFromPayloads from "./components/getFromPayload";
import moment from "moment";

const Read = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);

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
        if (isLoading && token !== null) {
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
                console.log(res);
                // console.log(res, getFromPayloads('from', res.payload.headers));
                
                setFrom(getFromPayloads('from', payloads));
                setDate(getFromPayloads('date', payloads));
                setSubject(getFromPayloads('subject', payloads));
                setParts(res.payload.parts);

                // let parsedParts = simpleParser(res).then(resp => {
                //     console.log(resp);
                // })
            })
        }
    }, [isLoading, token]);

    return (
        <>
            <Header />
            <HeadNavigation from={from.split("<")[0]} date={date} title={subject} />
            <LeftMenu active={'inbox'} />
            <div className="content" style={{top: 140}}>
                {
                    parts.length > 0 &&
                    <div dangerouslySetInnerHTML={{ __html:  atob(parts[1].body.data.replace(/-/g, '+').replace(/_/g, '/'))}}></div>
                }
            </div>
        </>
    )
}

export default Read;