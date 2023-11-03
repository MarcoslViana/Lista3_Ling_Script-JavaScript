const nomeEventoInput = document.querySelector('#nomeEvento');
const horaEventoInput = document.querySelector('#horaEvento');
const adicionarBtn = document.querySelector('#adicionarBtn');
const listaEventos = document.querySelector('#listaEventos');

let eventos = [];

adicionarBtn.addEventListener('click', function() {
  adicionarEvento();
});

function adicionarEvento() {
  const nomeEvento = nomeEventoInput.value.trim();
  const horaEvento = new Date(horaEventoInput.value);

  if (nomeEvento !== '' && !isNaN(horaEvento.getTime())) {
    const novoEvento = { nomeEvento, horaEvento };
    eventos.push(novoEvento);
    exibirEventos();
    limparCampos();
  } 
  else {
    alert('Por favor, preencha o nome do evento e a hora corretamente.');
  }
}

function exibirEventos() {    
  eventos.sort((a, b) => a.horaEvento - b.horaEvento);
  listaEventos.replaceChildren();
  
  eventos.forEach(evento => {
    const novoItem = document.createElement('li');
    novoItem.textContent = `${evento.nomeEvento} - ${formatarHora(evento.horaEvento)}`;
    listaEventos.appendChild(novoItem);
  });
}

function limparCampos() {
  nomeEventoInput.value = '';
  horaEventoInput.value = '';
}

function formatarHora(data) {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return new Intl.DateTimeFormat('pt-BR', options).format(data);
}