const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router()
//login
routes.post('/sessions', SessionController.create)
//listagem de ONGs
 routes.get('/ongs', OngController.index) 
//cadastros de ONGs
routes.post('/ongs', OngController.create)  
//casos especificos de uma ONG
routes.get('/profile', ProfileController.index)


routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes