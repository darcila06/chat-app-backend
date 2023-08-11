/**
 * Path: api/v1/login
 */

const {Router} = require('express');
const { check } = require('express-validator');

const { CrearUsuario, Login,renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('email', 'El email es obligatorio').not().isEmpty(),
   check('email', 'El email no es valido').isEmail(),
   check('password', 'La contraseña es obligatoria').not().isEmpty(),
   check('password', 'La contraseña es no es una contraseña fuerte').isStrongPassword(),
   validarCampos
] ,CrearUsuario);


router.post('/', [
   check('email', 'El email es obligatorio').not().isEmpty(),
   check('password', 'La contraseña es obligatoria').not().isEmpty(),
   check('email', 'El email no es valido').isEmail(),
   validarCampos
], Login)

// 
router.get('/renew',validarJWT, renewToken)

module.exports = router