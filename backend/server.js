const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4001;
const userRoutes = express.Router();
const piezaRoutes = express.Router();
const bicicletaRoutes = express.Router();


let User = require('./user.model'); //Collection?
let Pieza = require('./pieza.model'); //Collection?
let Bicicleta = require('./bicicleta.model'); //Collection?


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/bicicleteria', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


//*********************USERS ROUTES
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, data) {
        res.json(data);
    });
});

// traer un registro (documento)
userRoutes.route('/get/:usuario').get(function(req, res) {
    let usuario = req.params.usuario;
    User.findOne({usuario: usuario}, function(err, data) {
        res.json(data);
    });
});

userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, data) {
        if (!data)
            res.status(404).send("data is not found");
        else
            data.usuario = req.body.usuario;
            data.clave = req.body.clave;
            data.rol = req.body.rol;

            data.save().then(data => {
                res.json('User updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

userRoutes.route('/delete-user/:id').post(function(req, res) {
    User.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
    );
});

//*********************PIEZAS ROUTES
piezaRoutes.route('/').get(function(req, res) {
    Pieza.find(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    }).sort({"codigo": 1}); //ORDER LIST
});

piezaRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Pieza.findById(id, function(err, data) {
        res.json(data);
    });
});

// traer un registro (documento) con dos parámetros
piezaRoutes.route('/get/:codigo/:tipo').get(function(req, res) {
    let codigo = req.params.codigo;
    let tipo = req.params.tipo;
    Pieza.find({codigo: codigo, tipo: tipo}, function(err, data) {
        res.json(data);
    });
});

piezaRoutes.route('/add').post(function(req, res) {
    let pieza = new Pieza(req.body);
    pieza.save()
        .then(pieza => {
            res.status(200).json({'pieza': 'pieza added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new pieza failed');
        });
});

piezaRoutes.route('/update/:id').post(function(req, res) {
    Pieza.findById(req.params.id, function(err, data) {
        if (!data)
            res.status(404).send("data is not found");
        else
            data.codigo = req.body.codigo;
            data.tipo = req.body.tipo;
            data.cantidad = req.body.cantidad;

            data.save().then(data => {
                res.json('Pieza updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// traer un registro (documento) con dos parámetros
piezaRoutes.route('/get/:codigo/:tipo').get(function(req, res) {
    let codigo = req.params.codigo;
    let tipo = req.params.tipo;
    Pieza.find({codigo: codigo, tipo: tipo}, function(err, data) {
        res.json(data);
    });
});

piezaRoutes.route('/delete-pieza/:id').post(function(req, res) {
    Pieza.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
    );
});

//*********************BICICLETAS ROUTES

bicicletaRoutes.route('/').get(function(req, res) {
    Bicicleta.find(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    }).sort({"codigo": 1}); //ORDER LIST
});

bicicletaRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Bicicleta.findById(id, function(err, data) {
        res.json(data);
    });
});

bicicletaRoutes.route('/add').post(function(req, res) {
    let bici = new Bicicleta(req.body);
    bici.save()
        .then(bici => {
            res.status(200).json({'bici': 'bici added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new bici failed');
        });
});

// traer un registro (documento) con dos parámetros
bicicletaRoutes.route('/get/:codigo').get(function(req, res) {
    let codigo = req.params.codigo;
    Bicicleta.find({codigo: codigo}, function(err, data) {
        res.json(data);
    });
});

bicicletaRoutes.route('/update/:id').post(function(req, res) {
    Bicicleta.findById(req.params.id, function(err, data) {
        if (!data)
            res.status(404).send("data is not found");
        else
            data.codigo = req.body.codigo;
            data.cantidad = req.body.cantidad;

            data.save().then(data => {
                res.json('Bicicleta updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/users', userRoutes); //collection
app.use('/piezas', piezaRoutes); //collection
app.use('/bicicletas', bicicletaRoutes); //collection

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
