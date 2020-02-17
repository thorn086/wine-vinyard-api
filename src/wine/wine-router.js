const express = require('express')
const WineService = require('./wine-service')
const wineRouter = express.Router()
const path = require('path')
const xss = require('xss')
const {requireAuth} = require('../middleware/jwt-auth')
const bodyParser=express.json()

const sanitizeWine=wine=>({
    id:wine.id,
    winecat:xss(wine.winecat),
    date:wine.date,
    company_name:xss(wine.company_name),
    name:xss(wine.name),
    content:xss(wine.content),
    rating:wine.rating,
    author:wine.author

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
    .post(requireAuth, bodyParser, (req,res,next)=>{
    const {winecat, date, company_name, name, content, rating}=req.body
    const user = req.user.id
   
    const newWine = {winecat, date, company_name, name, content, rating, author:user}
  
    for(const [key, value]of Object.entries(newWine)){
        if(value== null){
            return res.status(400).json({
                error: {message: `Missing '${key}' in request`}
            })
        }
    }
    WineService.addWine(req.app.get('db'), newWine)
    .then(wine=>{
        res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${wine.id}`))
        .json(sanitizeWine(wine))
    })
    .catch(next)
})


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