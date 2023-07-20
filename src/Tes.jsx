import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import RC4 from "./components/RC4";
import axios from "axios";
import { AES } from "crypto-js";

const Tes = () => {
    const [plain, setPlain] = useState('halo');
    const [encrypted, setEncrypted] = useState('');
    const [dencrypted, setDencrypted] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let key = CryptoJS.enc.Utf8.parse("r2i9y0a8n");
            console.log(key);

            axios.get(`/AES.php?input=hello+world&key=${key}`)
            .then(response => {
                let res = response.data;
                console.log(res);
            })

            
            // let rc4 = new RC4(key);

            setEncrypted(enc);
            setDencrypted(dec);
            // let enc =
        }
    })

    return (
        <>
            <div>Plain : {plain}</div>
            <div>Enc : {encrypted}</div>
            <div>Dec : {dencrypted}</div>
        </>
    )
}

export default Tes;