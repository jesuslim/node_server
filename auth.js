// auth.js
const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_super_secreta';

function generateToken(userId) {
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '2h' });
  return token;
}



module.exports = { generateToken };
