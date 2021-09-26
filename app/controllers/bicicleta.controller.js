const Bicicleta = require('../models/b.models');

//Create and save bicicletas
exports.create = (req, res) => {
    //Validate
    debugger
    if(!req.body.color){
        return res.status(400).send({
            message: "La bicicleta debe tener un color " + req.body
        });
    }

    //Create bicicleta
    const bici = new Bicicleta({
        color: req.body.color || "",
        tipo: req.body.tipo || "",
        lactitud: req.body.lactitud || "",
        longitud: req.body.longitud || "",
    });

    bici.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al guardar."
        });
    });
};

//Retrieve and return all bicicletas
exports.findAll = (req, res) => {
    Bicicleta.find()
    .then(bici => {
        res.send(bici);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al consultar"
        });
    });
};

//Find a single bicicleta with id
exports.findOne = (req, res) => {
    Bicicleta.findById(req.params.bId)
    .then(bici => {
        if(!bici) {
            return res.status(404).send({
                message: "Bicicleta not found with id " + req.params.bId + bici
            });            
        }
        res.send(bici);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bicicleta not found with id " + req.params.bId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Bicicleta with id " + req.params.bId + err
        });
    });
};

//Update a bicicleta with id
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.color) {
        return res.status(400).send({
            message: "bicicleta content can not be empty"
        });
    }

    // Find note and update it with the request body
    Bicicleta.findByIdAndUpdate(req.params.bId, {
        color: req.body.color || "",
        tipo: req.body.tipo || "",
        lactitud: req.body.lactitud || "",
        longitud: req.body.longitud || "",
    }, {new: true})
    .then(bici => {
        if(!bici) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.bId
            });
        }
        res.send(bici);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.bId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.bId
        });
    });
};

//Delete a bicicleta with id
exports.delete = (req, res) => {
    Bicicleta.findByIdAndRemove(req.params.bId)
    .then(bici => {
        if(!bici) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.bId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.bId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.bId
        });
    });
};