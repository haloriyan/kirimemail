import React, { useEffect, useRef, useState } from "react";
import Header from "./Partials/Header";
import LeftMenu from "./Partials/LeftMenu";
import HeadNavigation from "./Partials/HeadNavigation";
import InputFile from "./components/InputFile";
import axios from "axios";
import moment from "moment";
import CryptoJS from "crypto-js";
import config from "./config";
import RC4 from "./components/RC4";

const Compose = () => {
    const [token, setToken] = useState(null);
    const [key, setKey] = useState(null);
    const [subject, setSubject] = useState('Halo riyan');
    const [body, setBody] = useState('hai riyan');
    const [to, setTo] = useState('');
    const [toName, setToName] = useState('Riyan Satria');
    const [toEmail, setToEmail] = useState('riyan.satria.619@gmail.com');
    const [reader, setReader] = useState(null);
    const [readyToSend, setReadyToSend] = useState(false);
    const [message, setMessage] = useState('');
    const [enctype, setEnctype] = useState(null);

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

        if (enctype === 'aes') {
            let enc = CryptoJS.AES.encrypt(body, key);
            setBody(btoa(enc.toString()));
        } else if (enctype === 'rc4') {
            let theBody = body;
            let rc4 = new RC4(key);
            let rc4Encrypted = rc4.encrypt(theBody);
            setBody(btoa(rc4Encrypted));
        } else {
            let plain = body;
            let rc4 = new RC4(key);
            let aesEnc = CryptoJS.AES.encrypt(body, key);
            let rc4Enc = btoa(rc4.encrypt(aesEnc.toString()));

            // setBody(CryptoJS.enc.Utf8.stringify(rc4Enc));
            setBody(rc4Enc);
            console.log(rc4Enc);

            // let rc4Dec = rc4.decrypt(rc4Enc);
            // let aesDec = CryptoJS.AES.decrypt(aesEnc.toString(), key).toString(CryptoJS.enc.Utf8);
            // console.log('Plain : ', plain);
            // console.log('Enc : ', rc4Enc);
            // console.log('Dec : ', aesDec);
        }
        setReadyToSend(true);
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
            <LeftMenu active={'compose'} enctype={enctype} setEnctype={setEnctype} />
            <HeadNavigation 
                middle={
                    <div className="border rounded pl-2 pr-2 flex row item-center grow-1 gap-10">
                        <div className="text small">Kirim ke :</div>
                        <input type="text" className="no-style flex grow-1" style={{height: 40}} onInput={e => setToName(e.currentTarget.value)} placeholder="Nama" value={toName} />
                        &lt;
                        <input type="text" className="no-style flex grow-1" style={{height: 40}} placeholder="email" onInput={e => setToEmail(e.currentTarget.value)} value={toEmail} />
                        &gt;
                    </div>
                }
                right={
                    <button className="gold" onClick={send}>Kirim</button>
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