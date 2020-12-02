const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
//crear servidor
const app = express();

//habilitar cors
const whiteList = ['http://localhost:3000']; //hace accesible solo desde esta url
const corsOptions = {
    origin: (origin, callbaback) => {
        //console.log(origin);
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callbaback(null, true)
        } else {
            callbaback(new Error('No permitido por cors'))
        }
    }
}

// app.use(cors(corsOptions));
app.use(cors());

//connectar a moongoDb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://kmikmilo:aDlqAv058tqvs3Iv@cluster0.1puvt.mongodb.net/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
console.log('db on line')

//habilitar el body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//habilitar routing
app.use('/', routes());

//puerto y arrancar dservidor
const port = process.env.PORT || 4000;
const host  = process.env.HOST || '0.0.0.0';


app.listen(port,host, () => {
    console.log(`servidor funcionando en ${port}...`);
});