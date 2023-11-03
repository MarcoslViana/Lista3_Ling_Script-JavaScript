class ClienteBanco {
  constructor(nome, documento, saldo) {
    this.nome = nome;
    this.documento = documento;
    this.saldo = saldo;
  }

  depositar() {
    this.saldo += 100;
    exibirClientes();
  }

  sacar() {
    if (this.saldo >= 100) {
      this.saldo -= 100;
      exibirClientes();
    } 
    else {
      alert('Saldo insuficiente para saque.');
    }
  }
}

const clienteForm = document.getElementById('clienteForm');
const tabelaClientes = document.getElementById('tabelaClientes');
const corpoTabela = document.getElementById('corpoTabela');

const clientes = [];

clienteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  adicionarCliente();
});

function adicionarCliente() {
  const nome = document.getElementById('nome').value.trim();
  const documento = document.getElementById('documento').value.trim();
  const saldo = parseFloat(document.getElementById('saldo').value);

  if (nome !== '' && documento !== '' && !isNaN(saldo)) {
    const novoCliente = new ClienteBanco(nome, documento, saldo);
    clientes.push(novoCliente);
    exibirClientes();
    limparCampos();
  } 
  else {
    alert('Preencha todos os campos corretamente.');
  }
}

function exibirClientes() {
  
  while (corpoTabela.firstChild) {
    corpoTabela.removeChild(corpoTabela.firstChild);
  }

  clientes.forEach(cliente => {
    const novaLinha = document.createElement('tr');

    const nomeColuna = document.createElement('td');
    nomeColuna.textContent = cliente.nome;
    novaLinha.appendChild(nomeColuna);

    const documentoColuna = document.createElement('td');
    documentoColuna.textContent = cliente.documento;
    novaLinha.appendChild(documentoColuna);

    const saldoColuna = document.createElement('td');
    saldoColuna.textContent = `R$ ${cliente.saldo.toFixed(2)}`;
    novaLinha.appendChild(saldoColuna);

    const acoesColuna = document.createElement('td');

    const depositarBtn = document.createElement('button');
    depositarBtn.textContent = 'Depositar 100';
    depositarBtn.addEventListener('click', () => cliente.depositar());
    acoesColuna.appendChild(depositarBtn);

    const sacarBtn = document.createElement('button');
    sacarBtn.textContent = 'Sacar 100';
    sacarBtn.addEventListener('click', () => cliente.sacar());
    acoesColuna.appendChild(sacarBtn);

    novaLinha.appendChild(acoesColuna);

    corpoTabela.appendChild(novaLinha);
  });
}

function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('documento').value = '';
  document.getElementById('saldo').value = '';
}