const WineService={
    getAllWines(knex){
        return knex.select('*').from('wines')
    },

    getWineId(knex, id){
        return knex('wines')
        .select('*')
        .where('id',id)
        .first()
    },
    deleteWine(knex, id){
        return knex('wines')
        .where('id',id)
        .delete()
    }
}

module.exports = WineService