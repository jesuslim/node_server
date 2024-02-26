const express = require('express');
const bcrypt = require('bcrypt');
const { isString, Auth } = require('./middleware');
const sequelize = require('./model/config');
require('./model');

const { User } = require('./model');
const { generateToken } = require('./auth');

const app = express()
app.use(express.json())

// Ruta defalult
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});


// login
app.post('/login', async (req, res) => {
  console.log('login');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = generateToken(user.id);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para obtener usuarios
app.get('/api/users',async (req, res) => {
  const queryName = req.query.name
  console.log({queryName});
  const usersResponse = await User.findAll()
    res.send(usersResponse)
})

// Ruta para obtener un usuario
app.get('/api/users/:userId', isString, async(req, res) => {
  const userId = req.params.userId
  const user = await User.find((User) => user.id === userId)
  
  if (!user) {
    res.status(404).send({
      statusCode: 404,
      message: 'Usuario no encontrado'
    })
  }

  res.json(user)
})

// Ruta para crear un usuario
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  res.json({
    message: 'Usuario creado',
    data: user
  });
})

const PORT = 3001

sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  })
})