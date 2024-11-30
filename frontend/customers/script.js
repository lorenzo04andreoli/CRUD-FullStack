document.addEventListener('DOMContentLoaded', () =>{

    //Carregar clientes
    fetchCustomers();

    //Adicionar cliente
    document.getElementById('addCustomerBtn').addEventListener('click', () =>{
        const name = prompt('Nome do cliente:');
        const email = prompt('Email do cliente');
        if (name && email){
            addCustomer({name, email});
        }
    });
});

//Função para carregar clientes

async function fetchCustomers(){
    const response = await fetch('../../service/customers/fetchCustomers.php');
    const customers = await response.json();
    const table = document.getElementById('customersTable');
    table.innerHTML = customers.map(customer => ` 
         <tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">Editar</button>
                <button onclick="deleteCustomer(${customer.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Adicionar cliente

async function addCustomer(customer){
    const response = await fetch('../../service/customers/addCustomers.php',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
    });
    const result = await response.json();
    alert(result.message);
    fetchCustomers();
}

//Editar cliente
function editCustomer(id){
    const name = prompt('Novo nome do cliente:');
    const email = prompt('Novo email do cliente:');
    if  ( name && email ){
        fetch('../../service/customers/editCustomers.php', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, name, email})
        }).then(()=> fetchCustomers());
    }

}

//Excluir cliente
function deleteCustomer(id){
    if (confirm('Tem certeza que deseja excluir este cliente?')){
        fetch('../../service/customers/deleteCustomers.php',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})            
        }).then(()=> fetchCustomers());
    }
}