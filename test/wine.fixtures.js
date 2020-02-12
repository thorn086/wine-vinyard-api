const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
      {
        id: 22,
        user_email: 'testuser1@gmail.com',
        first_name: 'Test1',
        last_name: 'User1',
        password: 'password',
        date_created: '2029-01-22T16:28:32.615Z'
      }
    ]
  }

function makeWineArray(){
    return [
    { id: 1,
        winecat: 'Red Wine',
        date: 2000,
        company_name: 'Horn Duck',
        name:'Marlot',
        content:' This is a dry wine with a hint of Oak flavor.',
        rating: 92,
        
    },
    { id: 2,
        winecat: 'White Wine',
        date: 2017,
        name:'Pino Noir',
        company_name: '1000 Buffalos',
        content:' This is a sweet wine to help remind you of the Fall Season.',
        rating: 90,
     
    }, 
    { id: 3,
        winecat: 'Red Wine',
        date: 2000,
        name:'Malboc',
        company_name: 'Bare Foot',
        content:' This is a semi-sweet wine with all the taste of Summer.',
        rating: 94,
       
    }, 
    { id: 4,
        winecat: 'White Wine',
        date: 2018,
        name:'Chardinay',
        company_name: 'Duck Bill',
        content:' This is a rather dry wine that works well with fish.',
        rating: 89,
       
    }]
}
function makeFixtures() {
    const testUsers = makeUsersArray()
    const testWines = makeWineArray()
  
    return { testUsers, testWines }
  }
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_email,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }

  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('wine_users').insert(preppedUsers)
      .then(() =>
        db.raw(
          `SELECT setval('wine_users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }
module.exports={
    makeWineArray,
    makeAuthHeader,
    makeUsersArray,
    makeFixtures,
    seedUsers
}