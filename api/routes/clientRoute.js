const { Router } = require ('express');
const ClientController = require('../controllers/clientController');
const OdersController = require('../controllers/ordersController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.post('/register', ClientController.store);
router.post('/login/authenticate', ClientController.authenticate);
router.post('/forgotpassword', ClientController.forgotPassword);
router.put('/reset_password', ClientController.resetPassword);
router.get('/clients', ClientController.indexClient);

router.use(authMiddleware);
router.get('/profile', ClientController.profile);
router.put('/profile', ClientController.update);

router.post('/newrequest', OdersController.request)
router.get('/requests', OdersController.indexRequest)
router.delete('/requests/:id', OdersController.deletRequest)
router.put('/requests/:id', OdersController.editRequest)
router.get('/logcollection',OdersController.indexLogs )



module.exports = router