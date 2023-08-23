/**
 * Path: api/v1/users
 */

const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/user.controller');

const router = Router();
 
router.get('/',validarJWT, getUsuarios)

module.exports = router