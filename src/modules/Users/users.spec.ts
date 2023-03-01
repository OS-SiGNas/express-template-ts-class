import req from 'supertest';
import app from '../../index';
import { config } from '../../Server/config';

const headers = { Authorization: '' };
let userId = '';

describe('Tesing Users enpoints', () => {
  describe('POST /auth', () => {
    test('username is required', async () => {
      const res = await req(app).post('/auth').send({ password: '' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.errorMsg[0].errorType).toEqual('invalid_type');
    });

    test('password is required', async () => {
      const res = await req(app).post('/auth').send({ username: 'anyuser' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.errorMsg[0].errorType).toEqual('invalid_type');
    });

    test('username can`t be empty', async () => {
      const res = await req(app).post('/auth').send({ username: '', password: '' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.errorMsg[0].errorType).toEqual('too_small');
      expect(res.body.error.errorMsg[0].message).toEqual('username can`t be empty');
      expect(res.body.error.errorMsg[1].errorType).toEqual('too_small');
    });

    test('too small password, need at least 10 characters', async () => {
      const res = await req(app).post('/auth').send({ username: 'anyuser', password: '123456789' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.errorMsg[0].errorType).toEqual('too_small');
    });

    test('incorrect username or password', async () => {
      const res = await req(app).post('/auth').send({ username: 'anyuser', password: '1234567890' });
      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
      expect(res.body.error).toEqual('Username or password is incorrect');
    });

    test('Login works', async () => {
      const res = await req(app).post('/auth').send(config.testUserData);
      expect(res.status).toBe(200);
      expect(res.body.data.token).toBeDefined();

      // wink wink
      headers.Authorization = `Bearer ${String(res?.body?.data?.token)}`;
    });
  });

  describe('Authorization Headers empty in /users', () => {
    test('GET, POST, PUT and DELETE Need Authorization headers', async () => {
      const resGet = await req(app).get('/users');
      expect(resGet.status).toBe(400);
      expect(resGet.body.error).toEqual('Missing authorization headers');

      const resPost = await req(app).post('/users');
      expect(resPost.status).toBe(400);
      expect(resPost.body.error).toEqual('Missing authorization headers');

      const resPut = await req(app).put('/users');
      expect(resPut.status).toBe(400);
      expect(resPut.body.error).toEqual('Missing authorization headers');

      const resDelete = await req(app).delete('/users');
      expect(resDelete.status).toBe(400);
      expect(resDelete.body.error).toEqual('Missing authorization headers');
    });
  });

  describe('Check Session and Roles in /users', () => {
    test('GET Array of users in db /users', async () => {
      const res = await req(app).get('/users').set(headers);
      expect(res.status).toBe(200);
      expect(res.body.data[0]).toBeDefined();

      // wink wink
      userId = res.body.data[0]._id;
    });

    test('GET, POST, PUT and DELETE need _id param with 24 hex characters /users', async () => {
      const resGet = await req(app).get('/users/asda').set(headers);
      expect(resGet.status).toBe(400);
      expect(resGet.body.error.errorMsg[0].errorType).toEqual('too_small');

      const resPut = await req(app).put('/users/asda').set(headers);
      expect(resPut.status).toBe(400);
      expect(resPut.body.error.errorMsg[0].errorType).toEqual('too_small');

      const resDelete = await req(app).delete('/users/asda').set(headers);
      expect(resDelete.status).toBe(400);
      expect(resDelete.body.error.errorMsg[0].errorType).toEqual('too_small');
    });

    test('GET user [0] in DB /users', async () => {
      const res = await req(app).get(`/users/${userId}`).set(headers);
      expect(res.status).toBe(200);
    });
  });
});
