import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY || '';

const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, JWT_KEY, { expiresIn: '4h' }, (err, token) => {
      if (err) {
        reject('Unable to generate the token');
      } else {
        resolve(token);
      }
    });
  });
};

export default generateJWT;
