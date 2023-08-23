const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado, saveMessage} = require('../controllers/socket.controller');

// Mensajes de Sockets
io.on('connection', async client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
        
    // verificar auteticacion
    if(!valido) {
            return client.disconnect();
        }
    // Cliente Autenticado
        await usuarioConectado(uid);

    // Ingresar al usuario a una sala particular
    
    // sala global, client.id, uid: 64d53d231ddc4ad96baf1a36
    client.join(uid);
    
    
    // escuchar del cleinte el mensaje personal
    client.on('mensaje-personal', async (payload) => {
        console.log(payload);
        await saveMessage(payload)
        console.log('Mensaje guardado')
        io.to(payload.para).emit('mensaje-personal', payload);
    })


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);s
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
