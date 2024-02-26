const isString = (req, res, next) => {
    const userId = req.params.userId
  
    if (userId) {
      req.params.userId = Number(userId)
    }
  
    next()
  }
  
  const Auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    const secretKey = 'tu_clave_super_secreta';
    console.log(token);
    if (!token) return res.status(401).json({ message: "Acceso denegado" });
  
    try {
      jwt.verify(token, secretKey);
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };
  
  module.exports = {
    isString,
    Auth
  }