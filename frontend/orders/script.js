document.addEventListener('DOMContentLoaded', () =>{

    //Carregar produtos
    fetchProducts();

    // Adicionar produto
    document.getElementById('addProductsBtn').addEventListener('click', () => {
        const name = prompt('Nome do produto:');
        const description = prompt('Descrição do produto:');
        const price = parseFloat(prompt('Preço do produto (use números):'));
        const stock = parseInt(prompt('Quantidade do produto (use números):'), 10);

        // Verificar se os valores são válidos
        if (name?.trim() && description?.trim() && !isNaN(price) && !isNaN(stock)) {
            addProducts({ name: name.trim(), description: description.trim(), price, stock });
            alert('Produto adicionado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});

//Função para carregar produtos

async function fetchProducts(){
    const response = await fetch('../../service/products/fetchProducts.php');
    const products = await response.json();
    const table = document.getElementById('productsTable');
    table.innerHTML = products.map(products => ` 
         <tr>
            <td>${products.id}</td>
            <td>${products.name}</td>
            <td>${products.description}</td>
            <td>${products.price}</td>
            <td>${products.stock}</td>

            <td>
                <button onclick="editProducts(${products.id})">Editar</button>
                <button onclick="deleteProducts(${products.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Adicionar produto

async function addProducts(products){
    const response = await fetch('../../service/products/addProducts.php',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(products)
    });
    const result = await response.json();
    alert(result.message);
    fetchProducts();
}

//Editar produto
function editProducts(id){
    const name = prompt('Novo nome do produto:');
    const description = prompt('Nova descrição do produto:');
    const price = prompt('Novo preço do produto');
    const stock = prompt('Nova quantidade de produtos');
    if (name?.trim() && description?.trim() && !isNaN(price) && !isNaN(stock)){
        fetch('../../service/products/editProducts.php', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, name, description, price, stock})
        }).then(()=> fetchProducts());
    }

}

//Excluir produto
function deleteProducts(id){
    if (confirm('Tem certeza que deseja excluir este cliente?')){
        fetch('../../service/products/deleteProducts.php',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})            
        }).then(()=> fetchProducts());
    }
}