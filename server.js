const express = require('express')
const connectDB = require('./config/db')

const app = express()
app.use(express.json())

connectDB()

app.get('/', (req, res) => res.json({message: 'Welcome to contact keeper API'}))

app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))