const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/user");
const { generarJWT } = require("../helpers/jwt");

const CrearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        msg: "El correo ya esta registrado",
      });
    }
    const usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
};

const Login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        of: false,
        msg: "Email no encontrado",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        of: false,
        msg: "La contraseña no es valida",
      });
    }

    //GEnerar JWT
    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  return res.json({
    ok: true,
    msg: "login",
  });
};

const renewToken  = async (req, res = response) =>{

  const {uid} = req

  const token = await generarJWT(uid);

  const usuario = await Usuario.findById(uid);

  console.log(newToken);
  console.log(usuario);


  res.json({
    ok: true,
    usuario,
    token
  })
}

module.exports = {
  CrearUsuario,
  Login,
  renewToken
};
