// Verifica se a página foi recarregada
var recarregou = sessionStorage.getItem("recarregou");
if (recarregou) {
  sessionStorage.removeItem("recarregou"); // Remove a variável
  carregarAoAtualizar(); // Execute sua função aqui
}

// Define a variável no sessionStorage antes de recarregar a página
sessionStorage.setItem("recarregou", "true");

function carregarAoAtualizar() {
  // Obter as tarefas do localStorage
  const storedTasks = localStorage.getItem("tarefas");
  const tarefas = JSON.parse(storedTasks) || [];

  document.getElementById("itemLista").innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    adicionarItemNaLista(tarefa.data, tarefa.descricao, index);
  });

  attachCloseEvent();
}

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function addElemento() {
  const inputValue = document.getElementById("tarefa").value;

  const dataAtual = new Date();
  const dia = dataAtual.getDate().toString().padStart(2, "0"); // Dia do mês (1-31)
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, "0"); // Mês (0-11, janeiro é 0, então somamos 1)
  const ano = dataAtual.getFullYear();
  const data = `${dia}/${mes}/${ano} - `;

  if (inputValue.trim() === "") {
    alert("Você precisa descrever a tarefa");
    return;
  }

  const novaTarefa = {
    data: data,
    descricao: inputValue,
  };

  tarefas.push(novaTarefa);
  saveToLocalStorage();
  adicionarItemNaLista(data, inputValue, tarefas.length - 1);
  document.getElementById("tarefa").value = "";
}

function adicionarItemNaLista(data, descricao, index) {
  let li = document.createElement("li");
  let t = document.createTextNode(data + descricao);
  li.appendChild(t);
  li.classList.add("novo-item");
  li.style.fontFamily = "Arial";
  document.getElementById("itemLista").appendChild(li);

  addCloseButton(li, index);
}

function addCloseButton(li, index) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("X");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function () {
    let div = this.parentElement;
    div.style.display = "none";
    removeFromLocalStorage(index);
  };
}

function attachCloseEvent() {
  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
      removeFromLocalStorage(i);
    };
  }
}

function removeFromLocalStorage(index) {
  tarefas.splice(index, 1);
  saveToLocalStorage();
  recarregarLista();
}

function saveToLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function recarregarLista() {
  let itemLista = document.getElementById("itemLista");
  while (itemLista.firstChild) {
    itemLista.removeChild(itemLista.firstChild);
  }
  carregarAoAtualizar();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addElemento();
  }
}

function limpaLista() {
  let itemLista = document.getElementById("itemLista");
  while (itemLista.firstChild) {
    itemLista.removeChild(itemLista.firstChild);
  }
  tarefas = [];
  saveToLocalStorage();
}

// Inicialização
document.addEventListener("DOMContentLoaded", carregarAoAtualizar);
