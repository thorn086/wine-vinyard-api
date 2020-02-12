const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./wine.fixtures')

describe('wine Endpoints', function () {
    let db

    const { testUsers, testWines} = helpers.makeFixtures()
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })


    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE wines, wine_users CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE wines, wine_users CASCADE'))

    describe(`GET /api/wine`, () => {
        context(`Given no wine`, () => {
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/wine')
                    .expect(200, [])
            })
        })
        context(`Given there are wines in the db`, () => {
            beforeEach('insert Wines', () => {
                return db
                    .into('wines')
                    .insert(testWines)
            })
            it('GET api/wine responds 200 and all of the wines', () => {
                return supertest(app)
                    .get('/api/wine')
                    .expect(200, testWines)
            })
        })
    })

    describe(`GET /api/wine/:id`, () => {
        context('Given No Wines', () => {
            it('responds with 404', () => {
                const id = 3434
                return supertest(app)
                    .get(`/api/wine/${id}`)
                    .expect(404, { error: { message: `Wine does not exist` } })
            })
        })
    })
})
