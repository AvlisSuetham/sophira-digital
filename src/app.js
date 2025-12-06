const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar EJS como view engine
app.set('view engine', 'ejs');

// Definir pasta das views
app.set('views', path.join(__dirname, '../views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Sessão para login
app.use(session({
  secret: 'painel-sophira-2025',
  resave: false,
  saveUninitialized: false
}));

// Middleware para proteger rotas
function protegerRota(req, res, next) {
  if (!req.session.logado) {
    return res.redirect('/admin/login');
  }
  next();
}

// ----------------------------
// ROTAS DO SITE PÚBLICO
// ----------------------------

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/contato', (req, res) => {
  res.render('lead', { query: req.query });
});

// Salvar lead em contatos.json
app.post('/enviar-lead', (req, res) => {
  const { nome, email, telefone, projeto, mensagem } = req.body;

  const lead = {
    nome,
    email,
    telefone,
    projeto,
    mensagem,
    data: new Date().toLocaleString("pt-BR")
  };

  const filePath = path.join(__dirname, '../public/contatos.json');

  let leads = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    if (fileData.trim() !== "") {
      leads = JSON.parse(fileData);
    }
  }

  leads.push(lead);
  fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

  res.redirect('/contato?sucesso=1#lead-form');
});

// ----------------------------
// ROTAS DO PAINEL ADMIN
// ----------------------------

// Tela de login
app.get('/admin/login', (req, res) => {
  if (req.session.logado) return res.redirect('/admin/dashboard');
  res.render('admin_login', { erro: req.query.erro });
});

// Processar login
app.post('/admin/login', (req, res) => {
  const { usuario, senha } = req.body;

  const loginFile = path.join(__dirname, '../public/login.json');
  const users = JSON.parse(fs.readFileSync(loginFile, 'utf8'));

  const userValid = users.find(
    u => u.usuario === usuario && u.senha === senha
  );

  if (!userValid) {
    return res.redirect('/admin/login?erro=1');
  }

  req.session.logado = true;
  req.session.usuario = userValid.usuario;

  res.redirect('/admin/dashboard');
});

// Dashboard admin
app.get('/admin/dashboard', protegerRota, (req, res) => {
  const contactsDir = path.join(__dirname, '../contacts');

  let contacts = [];

  if (fs.existsSync(contactsDir)) {
    const files = fs.readdirSync(contactsDir);

    contacts = files.map(file => {
      const content = fs.readFileSync(path.join(contactsDir, file), 'utf8');
      return JSON.parse(content);
    });
  }

  res.render('admin_dashboard', {
    usuario: req.session.usuario,
    contacts
  });
});

// Página que exibe os leads (somente administrador)
app.get('/admin/contacts', protegerRota, (req, res) => {
  const filePath = path.join(__dirname, '../public/contatos.json');
  let contacts = [];

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    if (raw !== "") contacts = JSON.parse(raw);
  }

  res.render('contacts', { contacts });
});

//Exclusão de Mensagens
app.post('/admin/contacts/delete', protegerRota, (req, res) => {
  try {
    let indices = req.body['delete[]'] || req.body.delete;

    // Nada selecionado
    if (!indices) {
      return res.redirect('/admin/contacts?msg=nothing');
    }

    // Normaliza: sempre virar array
    if (!Array.isArray(indices)) {
      indices = [indices];
    }

    // Converte strings para índices numéricos válidos
    indices = indices
      .map(i => parseInt(i, 10))
      .filter(i => !isNaN(i) && i >= 0);

    // Nenhum índice válido
    if (indices.length === 0) {
      return res.redirect('/admin/contacts?msg=invalid');
    }

    const filePath = path.join(__dirname, '../public/contatos.json');

    // Lê contatos atuais
    let contacts = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8').trim();
      if (raw !== '') contacts = JSON.parse(raw);
    }

    // Lista vazia ou corrompida
    if (!Array.isArray(contacts) || contacts.length === 0) {
      return res.redirect('/admin/contacts?msg=empty');
    }

    // Remove do último para o primeiro (para não deslocar índices)
    indices.sort((a, b) => b - a);

    for (const idx of indices) {
      if (idx >= 0 && idx < contacts.length) {
        contacts.splice(idx, 1);
      }
    }

    // Salva o arquivo atualizado
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    return res.redirect('/admin/contacts?deleted=1');

  } catch (err) {
    console.error("Erro ao excluir contatos:", err);
    return res.redirect('/admin/contacts?error=1');
  }
});

// Logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// ----------------------------
// INICIAR SERVIDOR
// ----------------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});