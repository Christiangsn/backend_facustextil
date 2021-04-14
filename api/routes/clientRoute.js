const { Router } = require ('express');
const ClientController = require('../controllers/clientController');
const OdersController = require('../controllers/ordersController');

const router = Router();

router.post('/register', ClientController.store)
router.get('/clients', ClientController.indexClient)
router.get('/clients/:id', ClientController.oneClient)
router.delete('/clients/:id', ClientController.deleteClient)
router.put('/clients/:id', ClientController.editClient)
router.post('/newrequest', OdersController.request)
router.get('/requests', OdersController.indexRequest)
router.delete('/requests/:id', OdersController.deletRequest)
router.put('/requests/:id', OdersController.editRequest)
router.get('/logcollection',OdersController.indexLogs )



module.exports = router