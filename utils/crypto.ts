import { generateKey, key, encrypt, message, decrypt } from "openpgp";

export async function createKeyPair(name: string, email: string, passphrase: string) {
  //@ts-ignore
  return await generateKey({ userIds: [{ name, email }], rsaBits: 4096, passphrase });
}

export async function getPrivateKey(privateKeyArmored: string, passphrase: string) {
  const {
    keys: [privateKey],
  } = await key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);
  return privateKey;
}

export async function decryptMessage(
  privateKeyArmored: string,
  passphrase: string,
  encrypted: string
) {
  const privateKey = await getPrivateKey(privateKeyArmored, passphrase);
  const { data: decrypted } = await decrypt({
    message: await message.readArmored(encrypted),
    privateKeys: [privateKey],
  });
  return decrypted;
}

export async function encryptMessage(publicKeyArmored: string, msg: string) {
  const { data: encrypted } = await encrypt({
    message: message.fromText(msg),
    publicKeys: (await key.readArmored(publicKeyArmored)).keys,
  });
  return encrypted;
}

//(async () => {
//const { privateKeyArmored, publicKeyArmored } = await createKeyPair(
//"juan",
//"juan@gmail.com",
//"falopa"
//);
//const encryptedMessage = await encryptMessage(publicKeyArmored, "esto es un secreto");
//console.log(encryptedMessage);
//const decryptedMessage = await decryptMessage(privateKeyArmored, "falopa", encryptedMessage);
//console.log(decryptedMessage);
//})();
