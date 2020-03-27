const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('heroes', 'heroes.id', '=', 'incidents.hero_id')
            .limit(5)
            .offset((page - 1) * 5 )
            .select([
                'incidents.*', 
                'heroes.name', 
                'heroes.email', 
                'heroes.whatsapp',
                'heroes.city',
                'heroes.uf'
            ])

            response.header('X-Total-Count', count['count(*)'])


        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const hero_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            hero_id,
        })

        return response.json ({ id })

    },

    async delete(request, response) {
        const { id } = request.params;
        const hero_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('hero_id')
        .first();

        if (incident.hero_id != hero_id) {
            return response.status(401).json({ error: 'Operation not permitted.'})
        
        }
        await connection('incidents').where('id', id).delete()

        return response.status(204).send();
    }
}