import JSEncrypt from 'encryptlong';

export { message } from 'antd';

export function getDateList(count = 12) {
  const d: Date = new Date();
  const yearTmp: number = d.getFullYear();
  const monthTmp: number = d.getMonth();
  const result = [];

  for (let i = 0; i < count; i++) {
    for (let ii = 12; ii > 0; ii--) {
      result.push(`${yearTmp - i}-${(ii + '').padStart(2, '0')}`);
    }
  }
  return result.slice(12 - monthTmp - 1);
}

export function getDate() {
  const d: Date = new Date();
  const yearTmp: number = d.getFullYear();
  const monthTmp: number = d.getMonth();
  return `${yearTmp}-${(monthTmp + '').padStart(2, '0')}`;
}

//使用后端公钥加密
export function encryption(obj: object) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(process.env.REACT_APP_SERVER_PUBLIC_KAY);
  const encrypted = encrypt.encryptLong(JSON.stringify(obj));
  return encrypted;
}

//使用前端私钥解密
export function decrypt(obj: string) {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(process.env.REACT_APP_FRONT_PRIVATE_KAY + '');
  const decrypted = decrypt.decryptLong(obj);
  return JSON.parse(unescape(decrypted.replace(/\\u/g, '%u')));
}
