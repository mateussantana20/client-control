const { age, date, numberPhone } = require('../lib/utils')

const db = require('../../config/db');

module.exports = {
  all(callback) {

    db.query(`SELECT * FROM clients ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })

  },

  create(data) {
    const query = `
      INSERT INTO clients (
        name,
        avatar,
        phone,
        birth,
        gender,
        services,
        bio,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar,
      data.phone,
      date(data.birth).iso,
      data.gender,
      data.services,
      data.bio,
      date(Date.now()).iso
    ]

    // db.query(query, values, (err, results) => {
    //   if(err) throw `Database Error! ${err}`

    //   callback(results.rows[0])
    // })
    return db.query(query, values)
  },

  find(id) {
    return db.query(`
      SELECT * 
      FROM clients 
      WHERE id = $1`, [id])
  },

  findBy(search, callback) {

  db.query(`
    SELECT *
    FROM clients 
    WHERE clients.name ILIKE '%${search}%'
    ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database error ${err}`;

      callback(results.rows)
    })
  },

  update(data) {
    const query = `
      UPDATE clients SET
        name=($1),
        avatar=($2),
        phone=($3),
        birth=($4),
        gender=($5),
        services=($6),
        bio=($7)
      WHERE id = $8
    ` 

    const values = [
      data.name,
      data.avatar,
      data.phone,
      date(data.birth).iso,
      data.gender,
      data.services,
      data.bio,
      data.id
    ]

    return db.query(query, values)

  },

  delete(id, callback) {
    db.query(`DELETE FROM clients WHERE id = $1`, [id])
  },

  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = ``
    let filterQuery = ``
    let totalQuery = `(
      SELECT count(*) FROM clients
    ) AS total`



    //Filtro

    if( filter ) {

      filterQuery = `
      WHERE clients.name ILIKE '%${filter}%'
      `
      totalQuery = `(
        SELECT count(*) FROM clients
        ${filterQuery}
      ) as total`
    }

    //Paginação
    query  = `
    SELECT clients.*, ${totalQuery} 
    FROM clients
    ${filterQuery}
    LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if(err) throw 'Database E rror!'

      callback(results.rows)
    })

  }
}