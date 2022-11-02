import jwt from 'jsonwebtoken';

import generateJWT from '@helpers/generate-jwt';

describe('Generate JWT test', () => {
  it('should generate the token with a given payload', async () => {
    try {
      const payload = '1234567890';
      const JWT_KEY = process.env.JWT_KEY || '';

      const token = (await generateJWT(payload)) as string;
      const { uid } = jwt.verify(token, JWT_KEY) as Payload;

      expect(uid).toBe(payload);
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});

type Payload = {
  exp: number;
  iat: number;
  uid: string;
};
