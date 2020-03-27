const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const hero_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('hero_id',hero_id)
        .select('*')

        return response.json(incidents)
    }
}