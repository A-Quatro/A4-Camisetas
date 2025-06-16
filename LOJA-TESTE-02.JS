// GERAR 50 PRODUTOS AUTOMATICAMENTE
const produtos = [];
for (let i = 1; i <= 50; i++) {
  produtos.push({
    id: i,
    nome: "Produto " + i,
    descricao: "Descrição do produto personalizado número " + i,
    preco: (10 + i).toFixed(2),
    imagem: "https://via.placeholder.com/150?text=Produto+"+i
  });
}

const listaProdutos = document.getElementById("listaProdutos");
produtos.forEach(p => {
  const div = document.createElement("div");
  div.className = "produto";
  div.innerHTML = `
    <img src="${p.imagem}" alt="${p.nome}">
    <h4>${p.nome}</h4>
    <p>${p.descricao}</p>
    <p>R$ ${p.preco}</p>
    <label>Tamanho:</label><br>
    <input type="checkbox" value="P"> P 
    <input type="checkbox" value="M"> M 
    <input type="checkbox" value="G"> G 
    <input type="checkbox" value="GG"> GG 
    <br><br>
    <label>Quantidade:</label><br>
    <input type="number" id="qtd_${p.id}" value="1" min="1"><br><br>
    <button onclick="adicionarCarrinho(${p.id})">Adicionar ao Carrinho</button>
  `;
  listaProdutos.appendChild(div);
});

let carrinho = [];

function adicionarCarrinho(id){
  const produto = produtos.find(p => p.id === id);
  const qtd = parseInt(document.getElementById(`qtd_${id}`).value);
  const tamanhos = Array.from(document.querySelectorAll(`#qtd_${id}`).parentElement.querySelectorAll("input[type=checkbox]:checked")).map(t => t.value);
  if(tamanhos.length === 0){
    alert("Selecione pelo menos um tamanho");
    return;
  }
  carrinho.push({...produto, qtd, tamanhos});
  atualizarCarrinho();
}

function atualizarCarrinho(){
  document.getElementById("totalItens").innerText = carrinho.length;
}

function mostrarCarrinho(){
  document.getElementById("carrinho").style.display = 'block';
  const lista = document.getElementById("itensCarrinho");
  lista.innerHTML = "";
  carrinho.forEach((item, index) => {
    lista.innerHTML += `<li>${item.nome} - ${item.tamanhos.join(",")} - Qtd: ${item.qtd}</li>`;
  });
}

function finalizarPedido(){
  if (!usuarioLogado){
    alert("Faça login para finalizar o pedido.");
    return;
  }
  alert("Pedido enviado com sucesso!");
}

let usuarioLogado = false;
function mostrarLogin(){
  document.getElementById("loginArea").style.display = 'block';
}
function mostrarCadastro(){
  document.getElementById("cadastroArea").style.display = 'block';
}

function logar(){
  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;
  if(email === "teste@adm.com" && senha === "1234"){
    usuarioLogado = true;
    alert("Login realizado com sucesso!");
    document.getElementById("loginArea").style.display = 'none';
  } else {
    alert("Usuário não encontrado. Somente usuários cadastrados podem comprar.");
  }
}
