const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())


const authRoutes = require('./server/routes/auth');
const flashcardRoutes = require('./server/routes/flashcards');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.use('/api/auth/', authRoutes);
app.use('/api/flashcards/', flashcardRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))