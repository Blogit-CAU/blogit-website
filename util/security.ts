import crypto from 'crypto';

export namespace AES {
  const key = Buffer.from(process.env.COOKIE_SECURITY_KEY!, 'utf8');
  const iv = Buffer.from(process.env.COOKIE_SECURITY_IV!, 'utf8');

  export function encrypt(text: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  export function decrypt(encryptedText: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
