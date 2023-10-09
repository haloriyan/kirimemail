import React, { useEffect, useState } from "react";
import RC4 from "./components/RC4";

import CryptoJS from "crypto-js";

export default function RC4Test() {
    const [isLoading, setLoading] = useState(true);
    const [plain, setPlain] = useState('Mahasiswa ITATS');
    const key = "testpassword";
    const [encrypted, setEncrypted] = useState('');
    const [decrypted, setDecrypted] = useState('');
    const rc4 = new RC4(key);

    const encrypt = data => {
        const dataArray = CryptoJS.enc.Utf8.parse(data);
        const keyArray = CryptoJS.enc.Utf8.parse(key);

        // AES Encryption
        const enc = CryptoJS.AES.encrypt(dataArray, keyArray, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding
        });

        return enc.toString();
    }
    const decrypt = data => {
        const keyArray = CryptoJS.enc.Utf8.parse(key);
        const dataDecoding = CryptoJS.enc.Base64.parse(data);
        const dec = CryptoJS.AES.decrypt({ciphertext: dataDecoding}, keyArray, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding
        });

        return dec.toString(CryptoJS.enc.Utf8);
    }
    const process = () => {
        // RC4 Only
        // let enc = rc4.encrypt(plain);
        // let dec = rc4.decrypt(enc);

        // AES Only
        // let enc = encrypt(plain);
        // let dec = decrypt(enc);

        // AES -> RC4 -> RC4 -> AES
        let enc = encrypt(plain);
        enc = rc4.encrypt(enc);
        let dec = rc4.decrypt(enc);
        dec = decrypt(dec);

        console.log(dec);
        
        setEncrypted(enc);
        setDecrypted(dec);
    }

    return (
        <>
            <div>
                <input type="text" value={plain} onInput={e => setPlain(e.currentTarget.value)} />
                <button onClick={process}>Go</button>
            </div>
            <div>Plain : {plain}</div>
            <div>Enc : {encrypted}</div>
            <div>Dec : {decrypted}</div>
        </>
    )
}