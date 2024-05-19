const express = require('express');
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

const app = express();
const port = 3000;

app.use(express.json());

app.post('/print', (req, res) => {
    const { tableNumber, orderItems } = req.body;

    let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: 'tcp://192.168.1.100' // Reemplaza con la IP de tu impresora
    });

    printer.alignCenter();
    printer.println(`Pedido de Mesa ${tableNumber}`);
    printer.drawLine();
    printer.println(orderItems);
    printer.cut();

    try {
        let execute = printer.execute();
        console.log('Impresión exitosa');
        res.status(200).json({ message: 'Pedido enviado a la impresora' });
    } catch (error) {
        console.error('Error al imprimir:', error);
        res.status(500).json({ message: 'Error al imprimir' });
    }
});

app.listen(port, () => {
    console.log(`Servidor de impresión escuchando en el puerto ${port}`);
});
