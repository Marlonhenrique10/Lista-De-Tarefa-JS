// let bancoDeDados = [
//     {'tarefa': 'Aprender JS', 'status': ''},
//     {'tarefa': 'Hunter Hunter', 'status': ''},    
// ];

const getBanco = () => JSON.parse(localStorage.getItem('listaTarefa')) ?? [];
const setBanco = (bancoDeDados) => localStorage.setItem('listaTarefa', JSON.stringify(bancoDeDados));

const adicionarItem = (tarefa, status, indice) => {

    const item = document.createElement('label');
    item.classList.add('lista-item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>        
        <input type="button" value="x" data-indice=${indice}>
    `
    
    document.getElementById('listaTarefa').appendChild(item);
}

const limparTela = () => {
    const listaTarefa = document.getElementById('listaTarefa');
    while(listaTarefa.firstChild) {
        listaTarefa.removeChild(listaTarefa.lastChild);
    }
}
const atualizarTela = () => {
    limparTela();
    const bancoDeDados = getBanco();
    bancoDeDados.forEach ((item, indice) => adicionarItem(item.tarefa, item.status, indice));
}

const criarNovaTarefa = (evento) => {
    const teclaClicado = evento.key;
    const texto = evento.target.value;
    if (teclaClicado === 'Enter') {
        const bancoDeDados = getBanco();
        bancoDeDados.push({'tarefa': texto, 'status': ''});
        setBanco(bancoDeDados);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const bancoDeDados = getBanco();
    bancoDeDados.splice(indice, 1);
    setBanco(bancoDeDados);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const bancoDeDados = getBanco();
    bancoDeDados[indice].status = bancoDeDados[indice].status == '' ? 'checked' : '';
    setBanco(bancoDeDados);
    atualizarTela(); 
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type == 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if(elemento.type == 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('novoItem').addEventListener('keypress', criarNovaTarefa);
document.getElementById('listaTarefa').addEventListener('click', clickItem);

atualizarTela();
