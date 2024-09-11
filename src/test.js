const { encrypt, decrypt } = require( './functions/encrypt.js' );

const message = 'it\'s dangerous to go alone';

const encrypted_message = encrypt(message);

console.log(decrypt({ iv:'7d56de7072d381f0edad8a2228d8dfc3', encryptedData: encrypted_message.encryptedData }));

console.log(encrypted_message);
