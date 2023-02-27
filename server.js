const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.get('/main.jsx', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'client', 'src', 'main.jsx'));
});

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/bike', require('./routes/api/bike'));
app.use('/api/reservation', require('./routes/api/reservation'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));