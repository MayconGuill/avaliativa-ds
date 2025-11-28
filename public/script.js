const api = "http://localhost:3031/tarefas";

function carregarTarefas() {
    fetch(api)
        .then(res => res.json())
        .then(tarefas => {
            const lista = document.querySelector("#listaTarefas");
            lista.innerHTML = "";

            tarefas.forEach(t => {
                lista.innerHTML += 
                `<div class="tarefa">
                        <b>${t.titulo}</b><br>
                        Data prevista: ${formatarData(t.data_prevista)}<br>
                        Status: <b>${t.status_atividade}</b>

                        <div class="botoes">
                            <button onclick="concluir(${t.id})">Concluir</button>
                            <button onclick="editar(${t.id}, '${t.titulo}', '${t.data_prevista}')">Editar</button>
                            <button onclick="excluir(${t.id})">Excluir</button>
                        </div>
                </div>`;
            });
        });
}

document.querySelector("#formTarefa").addEventListener("submit", e => {
    e.preventDefault();

    const titulo = document.querySelector("#titulo").value;
    const data_prevista = document.querySelector("#data_prevista").value;

    fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({titulo, data_prevista})
    }).then(() => {
        document.querySelector("#formTarefa").reset();
        carregarTarefas();
    });
});

document.querySelector("#ordenarData").addEventListener("click", () => {
    fetch(api)
        .then(res => res.json())
        .then(tarefas => {
            tarefas.sort((a, b) => new Date(a.data_prevista) - new Date(b.data_prevista));

            const lista = document.querySelector("#listaTarefas");
            lista.innerHTML = "";

            tarefas.forEach(t => {
                lista.innerHTML += 
                `<div class="tarefa">
                        <b>${t.titulo}</b><br>
                        Data prevista: ${formatarData(t.data_prevista)}<br>
                        Status: <b>${t.status_atividade}</b>

                        <div class="botoes">
                            <button onclick="concluir(${t.id})">Concluir</button>
                            <button onclick="editar(${t.id}, '${t.titulo}', '${t.data_prevista}')">Editar</button>
                            <button onclick="excluir(${t.id})">Excluir</button>
                        </div>
                </div>`;
            });
        });
});

function concluir(id) {
    fetch(`${api}/${id}/concluir`, { 
        method: "PUT" 
    }).then(() => carregarTarefas());
}

function excluir(id) {
    fetch(`${api}/${id}`, { 
        method: "DELETE" 
    }).then(() => carregarTarefas());
}

function editar(id, tituloAntigo, dataAntiga) {
    const titulo = prompt("Editar título:", tituloAntigo);
    const data_prevista = prompt("Editar data prevista:", formatarData(dataAntiga));

    if (!titulo || !data_prevista) return;

    fetch(`${api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, data_prevista })
    }).then(() => carregarTarefas());
}

function formatarData(dataBruta) {
    const data = new Date(dataBruta);
    return data.toISOString().split("T")[0];
}

carregarTarefas();