const WineService={
    getAllWines(knex){
        return knex
        .select('*')
        .from('wines')
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
    },
    addWine(knex,newWine){
        return knex
        .insert(newWine)
        .into('wines')
        .returning('*')
        .then(rows=>{
            return rows[0]})
    }
}

module.exports = WineService