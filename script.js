document.getElementById('addOrder').addEventListener('click', function() {
    let tableNumber = document.getElementById('tableNumber').value;
    let orderItems = document.getElementById('orderItems').value;
    
    if (tableNumber && orderItems) {
        addOrder(tableNumber, orderItems);
        sendToMobile(tableNumber, orderItems); // Nueva función para enviar al móvil
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
