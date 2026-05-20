const apiUrl = "/tarefas";

const listaTarefas = document.getElementById("listaTarefas");
const contadorTarefas = document.getElementById("contadorTarefas");
const filtroInput = document.getElementById("filtro");
const tarefaForm = document.getElementById("tarefaForm");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");

let tarefas = [];

async function carregarTarefas() {
    try {
        const response = await fetch(apiUrl);
        tarefas = await response.json();
        renderizarTabela();
    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        listaTarefas.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">Erro ao carregar tarefas.</td>
            </tr>
        `;
    }
}

function renderizarTabela() {
    const filtro = filtroInput.value.toLowerCase();

    const tarefasFiltradas = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(filtro)
    );

    contadorTarefas.textContent = `${tarefasFiltradas.length} tarefa(s) cadastrada(s)`;

    if (tarefasFiltradas.length === 0) {
        listaTarefas.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">Nenhuma tarefa encontrada.</td>
            </tr>
        `;
        return;
    }

    listaTarefas.innerHTML = tarefasFiltradas.map(tarefa => `
        <tr>
            <td>#${tarefa.id}</td>
            <td>${tarefa.titulo}</td>
            <td>${tarefa.descricao}</td>
            <td>
                <span class="status ${tarefa.concluida ? "status-concluida" : "status-pendente"}">
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </span>
            </td>
            <td>
                <div class="actions">
                    <button class="action-btn" onclick="editarTarefa(${tarefa.id})">Editar</button>
                    <button class="action-btn" onclick="alternarStatus(${tarefa.id})">
                        ${tarefa.concluida ? "Reabrir" : "Concluir"}
                    </button>
                    <button class="action-btn delete" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                </div>
            </td>
        </tr>
    `).join("");
}

tarefaForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const titulo = tituloInput.value.trim();
    const descricao = descricaoInput.value.trim();

    if (!titulo || !descricao) {
        alert("Preencha todos os campos.");
        return;
    }

    const novaTarefa = {
        titulo: titulo,
        descricao: descricao,
        concluida: false
    };

    try {
        await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaTarefa)
        });

        tarefaForm.reset();
        await carregarTarefas();
    } catch (error) {
        console.error("Erro ao cadastrar tarefa:", error);
        alert("Não foi possível cadastrar a tarefa.");
    }
});

async function alternarStatus(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    const tarefaAtualizada = {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        concluida: !tarefa.concluida
    };

    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefaAtualizada)
        });

        await carregarTarefas();
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        alert("Não foi possível atualizar o status.");
    }
}

async function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    const novoTitulo = prompt("Novo título:", tarefa.titulo);
    if (novoTitulo === null) return;

    const novaDescricao = prompt("Nova descrição:", tarefa.descricao);
    if (novaDescricao === null) return;

    const tarefaAtualizada = {
        titulo: novoTitulo.trim(),
        descricao: novaDescricao.trim(),
        concluida: tarefa.concluida
    };

    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefaAtualizada)
        });

        await carregarTarefas();
    } catch (error) {
        console.error("Erro ao editar tarefa:", error);
        alert("Não foi possível editar a tarefa.");
    }
}

async function excluirTarefa(id) {
    const confirmar = confirm("Deseja realmente excluir esta tarefa?");
    if (!confirmar) return;

    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        await carregarTarefas();
    } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Não foi possível excluir a tarefa.");
    }
}

filtroInput.addEventListener("input", renderizarTabela);

carregarTarefas();