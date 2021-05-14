const supertest = require('supertest');
const server = require('../api/server');
const db = require('../data/config');

beforeEach(async () => {
	await db.seed.run();
})

beforeAll(async ( ) => {
	await db.migrate.rollback();
	await db.migrate.latest();
})

afterAll(async () => {
	await db.destroy();
})

describe('animals integration test', () => {
	it('gets all animals', async () => {
		const res = await supertest(server).get('/animals');
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.length).toBeGreaterThanOrEqual(6)
		expect(res.body[0].name).toBe('Altay');
		expect(res.body[1].name).toBe('Elvis');
	})

	it('gets specific animal', async () => {
		const res = await supertest(server).get('/animals/5');
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.name).toBe('Wiqa');
		expect(res.body.id).toBe(5);
		expect(res.body.species).toBe("girlfriend");
		expect(res.body.age).toBe(26);
	})

	it('gets error message if animal does not exists', async () => {
		const res = await supertest(server).get('/animals/42');
		expect(res.statusCode).toBe(404);
		expect(res.type).toBe('application/json');
		expect(res.body.message).toBe('animal not exist in our database');
	})

	it('creates a new animal', async () => {
		const res = await supertest(server)
			.post('/animals')
			.send({
				name: 'kek',
				age: 42,
				species: "pan"
			})
		expect(res.statusCode).toBe(201);
		expect(res.type).toBe('application/json');
		expect(res.body.name).toBe('kek')
		expect(res.body.age).toBe(42)
		expect(res.body.species).toBe('pan')
		expect(res.body.id).toBeDefined();
	})
})