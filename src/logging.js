import CryptoJS from "crypto-js";

class AES {
    constructor(props) {
        this.key = props;
    }
    encrypt(value) {
        let enc = CryptoJS.AES.encrypt(value, this.key);
        return btoa(enc.toString());
    }
    decrypt(value) {
        return CryptoJS.AES.decrypt(atob(value), this.key).toString(CryptoJS.enc.Utf8);
    }
}

export default AES