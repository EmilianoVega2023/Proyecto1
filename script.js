document.getElementById('addOrder').addEventListener('click', function() {
    let tableNumber = document.getElementById('tableNumber').value;
    let orderItems = document.getElementById('orderItems').value;
    
    if (tableNumber && orderItems) {
        addOrder(tableNumber, orderItems);
    } else {
        alert('Por favor, ingrese tanto el número de mesa como los elementos del pedido.');
    }
});

function addOrder(tableNumber, orderItems) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    orders.push({
        tableNumber: tableNumber,
        orderItems: orderItems
    });
    
    localStorage.setItem('orders', JSON.stringify(orders));

    document.getElementById('tableNumber').value = '';
    document.getElementById('orderItems').value = '';
    
    displayOrders();
}

function displayOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let ordersList = document.getElementById('ordersList');
    
    ordersList.innerHTML = '';
    
    orders.forEach((order, index) => {
        let orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <strong>Mesa ${order.tableNumber}</strong>
            <p>${order.orderItems}</p>
            <button class="delete-order" onclick="deleteOrder(${index})">&times;</button>
        `;
        ordersList.appendChild(orderItem);
    });
}

function deleteOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrders();
}

// Llama a esta función al cargar la página para mostrar las órdenes actuales
displayOrders();
