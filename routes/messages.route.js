/**
 * Path: /api/v1/messages
 */

const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getChat } = require('../controllers/messages.controllers');

const router = Router();
 
router.get('/:de',validarJWT, getChat)

module.exports = router