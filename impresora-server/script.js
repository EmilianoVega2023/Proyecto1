function sendToMobile(tableNumber, orderItems) {
    let mobileIp = '192.168.1.101'; // Reemplaza con la IP del dispositivo móvil
    let orderData = {
        tableNumber: tableNumber,
        orderItems: orderItems
    };

    fetch(`http://${mobileIp}:3000/sendNotification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido enviado al dispositivo móvil:', data);
    })
    .catch(error => {
        console.error('Error al enviar al dispositivo móvil:', error);
    });
}
