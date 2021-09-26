module.exports = (app) => {
    const bicicletas = require('../controllers/bicicleta.controller.js');

    //Create a new bicicleta
    app.post('/bicicletas/create', bicicletas.create);

    //Retrieve all bicicletas
    app.get('/bicicletas', bicicletas.findAll);

    //Retrieve a single bicicleta with id
    app.get('/bicicletas/:bId', bicicletas.findOne);

    //Update a bicicleta with bId
    app.put('/bicicletas/:bId/update', bicicletas.update);

    //Delete a bicicleta
    app.delete('/bicicletas/:bId/delete', bicicletas.delete);
}