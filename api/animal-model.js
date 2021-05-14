const db = require('../data/config');

const getAll = () => {
	return db('animals');
};

const getById = (id) => {
	return db('animals').where({ id }).first();
};

const getByName = (name) => {
	return db('animals').where({ name }).first();
}

const create = async (data) => {
	const [id] = await db('animals').insert(data);
	return getById(id);
};

const update = async (id, data) => {
	await db('animals').where({ id }).update(data);
};

const remove = (id) => {
	return db('animals').where({ id }).del();
};

module.exports = {
	getAll,
	getById,
	getByName,
	create,
	update,
	remove
};