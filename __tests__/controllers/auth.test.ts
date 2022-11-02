import { post } from '@helpers/petitions-test';
import { HTTP_STATUS_CODES } from '@constants/http-status-codes';

describe('Login Auth Controller', () => {
  let userData;

  beforeEach(() => {
    userData = {};
  });

  it('Should return an ok response with correct email and password', async () => {
    userData = {
      email: 'test1@test.com',
      password: '12345678'
    };

    const res = await post('/api/auth/login', userData);

    expect(res.status).toBe(HTTP_STATUS_CODES.OK);
    expect(res.body.response).toBe('ok');
  });

  it('Should return a fail response with incorrect email and password', async () => {
    userData = {
      email: 'test1test.com',
      password: '1234567'
    };

    const res = await post('/api/auth/login', userData);

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(res.body.response).toBe('fail');
  });

  it('Should return a fail response with incorrect email and password', async () => {
    userData = {
      email: 'test1test@asdasdasds.com',
      password: '123456789'
    };

    const res = await post('/api/auth/login', userData);

    expect(res.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    expect(res.body.errors).toStrictEqual(["The user doesn't exist"]);
  });

  it('Should return a fail response with a user deleted', async () => {
    userData = {
      email: 'testdeleted@test.com',
      password: '123456789'
    };

    const res = await post('/api/auth/login', userData);

    expect(res.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED);
    expect(res.body.errors).toStrictEqual([
      'The user is deleted. If you want to recover it, contact with support'
    ]);
  });

  it('Should return a fail response with an incorrect password', async () => {
    userData = {
      email: 'test@test.com',
      password: '123456789ssss'
    };

    const res = await post('/api/auth/login', userData);

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(res.body.errors).toStrictEqual([
      'The email or password are incorrect'
    ]);
  });
});

// describe('Register Auth Controller', () => {
//   let userData;

//   beforeEach(() => {
//     userData = {};
//   });

//   it('Should return a ok response with correct data', async () => {
//     userData = {
//       email: 'test1@test.com',
//       password: '12345678'
//     };

//     const res = await post('/api/auth/login', userData);

//     expect(res.status).toBe(HTTP_STATUS_CODES.OK);
//     expect(res.body.response).toBe('ok');
//   });
// })
