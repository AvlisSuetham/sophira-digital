🎵 Sophira Digital
Sistema de Landing Page, Captura de Leads e Painel Administrativo






Sophira Digital é um protótipo funcional de um sistema completo que inclui:

🌐 Landing page institucional

✉️ Formulário de envio de leads

📁 Armazenamento de contatos em arquivo JSON

🔐 Painel administrativo com login

🗂️ Listagem de contatos com modal detalhado

❌ Exclusão em lote de leads

🎨 Front-end leve e responsivo (HTML, CSS e JS)

Este projeto é ideal tanto para estudo quanto como base para sistemas simples de captura de clientes.

📂 Estrutura do Projeto
/
├─ src/
│  └─ app.js                 # Servidor Express + rotas
├─ views/
│  ├─ home.ejs
│  ├─ lead.ejs
│  ├─ contacts.ejs
│  ├─ admin_login.ejs
│  ├─ admin_dashboard.ejs
│  └─ partials/
│     ├─ header.ejs
│     └─ footer.ejs
├─ public/
│  ├─ css/
│  │  ├─ styles.css
│  │  ├─ contacts.css
│  │  └─ admin_dashboard.css
│  ├─ js/
│  │  └─ anim_lead.js
│  ├─ contatos.json          # Leads gravados
│  └─ login.json             # Usuários do painel
├─ package.json
└─ README.md

🛠️ Tecnologias Utilizadas

Node.js + Express

EJS (Template Engine)

Express-session

File System (fs) para persistência local

CSS puro para estilização

JavaScript Vanilla para interações

🚀 Instalação e Uso
1️⃣ Clone o repositório
git clone https://github.com/SEU_USUARIO/sophira-digital.git
cd sophira-digital

2️⃣ Instale as dependências
npm install

3️⃣ Inicie o servidor
npm start


O servidor rodará em:
👉 http://localhost:3000/

🔐 Login do Painel Administrativo

Arquivo: public/login.json

Exemplo padrão:

[
  { "usuario": "admin", "senha": "admin" },
  { "usuario": "matheus", "senha": "sophira2025" },
  { "usuario": "editor", "senha": "studio123" }
]


Acesse o painel:
👉 /admin/login

Após logar, você será redirecionado ao dashboard.

📬 Captura de Leads

Rota pública:

GET /contato – página com formulário

POST /enviar-lead – salva no arquivo public/contatos.json

Exemplo de lead salvo:

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "11999999999",
  "projeto": "Landing Page",
  "mensagem": "Quero um orçamento",
  "data": "06/12/2025 15:20:30"
}

📁 Painel de Contatos

Modal detalhado ao clicar em qualquer linha

Botão Selecionar para excluir

Exclusão em lote via POST /admin/contacts/delete

Interface limpa e responsiva

🔧 Melhorias Recomendadas (para produção)

Usar banco de dados verdadeiro (Postgres, MongoDB, SQLite)

Hash de senhas com bcrypt

Mover .json para /data fora do /public

Segurança extra:

Helmet

Rate limit

Sanitização e validação

CSRF protection

Logs estruturados (Winston)

🧩 Scripts no package.json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}

📌 Roadmap Futuro

API REST para leads

Dashboard com filtros e gráficos

Exportação para CSV

Upload de arquivos

Tema escuro

Controle de permissões (admin / editor)

📜 Licença

Este projeto é distribuído sob a licença MIT.
Use livremente, com créditos ao autor.

❤️ Autor

Desenvolvido por Matheus, com dedicação e visão para transformar a Sophira Digital em um ecossistema completo de software e soluções criativas.
