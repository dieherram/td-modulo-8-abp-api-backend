const fileUpload = require('express-fileupload');

const upload = fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true,
  responseOnLimit: 'El archivo excede el tamaño máximo de 5MB'
});

module.exports = upload;
