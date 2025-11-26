const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/tarefas", (req, res) => {
    db.query(
        "SELECT * FROM tarefas ORDER BY id ASC", 
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
    });
});

app.post("/tarefas", (req, res) => {
    const {titulo, data_prevista} = req.body;

    if (!titulo || !data_prevista) return res.status(400).json({ msg: "Campos obrigatórios." });

    db.query(
        "INSERT INTO tarefas (titulo, data_prevista, status_atividade, criado_em) VALUES (?, ?, 'pendente', NOW())", [titulo, data_prevista],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, msg: "Tarefa criada!" });
        }
    );
});

app.put("/tarefas/:id", (req, res) => {
    const {id} = req.params;
    const {titulo, data_prevista} = req.body;

    db.query(
        "UPDATE tarefas SET titulo=?, data_prevista=? WHERE id=?", [titulo, data_prevista, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ msg: "Tarefa atualizada!" });
        }
    );
});

app.put("/tarefas/:id/concluir", (req, res) => {
    const {id} = req.params;

    db.query(
        "UPDATE tarefas SET status_atividade='concluida' WHERE id=?", [id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ msg: "Tarefa concluída!" });
        }
    );
});

app.delete("/tarefas/:id", (req, res) => {
    const {id} = req.params;

    db.query(
        "DELETE FROM tarefas WHERE id=?", [id], 
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ msg: "Tarefa removida!" });
    });
});

const PORT = 3031;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));