const supertest = require('supertest');
const server = require('../api/server');


describe('index integration test', () => {
	it('gets welcome message', async () => {
		//call the endpoint, asset againt the response
		const res = await supertest(server).get('/');
		//console.log(res);
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.message).toBe('no worries we are up and running');
	})
})