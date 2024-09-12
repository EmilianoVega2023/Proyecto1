function displayOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let ordersList = document.getElementById('ordersList');
    
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        let orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <strong>Mesa ${order.tableNumber}</strong>
            <p>${order.orderItems}</p>
        `;
        ordersList.appendChild(orderItem);
    });
}

// Llama a esta función al cargar la página para mostrar las órdenes actuales
displayOrders();

// Opcionalmente, podrías actualizar las órdenes automáticamente cada cierto tiempo
setInterval(displayOrders, 5000);