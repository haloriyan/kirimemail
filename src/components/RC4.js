class RC4 {
  static ENCRYPT_MODE_NORMAL = 0x01;
  static ENCRYPT_MODE_UPDATE = 0x02;

  constructor(password, encryptMode = 0x01) {
    this.password = password;
    const validMode = [
      RC4.ENCRYPT_MODE_NORMAL,
      RC4.ENCRYPT_MODE_UPDATE
    ];
    if (!validMode.includes(encryptMode)) {
      throw new Error("Invalid encrypt mode.");
    }
    this.encryptMode = encryptMode;
    this.sBox = [];
    this.si = 0;
    this.sj = 0;
    this.initCipher();
  }

  initCipher() {
    const passwordLength = this.password.length;
    const key = [];
    for (let i = 0; i < 256; i++) {
      key[i] = this.password.charCodeAt(i % passwordLength);
      this.sBox[i] = i;
    }
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + this.sBox[i] + key[i]) % 256;
      [this.sBox[i], this.sBox[j]] = [this.sBox[j], this.sBox[i]];
    }
    this.si = this.sj = 0;
  }

  encrypt(plaintext) {
    const plaintextLength = plaintext.length;
    let ciphertext = "";
    for (let n = 0; n < plaintextLength; n++) {
      this.si = (this.si + 1) % 256;
      this.sj = (this.sj + this.sBox[this.si]) % 256;
      [this.sBox[this.si], this.sBox[this.sj]] = [this.sBox[this.sj], this.sBox[this.si]];
      const k = this.sBox[(this.sBox[this.si] + this.sBox[this.sj]) % 256];
      ciphertext += String.fromCharCode(plaintext.charCodeAt(n) ^ k);
    }
    if (this.encryptMode & RC4.ENCRYPT_MODE_NORMAL) {
      this.resetCipher();
    }
    return ciphertext;
  }

  resetCipher() {
    this.initCipher();
  }

  decrypt(plaintext) {
    return this.encrypt(plaintext);
  }
}

export default RC4;