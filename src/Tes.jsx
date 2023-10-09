import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const Tes = () => {
    const [isLoading, setLoading] = useState(true);
    const [plain, setPlain] = useState('US0378331005-USD-US-en');
    const [key, setKey] = useState('11A1764225B11AA1');
    const [encrypted, setEncrypted] = useState('');
    const [decrypted, setDecrypted] = useState('');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let enc = CryptoJS.AES.encrypt(plain, key);
            setEncrypted(enc.toString())
            let dec = CryptoJS.AES.decrypt(enc.toString(), key);
            setDecrypted(dec.toString(CryptoJS.enc.Utf8))
        }
    }, [isLoading]);

    return (
        <>
          <div>Plain : {plain}</div>  
          <div>Enc : {encrypted}</div>
          <div>Dec : {decrypted}</div>
        </>
    )
}

export default Tes;