const connection = require('../database/connection')

module.exports = {
    async create (request, response) {
        const { id } = request.body;

        const hero = await connection('heroes')
        .where('id', id)
        .select('name')
        .first();

    if  (!hero) {
        return response.status(400).json({ error: 'No HERO found with this ID'});
    }
        return response.json(hero)
    }
}