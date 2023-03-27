const test = require('node:test');
const assert = require('node:assert/strict');
const Fetch = require('../utilsTest/FetchClass');
const testUserData = require('../utilsTest/settings');

const $ = new Fetch('http://localhost:3334');
let userId = '';

test('Testing Auth enpoints', async (t) => {
  await t.test('Username is required', async () => {
    const res = await $.post('/auth', { password: '' });
    assert.strictEqual(res.status, 400);
    assert(res.error instanceof Array);
    assert.strictEqual(res.error[0].errorType, 'invalid_type');
    assert.strictEqual(res.error[0].message, 'Required');
  });

  await t.test('Password is required', async () => {
    const res = await $.post('/auth', { username: 'anyuser' });
    assert.strictEqual(res.status, 400);
    assert(res.error instanceof Array);
    assert.strictEqual(res.error[0].errorType, 'invalid_type');
    assert.strictEqual(res.error[0].message, 'Required');
  });

  await t.test('username can`t be empty', async () => {
    const res = await $.post('/auth', { username: '', password: '' });
    assert.strictEqual(res.error[0].errorType, 'too_small');
    assert.strictEqual(res.error[0].message, 'username can`t be empty');
    assert.strictEqual(res.error[1].errorType, 'too_small');
  });

  await t.test('too small password, need at least 10 characters', async () => {
    const res = await $.post('/auth', { username: 'anyuser', password: '123456789' });
    assert.strictEqual(res.status, 400);
    assert(res.error instanceof Array);
    assert.strictEqual(res.error[0].errorType, 'too_small');
  });

  await t.test('incorrect username or password', async () => {
    const res = await $.post('/auth', { username: 'anyuser', password: '1234567890' });
    assert.strictEqual(res.status, 401);
    assert(typeof res.error === 'string');
    assert.strictEqual(res.error, 'Username or password is incorrect');
  });
});

test('Authorization Headers validation in /users', async (t) => {
  await t.test('GET, POST, PUT and DELETE Need Bearer token', async () => {
    const resGet = await $.get('/users');
    assert.strictEqual(resGet.status, 401);
    assert(resGet.error instanceof Object);
    assert.strictEqual(resGet.error.name, 'JsonWebTokenError');
    assert.strictEqual(resGet.error.message, 'jwt malformed');

    const resPost = await $.post('/users');
    assert.strictEqual(resPost.status, 401);
    assert(resPost.error instanceof Object);
    assert.strictEqual(resPost.error.name, 'JsonWebTokenError');
    assert.strictEqual(resPost.error.message, 'jwt malformed');

    const resPut = await $.put('/users');
    assert.strictEqual(resPut.status, 401);
    assert(resPut.error instanceof Object);
    assert.strictEqual(resPut.error.name, 'JsonWebTokenError');
    assert.strictEqual(resPut.error.message, 'jwt malformed');

    const resDel = await $.del('/users');
    assert.strictEqual(resDel.status, 401);
    assert(resDel.error instanceof Object);
    assert.strictEqual(resDel.error.name, 'JsonWebTokenError');
    assert.strictEqual(resDel.error.message, 'jwt malformed');
  });
});

test('Login works and set token in $ object', async () => {
  const res = await $.post('/auth', testUserData);
  assert.strictEqual(res.status, 200);
  assert(typeof res.data.token === 'string');

  // wink wink
  $.token = res.data.token;
});

test('Check Session and Roles in /users', async (t) => {
  await t.test('GET Array of users in db /users', async () => {
    const res = await $.get('/users');
    assert.strictEqual(res.status, 200);
    assert(res.data instanceof Array);
    assert(res.data[0] instanceof Object);
    assert(typeof res.data[0]._id === 'string');

    // wink wink
    userId = res.data[0]._id;
  });

  await t.test('GET, PUT and DELETE need _id param with 24 hex characters /users', async () => {
    const resGet = await $.get('/users/asda');
    assert.strictEqual(resGet.status, 400);
    assert.strictEqual(resGet.error[0].errorType, 'too_small');

    const resPut = await $.put('/users/asda');
    assert.strictEqual(resPut.status, 400);
    assert.strictEqual(resPut.error[0].errorType, 'too_small');

    const resDel = await $.del('/users/asda');
    assert.strictEqual(resDel.status, 400);
    assert.strictEqual(resDel.error[0].errorType, 'too_small');
  });

  await t.test('GET user [0] in DB /users', async () => {
    const res = await $.get(`/users/${userId}`);
    assert.strictEqual(res.status, 200);
  });
});

test('Create, Update and Delete document', async (t) => {
  await t.test('POST create, can`t send empty body, and required keys', async () => {
    const res = await $.post('/users', {});
    assert.strictEqual(res.status, 400);

    assert(res.error instanceof Array);
    // add the required keys for create user endpoint -> in real order <-
    const bodyKeysForUser = ['username', 'password', 'email', 'name', 'telf', 'active', 'roles'];
    assert(res.error.length === bodyKeysForUser.length); // don't forget

    res.error.forEach((element, index) => {
      assert(element instanceof Object);
      assert(typeof element.message === 'string');
      assert.strictEqual(element.message, 'Required');
      assert(element.path.includes(bodyKeysForUser[index]));
    });
  });

  // ID user test111
  let userTempId = '';

  await t.test('POST create Temp user', async () => {
    const res = await $.post('/users', {
      username: 'temp',
      password: '1111111111',
      email: 'temp@gmail.com',
      name: 'test temp test',
      telf: '+58 000 0000',
      active: false,
      roles: ['user'],
    });

    assert.strictEqual(res.status, 201);

    // set _id in userTempId
    userTempId = res.data._id;
  });

  await t.test('PUT Temp user', async () => {
    const res = await $.put(`/users/${userTempId}`, {
      username: 'temp 2',
      password: '111111111r',
      email: 'temp2@gmail.com',
      name: 'testtemptest',
      telf: '+58 000 0001',
      active: true,
      roles: ['audit'],
    });
    assert.strictEqual(res.status, 200);
  });

  await t.test('DELETE Temp user', async () => {
    const res = await $.del(`/users/${userTempId}`);
    assert.strictEqual(res.status, 200);
  });
});
