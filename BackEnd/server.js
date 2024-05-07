const express = require('express');
require('./utils/db');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const credRoutes = require('./routes/credentialRoutes');
const personRoutes = require('./routes/personRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use('/api', credRoutes);
app.use('/api', personRoutes);
app.use('/api', contactRoutes);
app.use('/api', messageRoutes);



let usp = io.of('/user-namespace');

usp.use((socket, next) => {
    const token = socket.handshake.auth.token;
    console.log(token);
    if (token) {
        return next();
    }
});

usp.on('connection', (socket) => {
    console.log(`User Connected whose token is ${socket.handshake.auth.token}`);
    
    socket.on('NewMessage', (data) => {
        console.log(data);
        // Use socket instead of usp to broadcast to connected clients
        socket.broadcast.emit('loadNewMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(process.env.PORT, () => {
    console.log(`APP IS LISTENING AT PORT ${process.env.PORT}`); 
});