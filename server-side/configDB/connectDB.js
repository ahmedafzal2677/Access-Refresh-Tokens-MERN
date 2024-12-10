const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.DB_URL


mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully!')
}).catch(() => {
    console.log('Error Connection to MongoDB!')
})

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Database connected'));
