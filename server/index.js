const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./models/config')
const bookRoutes = require('./routes/books')
const errorHandling = require('./middleware/errorMiddleware')
const cors = require('cors');
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

connect()

app.use(bodyParser.json());
app.use(express.json());
console.log(process.env.CLIENT_URL, 'client')
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    credentials: true
};
app.use(cors(corsOptions));


app.use('/api/v1/admin/book', bookRoutes);
app.get("/", (req, res) =>
res.status(200).json({ message: "API running successfully" })
);

app.use(errorHandling)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));