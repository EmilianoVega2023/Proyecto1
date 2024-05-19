document.getElementById('addOrder').addEventListener('click', function() {
    let tableNumber = document.getElementById('tableNumber').value;
    let orderItems = document.getElementById('orderItems').value;
    
    if (tableNumber && orderItems) {
        addOrder(tableNumber, orderItems);
        sendToPrinter(tableNumber, orderItems); 
    } else {
        alert('Por favor, ingrese tanto el número de mesa como los elementos del pedido.');
    }
});

function addOrder(tableNumber, orderItems) {
    let ordersList = document.getElementById('ordersList');
    
    let orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
        <strong>Mesa ${tableNumber}</strong>
        <p>${orderItems}</p>
    `;
    
    ordersList.appendChild(orderItem);
    
    document.getElementById('tableNumber').value = '';
    document.getElementById('orderItems').value = '';
}

function sendToPrinter(tableNumber, orderItems) {
    let printerIp = '192.168.1.100'; // Reemplaza con la IP de tu impresora
    let orderData = {
        tableNumber: tableNumber,
        orderItems: orderItems
    };

    fetch(`http://${printerIp}:3000/print`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido enviado a la impresora:', data);
    })
    .catch(error => {
        console.error('Error al enviar a la impresora:', error);
    });
}
