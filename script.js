let myNodelist = document.getElementsByTagName("li");
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("X"); //caracter x
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    }
}

let list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function addElemento() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("tarefa").value;
    

    const dataAtual = new Date();
    const dia = dataAtual.getDate(); // Dia do mês (1-31)
    const mes = dataAtual.getMonth() + 1; // Mês (0-11, janeiro é 0, então somamos 1)
    const ano = dataAtual.getFullYear();

    const diaFormatado = dia.toString().padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
    const mesFormatado = mes.toString().padStart(2, '0'); // Garantir que o dia tenha 2 dígitos

    const data = `${diaFormatado}/${mesFormatado}/${ano} - `;

    let t = document.createTextNode(data + inputValue);
    li.appendChild(t);
    li.classList.add("novo-item");
    li.style.fontFamily = 'Arial';
    if (inputValue === '') {
        alert("Você precisa descrever a tarefa");
    } else {
        document.getElementById("itemLista").appendChild(li);
    }
    document.getElementById("tarefa").value = "";
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addElemento();
    }
}

const listItems = document.querySelectorAll('li');
const newFontFamily = 'Arial';

listItems.forEach(item => {
    item.style.fontFamily = newFontFamily;
});


function limpaLista() {
    let itemLista = document.getElementById('itemLista');
    while (itemLista.firstChild) {
        itemLista.removeChild(itemLista.firstChild);
    }
}