const express = require('express')
const cors = require('cors')
const { Sequelize, Model, DataTypes } = require('sequelize')
require('dotenv').config()
const { default: entries } = require('../tracker/src/servise/entries')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
})
class Entries extends Model {}


Entries.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sleep: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mood: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date:{
      type: DataTypes.TEXT,
      allowNull: false,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'entries'
})

  app.use(cors())
  app.use(morgan('tiny'))
  app.use(express.json())

  Entries.sync()

  app.get('/api/entries', (request, response, next) => {
    Entries.findAll()
        .then(entries => response.json(entries))
        .catch(error => next(error))
  })

  app.get('/info', (request, response, next) => {
      Entries.count().then(count => {
        response.send(`<p>päiväkirja saa tiedot ${count} entries </br> ${new Date()}</p>`)
      }).catch(error => next(error))
  })

 app.get('/info', (request, response, next) => {
    Entries.count()
        .then(count => {
            response.send(`<p>Diary has info for ${count} entries </br> ${new Date()}</p>`)
        })
        .catch(error => next(error))
})

// Hae yksittäinen merkintä ID:n perusteella
app.get('/api/entries/:id', (request, response, next) => {
    const id = request.params.id

    Entries.findByPk(id)
        .then(entry => {
            if (entry) {
                response.json(entry)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


app.delete('/api/entries/:id', (request, response, next) => {
    const id = request.params.id
    
    Entries.findByPk(id)
        .then(entry => {
            if (entry) {
                entry.destroy().then(() => {
                    response.status(204).end()
                }) 
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// Lisää uusi merkintä
app.post('/api/entries', (request, response, next) => {
    const body = request.body

    // Validointi ennen tallennusta
    if (!body.date || !body.mood || !body.sleep) {
        return response.status(400).json({ error: 'sisältö puuttuu' })
    }

    const entry = {
        date: body.date, 
        mood: body.mood, 
        sleep: body.sleep
    }

    Entries.create(entry)
        .then(savedEntry => response.status(201).json(savedEntry))
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) =>
    response.status(404).send({ error: 'unknown endpoint' });

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).send({ error: 'vääränlainen id' }) 
    }
    if (error.name === 'SequelizeValidationError') {
        return response.status(400).send({ error: error.message })
    }
    
    next(error)
}
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})