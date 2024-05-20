require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/sendNotification', async (req, res) => {
    const { tableNumber, orderItems } = req.body;

    try {
        const response = await axios.post('https://fcm.googleapis.com/fcm/send', {
            to: '/topics/orders',
            notification: {
                title: `Nuevo pedido de Mesa ${tableNumber}`,
                body: orderItems
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${process.env.FCM_SERVER_KEY}`
            }
        });

        console.log('Notificación enviada con éxito:', response.data);
        res.status(200).json({ message: 'Pedido enviado al dispositivo móvil' });
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        res.status(500).json({ message: 'Error al enviar notificación' });
    }
});

app.listen(port, () => {
    console.log(`Servidor de notificaciones escuchando en el puerto ${port}`);
});

// ClaveDeApi_Gemini:   AIzaSyArS9GYChQv5mjzOlfd0vT2mVnOMPHv-8A