const Client = require('../models/Client');

const { age, date, numberPhone } = require('../lib/utils')

module.exports = {
  index(request, response) {
    let { filter, page, limit } = request.query

    page = page || 1
    // limit = limit || 2 //Pulando de 6 em 6
    limit = limit || 8 //Pulando de 8 em 8
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(clients) {
        
        const pagination = {
          total: Math.ceil(clients[0].total / limit),
          page
        }
        return response.render("index", { clients, pagination, filter  });
      }
    }

    Client.paginate(params)

  },

  create(request, response) {
    return response.render('clients/create')
  },

  async post(request, response) { 
    const keys = Object.keys(request.body)

    for(key of keys) {
      if(request.body[key] == "") {
        return response.json({err: "Preecha todos os campos"})
      }
    }
  
    let results = await Client.create(request.body)
    const ClientId = results.rows[0].id

    return response.redirect(`/clients/${ClientId}`);

   
  },

  async show(request, response) {

    let results = await Client.find(request.params.id)
    const client = results.rows[0]

    if(!client) return response.send("Not found")

    client.age = age(client.birth)
    client.services = client.services.split(",")
    client.phone = numberPhone(client.phone)
    client.gender = client.gender == "M" ? "Masculino" : "Feminino"
    client.created_at = date(client.created_at).format

    return response.render(`clients/show`, { client });
  
  },

  async edit(request, response) {
    let results = await Client.find(request.params.id)
    const client = results.rows[0]

    if(!client) return response.send("Not found")

    client.birth = date(client.birth).iso

    return response.render(`clients/edit`, { client });
  },

  async put(request, response) {
    const keys = Object.keys(request.body)

    for(key of keys) {
      if(request.body[key] == "") {
        return response.json({err: "Preecha todos os campos"})
      }
    }

    await Client.update(request.body)
    
    return response.redirect(`/clients/${request.body.id}`)
  },

  async delete(request, response) {

   await Client.delete(request.body.id)

    return response.redirect(`/`)
  }
}


