/**
 * AES加密解密组件
 * Created by panyz on 2018/6/28.
 */
import CryptoJS  from 'crypto-js';

let key = "panyz20180628Web";//AES密钥
let iv = "panyz20180628Web";//AES向量

const ADD = "/add/";

/**
 * AES加密
 * @return {string}
 */
export function Encrypt(data) {
    let encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Latin1.parse(key), {
        iv: CryptoJS.enc.Latin1.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    let result = encrypted.toString();
    result = result.replace("\r\n", "");
    result = result.replace("+", ADD);
    return result;
}

/**
 * AES解密
 * @return {string}
 */
export function Decrypt(data) {
    let data2 = data.replace(ADD, "+");
    let decrypted = CryptoJS.AES.decrypt(data2, CryptoJS.enc.Latin1.parse(key), {
        iv: CryptoJS.enc.Latin1.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}