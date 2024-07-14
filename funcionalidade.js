const inputTarefa = document.querySelector('.inputTarefa');
const botaoTarefa = document.querySelector('.botaoTarefa');
const tarefa = document.querySelector('.tarefa');

// Adicionando a tarefa quando o botão 'adicionar tarefa' é clicado
botaoTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return; // Verificando se o usuário digitou algo no input
    criaTarefa(inputTarefa.value);
    salvarTarefas();
});

// Adicionando a tarefa quando a tecla Enter é pressionada
inputTarefa.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (!inputTarefa.value) return; // Verificando se o usuário digitou algo no input
        criaTarefa(inputTarefa.value);
        salvarTarefas();
    }
});

// Criando uma lista ordenada
function criaLi() {
    return document.createElement('li');
}

// Limpando o input quando o usuário adiciona uma tarefa e colocando o foco nele
function limparEColocarFocusNoInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

// Criando botão para apagar as tarefas adicionadas
function botaoApagar(li) {
    li.innerText += '  ';
    const apagar = document.createElement('button');
    apagar.innerText = 'apagar';
    apagar.setAttribute('class', 'apagar'); // Atribuindo uma class chamada apagar no botão

    // Adicionando um título: botão de apagar. Quando o usuário passar o mouse por cima, a mensagem é exibida
    apagar.setAttribute('title', 'botão de apagar');
    li.appendChild(apagar);
}

// Expressão que exibe o elemento que foi clicado. Vamos usar para apagar a tarefa adicionada
document.addEventListener('click', function (e) {
    const el = e.target; // Exibe o elemento no console
    console.log(el);

    // Se o elemento clicado possuir a classe 'apagar'
    if (el.classList.contains('apagar')) {
        console.log('apagar foi clicado');
        console.log(el.parentElement); // Verificando o pai do elemento com a classe apagar
        el.parentElement.remove();
        salvarTarefas();
    }
});

// Salvando as tarefas adicionadas mesmo após o usuário fechar o navegador
function salvarTarefas() {
    const liTarefas = tarefa.querySelectorAll('li');
    const listaDeTarefas = [];
    for (let tarefa of liTarefas) { // Iterando sobre as tarefas adicionadas e o botão apagar
        let tarefaTexto = tarefa.innerText;
        // replace substitui elementos por outros
        tarefaTexto = tarefaTexto.replace('apagar', ' '); // Substitui apagar por ' '
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON); // localStorage é global do navegador
}

// Agora vamos criar uma função que vai recarregar as tarefas adicionadas quando você entrar no site novamente
function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    if (tarefas) {
        const listaDeTarefas = JSON.parse(tarefas);
        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
        }
    }
}

adicionaTarefasSalvas();

// Adicionando a tarefa no HTML
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefa.appendChild(li);
    limparEColocarFocusNoInput();
    botaoApagar(li);
}