const request = require('supertest');
const app = require('../app');

describe('Users Controller', () => {
  test('GET /user - It should respond with list of users', async () => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test('GET /user/:id - It should respond with a specific user', async () => {
    const userId = 1;
    const response = await request(app).get(`/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('role');
  });

  test('GET /user/:id - It should handle non-existent user', async () => {
    const nonExistentUserId = 999;
    const response = await request(app).get(`/user/${nonExistentUserId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'user doesnt exist');
  });
});
