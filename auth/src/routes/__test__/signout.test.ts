import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'm@g.com', password: 'weee' })
    .expect(201);
  const res = await request(app)
    .post('/api/users/signin')
    .send({ email: 'm@g.com', password: 'weee' })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();

  const res2 = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
  //console.log(res2.get('Set-Cookie'));
  expect(res2.get('Set-Cookie')).toBeDefined();
  expect(res2.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
