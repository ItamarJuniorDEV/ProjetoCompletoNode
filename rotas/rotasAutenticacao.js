const express = require('express');
const { registrarUsuario, logarUsuario } = require('../controladores/controladorAutenticacao');

const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/login', logarUsuario);

module.exports = router;
