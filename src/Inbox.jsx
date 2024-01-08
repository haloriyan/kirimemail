import axios from "axios";
import React, { useEffect, useState } from "react";
import base64 from "base-64";
import utf8 from "utf8";
import Header from "./Partials/Header";
import LeftMenu from "./Partials/LeftMenu";
import HeadNavigation from "./Partials/HeadNavigation";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Inbox = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingDetail, setLoadingDetail] = useState(null);
    const [messages, setMessages] = useState([]);
    const [maxResults, setMaxResults] = useState(10);
    const [enctype, setEnctype] = useState(null);

    useEffect(() => {
        if (enctype === null) {
            let enct = window.localStorage.getItem('encryption_type');
            setEnctype(enct)
        }
    }, [enctype]);

    useEffect(() => {
        if (token === null) {
            let tok = window.localStorage.getItem('google_access_token');
            setToken(tok);
        }
    }, [token]);

    useEffect(() => {
        if (token !== null && isLoading) {
            setLoading(false);
            console.log(token);
            axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': "application/json"
                }
            })
            .then(response => {
                let res = response.data;
                let msgs = res.messages;
                setMessages(msgs);
                setLoadingDetail(true);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    window.localStorage.removeItem('google_access_token');
                    navigate('/login')
                }
            })
        }
    }, [token, isLoading])

    const getFromPayloads = (key, payloads) => {
        let toReturn = null;
        payloads.map((load, l) => {
            if (load.name == key) {
                toReturn = load.value;
            }
        });
        return toReturn;
    }

    useEffect(() => {
        if (isLoadingDetail && token !== null && messages.length > 0) {
            let msgs = [...messages];
            
            msgs.map((msg, m) => {
                if (msg.subject === undefined) {
                    axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': "application/json"
                        }
                    })
                    .then(response => {
                        let res = response.data;
                        msgs[m]['subject'] = getFromPayloads("Subject", res.payload.headers);
                        msgs[m]['date'] = getFromPayloads("Date", res.payload.headers);
                        msgs[m]['snippet'] = res.snippet;
                        msgs[m]['parts'] = res.payload.parts;
                        setMessages(msgs);
                    })
                }
            })
        }
    }, [isLoadingDetail, token, messages]);
    
    return (
        <>
            {/* <HeadNavigation title={'Subjek yang sangat panjang sehingga dapat melebihi area konten'} /> */}
            <div className="content" style={{top: 90}}>
                {
                    (messages.length > 0 && messages[0].subject !== undefined) &&
                    <div>
                        {
                            messages.map((msg, m) => (
                                <a href={`/read/${msg.id}`} key={m} className="flex row item-center h-100 gap-20 border bottom text black pr-4">
                                    <div className="h-50 ratio-1-1 bg-green rounded-max flex centerize text size-20">
                                        R
                                    </div>
                                    <div className="flex column grow-1">
                                        <div className="text bold">{msg.subject}</div>
                                        <div className="text small">{msg.snippet}</div>
                                    </div>
                                    <div className="flex column w-20 item-end">
                                        <div>{moment(msg.date).format('DD MMM')}</div>
                                        <div className="text small mute">{moment(msg.date).format('HH:mm')}</div>
                                    </div>
                                </a>
                            ))
                        }
                        <div className="flex row centerize mt-4 mb-4">
                            <button className="gold" onClick={() => {
                                setMaxResults(maxResults + 10);
                                setLoading(true);
                            }}>Load More</button>
                        </div>
                    </div>
                }
                
            </div>
            <Header />
            <LeftMenu active={'inbox'} setEnctype={setEnctype} enctype={enctype} />
        </>
    )
}

export default Inbox