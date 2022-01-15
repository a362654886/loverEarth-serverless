import { sign, SignOptions, verify } from 'jsonwebtoken';

const saltSecret: string | Buffer = '1234567890';

const jwtSign = (payload: any): string => {
  const secretOrPrivateKey: string | Buffer | { key: string; passphrase: string } = saltSecret;
  // Eg: 60, "2 days", "10h", "7d" */
  const options: SignOptions = { expiresIn: '7d' };
  const result: string = sign(payload, secretOrPrivateKey, options);
  return result;
};

const jwtVerify = (token: string): any => {
  const secretOrPrivateKey: string | Buffer | { key: string; passphrase: string } = saltSecret;
  try {
    const result: any = verify(token, secretOrPrivateKey);
    return result;
  } catch (e) {
    //console.error('jwtVerify error:', e);
    return null;
  }
};

export { jwtSign, jwtVerify };