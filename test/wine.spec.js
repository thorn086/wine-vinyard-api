const {expect} = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeWineArray } = require('./wine.fixtures')

describe('wine Endpoints', function (){
    let db

    before('make knex instance',()=>{
        db = knex({
            client:'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db',db)
    })


    after('disconnect from db', ()=> db.destroy())

    before('clean the table',()=>db.raw('TRUNCATE wines RESTART IDENTITY CASCADE'))

    afterEach('cleanup',()=>db.raw('TRUNCATE wines RESTART IDENTITY CASCADE'))

    describe(`GET /api/wine`,()=>{
        context(`Given no wine`,()=>{
            it('responds with 200 and an empty array',()=>{
                return supertest(app)
                .get('/api/wine')
                .expect(200,[])
            })
        })
    })
})