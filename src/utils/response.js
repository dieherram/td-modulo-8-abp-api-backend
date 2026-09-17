const sendSuccess = (res, statusCode, mensaje, data = null) => {
  const response = { mensaje };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode, mensaje, data = null) => {
  const response = { mensaje };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };
