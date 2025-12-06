Sophira Digital

Projeto: Sophira Digital — landing, captura de leads e painel administrativo simples
Autor: Matheus
Linguagem: Node.js (Express) + EJS
Status: Protótipo / MVP (uso local ou testes). Não recomendado em produção sem melhorias de segurança.

🔎 Visão geral

Sophira Digital é um site/landing page para captura de leads com:

formulário público que grava leads em public/contatos.json

mensagem de sucesso exibida após envio (/contato?sucesso=1#lead-form)

painel administrativo simples com login (dados em public/login.json)

dashboard administrativo com links para funções (hub)

página de listagem de contatos com visualização em modal e exclusão em lote

views EJS, CSS e scripts JS básicos para animações e comportamentos

Observação importante: por simplicidade os dados (usuários e leads) são armazenados em arquivos JSON no servidor. Isso não é adequado para produção. Recomenda-se migrar para um banco de dados (Postgres / MySQL / MongoDB) e usar hashing de senhas.

📁 Estrutura do projeto (resumida)
/project-root
├─ src/
│  └─ app.js                # Servidor Express (rotas e lógica)
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
│  ├─ contatos.json         # arquivo onde leads são salvos (gerado em runtime)
│  └─ login.json            # usuários do painel (ex.: admin/admin)
├─ data/ (opcional sugerido)
├─ package.json
└─ README.md

⚙️ Dependências principais

node >= 14 (recomendado)

express

ejs

express-session

(fs, path — módulos nativos do Node)

Exemplo de package.json (trecho relevante):

"dependencies": {
  "express": "^4.x",
  "ejs": "^3.x",
  "express-session": "^1.x"
}


Instalação:

npm install


Start (assumindo script start em package.json):

npm start
# ou
node src/app.js

🛣️ Rotas e comportamento
Públicas

GET / — página principal (views/home.ejs)

GET /contato — página do formulário de lead (views/lead.ejs)

POST /enviar-lead — recebe o form, salva em public/contatos.json, redireciona para /contato?sucesso=1#lead-form

Comportamento do envio: o servidor acrescenta um objeto lead com { nome, email, telefone, projeto, mensagem, data } a um array no public/contatos.json.

Admin / Painel

GET /admin/login — tela de login (view admin_login.ejs)

POST /admin/login — autentica usando public/login.json, cria sessão e redireciona para /admin/dashboard

GET /admin/dashboard — hub administrativo (admin_dashboard.ejs) — protegido

GET /admin/contacts — lista contatos (view contacts.ejs) — protegido

POST /admin/contacts/delete — recebe delete[] (índices) e remove itens de public/contatos.json — protegido

GET /admin/logout — encerra sessão

Nota: Rotas administrativas usam middleware protegerRota que verifica req.session.logado.

📄 Arquivos JSON de exemplo

public/login.json

[
  { "usuario": "admin", "senha": "admin" },
  { "usuario": "matheus", "senha": "sophira2025" },
  { "usuario": "editor", "senha": "studio123" }
]


public/contatos.json (exemplo)

[
  {
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "11999999999",
    "projeto": "LandingPage",
    "mensagem": "Quero um site minimalista",
    "data": "06/12/2025 15:20:30"
  }
]

🧩 Como funciona a exclusão em lote (fluxo)

Admin abre /admin/contacts.

Clica em Selecionar para excluir → checkboxes aparecem.

Marca os contatos que deseja excluir (cada checkbox tem value=index do array).

Clica em Excluir Selecionados → formulário POST para /admin/contacts/delete.

Backend recebe delete[] (array de índices), ordena índices em ordem decrescente e splice cada um do array carregado, escreve contatos.json atualizado.

Observação: é crítica a correspondência do índice da view com a ordem do array em JSON; se outro processo alterar o arquivo simultaneamente pode haver descompasso.

🛡️ Segurança e melhorias recomendadas

Nunca deixe usuários e senhas em texto plano em produção. Use hashing (bcrypt) e um DB seguro.

Mover arquivos de dados (contatos.json, login.json) para fora de public/ (por ex. /data) para não expô-los publicamente.

Usar HTTPS e variáveis de ambiente para segredos (ex.: SESSION_SECRET).

Substituir armazenamento em JSON por um banco de dados (SQLite/Postgres/Mongo).

Implementar proteção CSRF para rotas de escrita (forms) em produção.

Implementar controle de permissões/roles (admin/editor).

Tratar concorrência em escrita de arquivo (locks) ou usar DB transacional.

Validar e sanitizar os dados do formulário para evitar injeção.

🧰 Solução de problemas (erros comuns)

Failed to lookup view "login" in views directory
-> Verifique nome do arquivo views/admin_login.ejs (ou login.ejs se for o nome usado). res.render('admin_login') deve corresponder ao filename.

req is not defined no EJS
-> Ao renderizar passe apenas o que precisa: res.render('lead', { query: req.query }) e no EJS use query.sucesso.

JSON não é criado/escrito

Verifique permissões de escrita na pasta.

Caminho de filePath deve ser correto (com base em __dirname).

Recomenda-se usar /data/contatos.json fora de public/.

Verifique erros de parse: arquivo corrompido causa falha em JSON.parse.

Login sempre falha

Verifique nomes dos campos do formulário (name="usuario" e name="senha").

Adicione console.log(req.body) temporariamente para ver o que está sendo enviado.

Verifique o conteúdo de public/login.json e o caminho do arquivo.

✅ Boas práticas de desenvolvimento

Colocar contatos.json em /data e atualize app.js com path.join(__dirname, '../data/contatos.json')

Manter SESSION_SECRET em .env e usar process.env.SESSION_SECRET

Adicionar helmet, rate-limit e express-validator para segurança

Adicionar testes automatizados para rotas críticas

📦 Scripts sugeridos (package.json)
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}

✨ Próximos passos / ideias de evolução

Migrar armazenamento para banco de dados (MongoDB/Postgres)

Painel com autenticação JWT e API REST

Dashboard com filtros, busca, exportar CSV

Integração com e-mail (nodemailer) e notificações (WhatsApp)

Proteção por rota com permissões por role

📜 Licença

MIT — use livremente, com créditos ao autor.
