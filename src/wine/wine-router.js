const express = require('express')
const WineService = require('./wine-service')
const wineRouter = express.Router()
const xss = require('xss')
const bodyParser=express.json()

const sanitizeWine=wine=>({
    id:wine.id,
    winecat:xss(wine.winecat),
    date:wine.date,
    company_name:xss(wine.company_name),
    name:xss(wine.name),
    content:xss(wine.content),
    rating:wine.rating

})

wineRouter
    .route('/')
    .get((req, res, next) =>{
        WineService.getAllWines(req.app.get('db'))
        .then(wines =>{
            res.json(wines.map(sanitizeWine))
        })
        .catch(next)
    })
    //const {winecat, date, company_name, name, content, rating}=req.body
wineRouter
     .route('/:id')
     .all((req,res,next)=>{
        console.log(req.params.id)
        WineService.getWineId(req.app.get('db'), req.params.id)
        .then(wine=>{
            if(!wine){
                return res.status(404).json({
                    error:{message:'Wine does not exist'}
                })
            }
            res.wine=wine
            next()
        })
    })
    .get((req,res,next)=>{
        res.json(sanitizeWine(res.wine))
    })
    .delete(bodyParser, (req,res,next)=>{
        const {id}=req.params

        WineService.deleteWine(req.app.get('db'),id)
        .then(affected=>{
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = wineRouter