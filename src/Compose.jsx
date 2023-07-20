import React, { useEffect, useRef, useState } from "react";
import Header from "./Partials/Header";
import LeftMenu from "./Partials/LeftMenu";
import HeadNavigation from "./Partials/HeadNavigation";
import InputFile from "./components/InputFile";
import axios from "axios";
import moment from "moment";

const Compose = () => {
    const [token, setToken] = useState(null);
    const [key, setKey] = useState(null);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [to, setTo] = useState('');
    const [toName, setToName] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [reader, setReader] = useState(null);
    const [readyToSend, setReadyToSend] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
        if (token === null) {
            setToken(window.localStorage.getItem('google_access_token'));
            setKey(window.localStorage.getItem('encryption_key'));
        }
    }, [token]);
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
        axios.get(`/AES.php?input=${body}&key=${key}`)
        .then(response => {
            let res = response.data;
            console.log(res);
            // setReadyToSend(true);
        })
    }

    useEffect(() => {
        if (readyToSend) {
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
                console.log(res);
            });
        }
    }, [readyToSend]);

    return (
        <>
            <Header />
            <LeftMenu active={'compose'} />
            <HeadNavigation 
                middle={
                    <div className="border rounded pl-2 pr-2 flex row item-center grow-1 gap-10">
                        <div className="text small">Kirim ke :</div>
                        <input type="text" className="no-style flex grow-1" style={{height: 40}} onInput={e => setToName(e.currentTarget.value)} placeholder="Nama" />
                        &lt;
                        <input type="text" className="no-style flex grow-1" style={{height: 40}} placeholder="email" onInput={e => setToEmail(e.currentTarget.value)} />
                        &gt;
                    </div>
                }
                right={
                    <button className="gold" onClick={send}>Kirim</button>
                } 
            />
            <div className="content flex column pr-4" style={{top: 160}}>
                <input type="text" className="no-style text bold size-32 flex grow-1" placeholder="Subject" onInput={e => setSubject(e.currentTarget.value)} />
                <div className="h-20"></div>
                <textarea placeholder="Isi pesan" className="no-style" onInput={e => setBody(e.currentTarget.value)}></textarea>
                
                {/* <div className="h-40"></div>
                <div className="border rounded bg-grey flex row centerize gap-20 p-4 h-300 relative" id="previewArea">
                    Drop berkas di sini atau
                    <div className="bg-gold p-1 pl-2 pr-2 rounded">
                        Pilih Berkas
                    </div>
                    <input type="file" ref={inputRef} onChange={e => {
                        InputFile(e, "#previewArea");
                    }} />
                </div> */}
            </div>
        </>
    )
}

export default Compose