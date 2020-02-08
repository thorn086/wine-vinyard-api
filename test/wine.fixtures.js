function makeWineArray(){
    return 
   [
    { id: 1,
        wineCat: 'Red Wine',
        date: 2000,
        company_name: 'Horn Duck',
        name:'Marlot',
        content:' This is a dry wine with a hint of Oak flavor.',
        rating: 92
    },
    { id: 2,
        wineCat: 'White Wine',
        date: 2017,
        name:'Pino Noir',
        company_name: '1000 Buffalos',
        content:' This is a sweet wine to help remind you of the Fall Season.',
        rating: 90
    }, 
    { id: 3,
        wineCat: 'Red Wine',
        date: 2000,
        name:'Malboc',
        company_name: 'Bare Foot',
        content:' This is a semi-sweet wine with all the taste of Summer.',
        rating: 94
    }, 
    { id: 4,
        wineCat: 'White Wine',
        date: 2018,
        name:'Chardinay',
        company_name: 'Duck Bill',
        content:' This is a rather dry wine that works well with fish.',
        rating: 89
    }
]
}

module.exports={
    makeWineArray
}