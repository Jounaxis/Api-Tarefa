const apiUrl = "http://localhost:8080/tarefas";

async function listarTarefas() {
    const resposta = await fetch(apiUrl);
    const tarefas = await resposta.json();

    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const div = document.createElement("div");
        div.className = "tarefa";

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>${tarefa.descricao}</p>
            <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

            <button onclick="concluirTarefa(${tarefa.id}, '${tarefa.titulo}', '${tarefa.descricao}')">
                Concluir
            </button>

            <button onclick="deletarTarefa(${tarefa.id})">
                Deletar
            </button>
        `;

        lista.appendChild(div);
    });
}

async function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    const tarefa = {
        titulo: titulo,
        descricao: descricao,
        concluida: false
    };

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
    });

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";

    listarTarefas();
}

async function concluirTarefa(id, titulo, descricao) {
    const tarefa = {
        titulo: titulo,
        descricao: descricao,
        concluida: true
    };

    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
    });

    listarTarefas();
}

async function deletarTarefa(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    listarTarefas();
}

listarTarefas();