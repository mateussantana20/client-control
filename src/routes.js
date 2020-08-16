const express = require('express');
const routes = express.Router();
const clients = require('./app/controllers/clients');

routes.get('/', (request, response) => {
  return response.redirect("/dashboard")
})

routes.get('/dashboard', clients.index)


/*Clientes*/ 
routes.get('/clients/create', clients.create)

routes.get('/clients/:id', clients.show)
routes.get('/clients/:id/edit', clients.edit)
routes.post('/clients', clients.post)
routes.put('/clients', clients.put)
routes.delete('/clients', clients.delete)


module.exports = routes;