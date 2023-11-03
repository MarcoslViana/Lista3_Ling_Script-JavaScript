class Transacao {
  constructor(descricao, valor) {
    this.descricao = descricao;
    this.valor = valor;
  }
}

const transacaoForm = document.getElementById('transacaoForm');
const tabelaTransacoes = document.getElementById('tabelaTransacoes');
const corpoTabela = document.getElementById('corpoTabela');
const totalSaldo = document.getElementById('totalSaldo');

const transacoes = [];

transacaoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  adicionarTransacao();
});

function adicionarTransacao() {
  const descricao = document.getElementById('descricao').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);

  if (descricao !== '' && !isNaN(valor)) {
    const novaTransacao = new Transacao(descricao, valor);
    transacoes.push(novaTransacao);
    exibirTransacoes();
    limparCampos();
  } 
  else {
    alert('Por favor, preencha a descrição e o valor corretamente.');
  }
}

function exibirTransacoes() {
  
  while (corpoTabela.firstChild) {
    corpoTabela.removeChild(corpoTabela.firstChild);
  }

  let saldoTotal = 0;

  transacoes.forEach(transacao => {
    const novaLinha = document.createElement('tr');

    const descricaoColuna = document.createElement('td');
    descricaoColuna.textContent = transacao.descricao;
    novaLinha.appendChild(descricaoColuna);

    const valorColuna = document.createElement('td');
    valorColuna.textContent = formatarValor(transacao.valor);
    
    valorColuna.classList.add(transacao.valor >= 0 ? 'receita' : 'despesa');
    
    valorColuna.style.color = transacao.valor < 0 ? 'red' : 'green';

    novaLinha.appendChild(valorColuna);
    corpoTabela.appendChild(novaLinha);

    saldoTotal += transacao.valor;
  });

  const novaLinhaTotal = document.createElement('tr');
  const colunaTotal = document.createElement('td');
  colunaTotal.textContent = 'Total';
  novaLinhaTotal.appendChild(colunaTotal);

  const colunaSaldoTotal = document.createElement('td');
  colunaSaldoTotal.textContent = formatarValor(saldoTotal);
  novaLinhaTotal.appendChild(colunaSaldoTotal);

  corpoTabela.appendChild(novaLinhaTotal);
}

function limparCampos() {
  document.getElementById('descricao').value = '';
  document.getElementById('valor').value = '';
}

function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
