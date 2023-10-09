import AES from "./AES.js";

const plain = "haloriyan";
let encrypted = "";
let decrypted = "";

let aes = new AES("Inikatasandi2908");
encrypted = aes.encrypt(plain);
decrypted = aes.decrypt(encrypted);

console.log(plain, encrypted, decrypted);
