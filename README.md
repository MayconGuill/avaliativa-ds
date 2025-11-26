# 📋 Gerenciador de Tarefas

---

## 🎯 Objetivo da Atividade Avaliativa

Implementar um sistema simples que funcione via:

* Interface web no navegador (HTML + CSS + JavaScript)
* API em Node.js
* Persistência de dados em MySQL (com ordenação por data prevista)

---

## 🛠️ Tecnologias Utilizadas

* Front-end: HTML, CSS, JavaScript
* Back-end: NodeJs
* Cliente HTTP: Fetch API

---

## 📁 Estrutura do Projeto

```
/ (raiz)
│  README.md
│  package.json
│  server.js
│  /public
│    index.html
│    style.css
│    script.js
│  db.js
```

---

## 🚀 Funcionalidades Implementadas

O sistema permite:

1. Criar tarefas (título + data prevista)
2. Listar todas as tarefas cadastradas
3. Editar tarefas existentes
4. Marcar tarefa como concluída
5. Excluir tarefa
6. Ordenar tarefas por data prevista (mais próxima primeiro)

📌 Toda tarefa contém:

* `id`
* `titulo`
* `status_atividade` (pendente ou concluída)
* `criado_em`
* `data_prevista`

---

## ⚙️ Como Instalar

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Entre na pasta do projeto:

```bash
cd <NOME_DO_REPOSITORIO>
```

3. Instale as dependências:

```bash
npm install
```

---

## 🗄️ Configuração do Banco de Dados (MySQL)

No arquivo `db.js` o sistema se conecta ao banco local usando:

```js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '<SUA_SENHA>',
  database: 'taskflow'
});
module.exports = connection;
```

Crie a base e a tabela executando no MySQL:

```sql
CREATE DATABASE IF NOT EXISTS taskflow;
USE taskflow;

CREATE TABLE IF NOT EXISTS tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  data_prevista DATE NOT NULL,
  status_atividade ENUM('pendente', 'concluida') DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ▶️ Como Rodar

### 🖥️ Iniciar o servidor (API)

```bash
node server.js
```

✔️ O servidor será iniciado na porta **3031**.
✔️ O front-end já está configurado para consumir essa API.

### 🌐 Acessar no navegador

```
localhost:3031
```

---

## 🌍 Endpoints da API Disponíveis

Base URL: `http://localhost:3031`
URL: `http://localhost:3031/tarefas`
Json com lista de tarefas

---

## 🧪 Testes Manuais Recomendados

1. Criar 3 tarefas com datas diferentes e testar o botão **Ordenar por Data**
2. Concluir 1 tarefa e verificar se o status atualizou na interface
3. Editar 1 tarefa e recarregar a lista
4. Excluir 1 tarefa e confirmar remoção

---

## ✅ Critérios Atendidos da Atividade

| Requisito solicitado            | Status                                 |
| ------------------------------- | -------------------------------------- |
| Criar tarefas com título e data | ✔️ Implementado                        |
| Listar todas as tarefas         | ✔️ Implementado                        |
| Editar tarefa                   | ✔️ Implementado                        |
| Marcar como concluída           | ✔️ Implementado                        |
| Excluir tarefa                  | ✔️ Implementado                        |
| Ordenar por data prevista       | ✔️ Implementado                        |
| Persistência em MySQL           | ✔️ Conexão e queries implementadas     |

---

Feito com 💻 por **Maycon Rodrigues** para atividade avaliativa de desenvolvimento full-stack.
