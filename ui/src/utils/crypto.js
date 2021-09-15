import crypto from 'crypto'

require('dotenv').config()

const publicKey = process.env.REACT_APP_RSA_PUBLIC_KEY

export default class Crypto {
	static encrypt(data) {
		const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data, 'utf8'));
		return encryptedData.toString('base64');
	}

	static decrypt(encryptedData) {
		try {
			const decryptedData = crypto.privateDecrypt(publicKey, Buffer.from(encryptedData, 'base64'));
			return decryptedData.toString('utf8');
		} catch (err) {
			throw new Error('Invalid encrypted hash');
		}
	}
}
