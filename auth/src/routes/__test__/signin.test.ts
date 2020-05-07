import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'm@g.com', password: 'weee' })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'm@g.com', password: 'weee' })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'm@g.com', password: 'weeee' })
    .expect(400);
});

it('response with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'm@g.com', password: 'weee' })
    .expect(201);
  const res = await request(app)
    .post('/api/users/signin')
    .send({ email: 'm@g.com', password: 'weee' })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
