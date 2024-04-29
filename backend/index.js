// Importar dependencias
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conexion = require('./database/connection');

// Importar todas las rutas para usarlos
const UserRoutes = require('./routes/user');
const PostRoutes = require('./routes/post');
const FollowRoutes = require('./routes/follow');
const ComentarioRoutes = require('./routes/comentario');
const app = express();

dotenv.config();
conexion(process.env.URI);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use('/api/user', UserRoutes);
app.use('/api/post', PostRoutes);
app.use('/api/follow', FollowRoutes);
app.use('/api/comentario', ComentarioRoutes);

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});
