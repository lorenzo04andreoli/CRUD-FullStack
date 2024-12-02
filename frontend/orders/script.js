document.addEventListener('DOMContentLoaded', () => {
    // Carregar pedidos
    fetchOrders();

    // Adicionar pedido
    document.getElementById('addOrderBtn').addEventListener('click', async () => {
        const customerId = prompt('ID do cliente:');
        const productId = prompt('ID do produto:');
        const quantity = prompt('Quantidade:');

        if (customerId && productId && quantity) {
            await addOrder({ customerId, productId, quantity });
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});

// Função para carregar pedidos
async function fetchOrders() {
    const response = await fetch('../../service/orders/fetchOrders.php');
    const orders = await response.json();
    const table = document.getElementById('ordersTable');
    table.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer_name}</td>
            <td>${order.order_date}</td>
            <td>${order.status}</td>
            <td>
                <button onclick="deleteOrder(${order.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Função para adicionar pedido
async function addOrder(order) {
    const response = await fetch('../../service/orders/addOrders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    });
    const result = await response.json();
    alert(result.message);
    fetchOrders();
}

// Função para excluir pedido
async function deleteOrder(id) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
        await fetch('../../service/orders/deleteOrders.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        fetchOrders();
    }
}
