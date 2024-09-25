import crypto from 'crypto';
import config from '../config.js'

const { secret_key, secret_iv, encryption_method } = config;

if (!secret_key || !secret_iv || !encryption_method) {
    throw new Error('secretKey, secretIV, and encryptionMethod are required')
}

// Generate secret hash with crypto to use for encryption
const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)

/**
 * Encrypts a string with the method provided by the config file,
 * then converts it to base64 so it can be stored with just 1 value
 * @param {string} data - The data to be encrypted
 * @returns {string} Returns the data encrypted in base64.
 */
export function encrypt(data) {
    const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
}

/**
 * Decrypts a base64 string with the method provided by the config file,
 * then converts it to utf-8
 * @param {string} encryptedData - The data to be decrypted, in base64
 * @returns {string} Returns the decrypted string in utf-8.
 */
export function decrypt(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    ) // Decrypts data and converts to utf8
}
