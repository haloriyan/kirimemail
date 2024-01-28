import axios from "axios"

const AES = (text, key) => {
    axios.get(`http://127.0.0.1:1234/AES.php?text=${text}&key=${key}`)
    .then(response => {
        let res = response.data;
        return res;
    })
}

export default AES;