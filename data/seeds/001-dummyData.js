
exports.seed = async function(knex) {
  await knex('animals').truncate();
  await knex('animals').insert([
    {name: 'Altay', age: 8, species: "britain"},
    {name: 'Elvis', age: 5, species: "unknown"},
    {name: 'Mia', age: 4, species: "siam"},
    {name: 'Neo', age: 5, species: "siam"},
    {name: 'Wiqa', age: 26, species: "girlfriend"},
    {name: 'Ori', age: 1, species: "scotish fold"},
  ])
};
