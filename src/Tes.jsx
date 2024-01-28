import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import RC4 from "./components/RC4";

const Tes = () => {
    const [isLoading, setLoading] = useState(true);
    const [plain, setPlain] = useState('X+5mBDHlSwSJqqya7FiMRkm6FfAUR/W+xU4OSv6ZAD9Vgvif8LAhPU9FGD0=');
    const [key, setKey] = useState('11A1764225B11AA1');
    const [encrypted, setEncrypted] = useState('');
    const [decrypted, setDecrypted] = useState('');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let rc4 = new RC4("abc123");
            
            setDecrypted(rc4.decrypt("X+5mBDHlSwSJqqya7FiMRkm6FfAUR/W+xU4OSv6ZAD9Vgvif8LAhPU9FGD0="));
        }
    }, [isLoading]);

    return (
        <>
          <div>Plain : {decrypted}</div>
        </>
    )
}

export default Tes;