const router = require('express').Router();
const authController = require('../controllers/auth-controller');
const am = require('../middlewares/async-middleware');

router.post('/register',am(authController.register));
router.post('/verify',am(authController.verify));
router.post('/login',am(authController.login));
router.post('/resend',am(authController.resend));


module.exports = router;