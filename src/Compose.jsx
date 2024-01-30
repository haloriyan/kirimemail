import React, { useEffect, useRef, useState } from "react";
import Header from "./Partials/Header";
import LeftMenu from "./Partials/LeftMenu";
import HeadNavigation from "./Partials/HeadNavigation";
import axios from "axios";
import moment from "moment";
import config from "./config";
import RC4 from "./components/RC4";
import AES from "./components/AES";

const Compose = () => {
    const [token, setToken] = useState(null);
    const [key, setKey] = useState(null);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [to, setTo] = useState('');
    const [toName, setToName] = useState('Sender');
    const [toEmail, setToEmail] = useState('');
    const [reader, setReader] = useState(null);
    const [readyToSend, setReadyToSend] = useState(false);
    const [message, setMessage] = useState('');
    const [enctype, setEnctype] = useState(null);
    const [sendButton, setSendButton] = useState('Kirim');
    const [elapsedTime, setElapsedTime] = useState(0);

    const [startTime, setStartTime] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
        if (enctype === null) {
            setEnctype(window.localStorage.getItem('encryption_type'));
        }
    }, [enctype])

    useEffect(() => {
        if (token === null) {
            setToken(window.localStorage.getItem('google_access_token'));
            setKey(window.localStorage.getItem('encryption_key'));
        }
    }, [token]);
    useEffect(() => {
        if (message !== "") {
            setTimeout(() => {
                setMessage('');
            }, 3500);
        }
    }, [message]);

    useEffect(() => {
        if (name === "") {
            setName(window.localStorage.getItem('name'));
        }
    }, [name]);
    useEffect(() => {
        if (email === "") {
            setEmail(window.localStorage.getItem('email'));
        }
    }, [email]);

    const send = () => {
        let key = window.localStorage.getItem('encryption_key');
        let rc4 = new RC4(key);
        setStartTime(new Date().getTime());
        setSendButton('Mengirim...');
        console.log(enctype);

        if (enctype.toLowerCase() === 'aes') {
            axios.get(`http://127.0.0.1:1234/AES.php?text=${body}&key=${key}&action=encrypt`)
            .then(response => {
                let res = response.data;
                setBody(res);
                setReadyToSend(true);
            })
            .catch(e => setSendButton('Kirim'));
            
        } else if (enctype.toLowerCase() === 'rc4') {
            let theBody = body;
            let rc4Encrypted = rc4.encrypt(theBody);
            setBody(btoa(rc4Encrypted));
            setReadyToSend(true);
        } else {
            let plain = body;
            
            axios.get(`http://127.0.0.1:1234/AES.php?text=${body}&key=${key}&action=encrypt`)
            .then(response => {
                let res = response.data;
                let rc4Enc = btoa(rc4.encrypt(res));
                setBody(rc4Enc);
                setReadyToSend(true);
            })
            .catch(e => setSendButton('Kirim'));
        }
        // setReadyToSend(true);
    }

    useEffect(() => {
        if (readyToSend && body !== '') {
            setReadyToSend(false);

            let theContent = [
                `From: ${name} <${email}>`,
                `To: ${toName} <${toEmail}>`,
                `Subject: ${subject}`,
                `Date: ${moment().toISOString()}`,
                ``,
                body
            ].join('\n');
            let requestPayload = {
                raw: btoa(theContent)
            };

            
            axios.post("https://www.googleapis.com/gmail/v1/users/me/messages/send", requestPayload, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                let res = response.data;
                let endTime = new Date().getTime();
                const elpTime = endTime - startTime;
                setElapsedTime(elpTime);
                setSendButton('Kirim');
            });
        }
    }, [readyToSend, body]);

    useEffect(() => {
        let to = setTimeout(() => {
            setElapsedTime(0);
        }, 5000);
        return () => clearTimeout(to);
    });

    return (
        <>
            <Header />
            <LeftMenu active={'compose'} enctype={enctype} setEnctype={setEnctype} />
            <HeadNavigation 
                middle={
                    <div className="border rounded pl-2 pr-2 flex row item-center grow-1 gap-10">
                        <div className="text small">Kirim ke :</div>
                        &lt;
                        <input type="text" className="no-style flex grow-1" style={{height: 40}} placeholder="email" onInput={e => setToEmail(e.currentTarget.value)} value={toEmail} />
                        &gt;
                    </div>
                }
                right={
                    <button className="gold" onClick={send}>{sendButton}</button>
                } 
            />
            {
                message !== "" &&
                <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-2">
                    {message}
                </div>
            }
            <div className="content flex column pr-4" style={{top: 160}}>
                <input type="text" className="no-style text bold size-32 flex grow-1" placeholder="Subject" onInput={e => setSubject(e.currentTarget.value)} value={subject} />
                <div className="h-20"></div>
                <textarea placeholder="Isi pesan" className="no-style" onInput={e => setBody(e.currentTarget.value)}></textarea>
                
                <div className="h-40"></div>
                {
                    elapsedTime > 0 &&
                    <div className="bg-green transparent rounded p-1 pl-2 pr-2">Pesan terkirim ke {toEmail} dalam waktu {elapsedTime / 1000} detik ({elapsedTime} milidetik)</div>
                }
            </div>
        </>
    )
}

export default Compose