const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/auth');

router.post('/', verificarToken, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ mensaje: 'No se subió ningún archivo' });
    }

    const archivo = req.files.archivo;
    const extension = archivo.name.split('.').pop().toLowerCase();
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

    if (!extensionesValidas.includes(extension)) {
      return res.status(400).json({
        mensaje: 'Extensión no permitida',
        extensionesPermitidas: extensionesValidas
      });
    }

    const nombreFinal = `${Date.now()}.${extension}`;
    const ruta = `${__dirname}/../../uploads/${nombreFinal}`;

    archivo.mv(ruta, (err) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al guardar el archivo' });
      }

      res.status(200).json({
        mensaje: 'Archivo subido con éxito',
        nombreOriginal: archivo.name,
        nombreFinal: nombreFinal,
        tipo: archivo.mimetype,
        tamaño: `${(archivo.size / 1024).toFixed(2)} KB`
      });
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al subir el archivo' });
  }
});

module.exports = router;
