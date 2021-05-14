const express = require('express');
const db = require('./animal-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const animals = await db.getAll();
		return res.status(200).json(animals);
	}
	catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const specAnimal = await db.getById(req.params.id);

		if (!specAnimal) {
			return res.status(404).json({
				message: "animal not exist in our database"
			})
		}
		res.status(200).json(specAnimal);
	}
	catch(err) {
		next(err);
	}
})

router.post('/', async (req, res, next) => {
	const {name, species, age} = req.body;

	if (!name || !species || !age) {
		return res.status(500).json({
			message: "please fill out all fields"
		})
	}
	try {
		const newAnimal = await db.create({
			name: name,
			species: species,
			age: age
		});
			res.status(201).json(newAnimal);
	}
	catch(err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const animal = await db.getById(req.params.id);

		if (!animal) {
			return res.status(404).json({
				message: "animal not exist in our database"
			})
		}
		const updatedAnimal = await db.update(req.params.id, req.body);
		res.status(201).json(updatedAnimal);
	}
	catch(err) {
		next(err);
	}
})

module.exports = router;