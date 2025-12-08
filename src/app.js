const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const multer = require('multer');
const AdmZip = require('adm-zip');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar EJS como view engine
app.set('view engine', 'ejs');
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
app.get("/", (req, res) => {
    const routesPath = path.join(__dirname, "../config/routes.json");

    let produtos = [];

    try {
        produtos = JSON.parse(fs.readFileSync(routesPath, "utf8"));
    } catch (err) {
        console.log("Erro ao ler routes.json:", err);
    }

    // embaralha
    produtos = produtos.sort(() => Math.random() - 0.5);

    // pega até 3 (se tiver 1: pega 1 — se tiver 2: pega 2)
    const destaque = produtos.slice(0, 3);

    res.render("home", { destaque });
});

app.get('/contato', (req, res) => res.render('lead', { query: req.query }));

// Salvar lead em contatos.json
app.post('/enviar-lead', (req, res) => {
  const { nome, email, telefone, projeto, mensagem } = req.body;
  const lead = { nome, email, telefone, projeto, mensagem, data: new Date().toLocaleString("pt-BR") };

  const filePath = path.join(__dirname, '../public/contatos.json');
  let leads = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    if (raw !== '') leads = JSON.parse(raw);
  }

  leads.push(lead);
  fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

  res.redirect('/contato?sucesso=1#lead-form');
});

app.get('/produtos', (req, res) => {
  const rotasPath = path.join(__dirname, '../config/routes.json');

  let rotas = [];
  if (fs.existsSync(rotasPath)) {
    const raw = fs.readFileSync(rotasPath, 'utf8').trim();

    if (raw !== '') {
      try {
        rotas = JSON.parse(raw);
      } catch (err) {
        console.error("Erro ao parsear routes.json:", err);
      }
    }
  }

  res.render('produtos', { rotas });
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
  const userValid = users.find(u => u.usuario === usuario && u.senha === senha);
  if (!userValid) return res.redirect('/admin/login?erro=1');

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

  res.render('admin_dashboard', { usuario: req.session.usuario, contacts });
});

// Página que exibe os leads (somente admin)
app.get('/admin/contacts', protegerRota, (req, res) => {
  const filePath = path.join(__dirname, '../public/contatos.json');
  let contacts = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    if (raw !== '') contacts = JSON.parse(raw);
  }
  res.render('contacts', { contacts });
});

// Exclusão de mensagens
app.post('/admin/contacts/delete', protegerRota, (req, res) => {
  try {
    let indices = req.body['delete[]'] || req.body.delete;
    if (!indices) return res.redirect('/admin/contacts?msg=nothing');
    if (!Array.isArray(indices)) indices = [indices];
    indices = indices.map(i => parseInt(i, 10)).filter(i => !isNaN(i) && i >= 0);
    if (indices.length === 0) return res.redirect('/admin/contacts?msg=invalid');

    const filePath = path.join(__dirname, '../public/contatos.json');
    let contacts = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8').trim();
      if (raw !== '') contacts = JSON.parse(raw);
    }
    if (!Array.isArray(contacts) || contacts.length === 0) return res.redirect('/admin/contacts?msg=empty');

    indices.sort((a, b) => b - a);
    for (const idx of indices) if (idx >= 0 && idx < contacts.length) contacts.splice(idx, 1);

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
// FUNÇÃO PARA IMPORTAR PÁGINAS
// ----------------------------
function importarPagina(zipFilePath, nomePagina, displayName) {
  const destDir = path.join(__dirname, '../public/products', nomePagina);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  // Descompacta ZIP
  const zip = new AdmZip(zipFilePath);
  zip.extractAllTo(destDir, true);

  // Caminho para thumb.jpg na raiz da pasta da página
  const thumbPath = path.join(destDir, 'thumb.jpg');
  // Se não existir thumb, você pode criar uma padrão ou ignorar
  if (!fs.existsSync(thumbPath)) {
    // opcional: criar thumb padrão
    fs.copyFileSync(path.join(__dirname, '../public/default-thumb.jpg'), thumbPath);
  }

  const routesPath = path.join(__dirname, '../config/routes.json');
  let rotas = [];
  if (fs.existsSync(routesPath)) {
    const raw = fs.readFileSync(routesPath, 'utf8').trim();
    if (raw !== '') rotas = JSON.parse(raw);
  }

  const novaRota = {
    method: 'get',
    path: `/products/${nomePagina}`,
    view: `products/${nomePagina}/index.html`,
    name: displayName,
    thumb: `products/${nomePagina}/thumb.jpg`
  };

  if (!rotas.find(r => r.path === novaRota.path)) {
    rotas.push(novaRota);
    fs.writeFileSync(routesPath, JSON.stringify(rotas, null, 2));
    console.log(`Rota /products/${nomePagina} registrada!`);
  } else {
    console.log(`Rota /products/${nomePagina} já existe.`);
  }
}

// ----------------------------
// UPLOAD DE ZIP
// ----------------------------
const upload = multer({ dest: 'uploads/' });

app.get('/admin/importar', protegerRota, (req, res) => res.render('importar', { msg: null }));

app.post('/admin/importar', protegerRota, upload.single('zipfile'), (req, res) => {
  const nomePagina = req.body.nomePagina;
  const displayName = req.body.displayName;
  if (!req.file || !nomePagina || !displayName) 
    return res.render('importar', { msg: 'Informe nome da pasta, nome de exibição e um arquivo ZIP.' });

  try {
    importarPagina(req.file.path, nomePagina, displayName);
    fs.unlinkSync(req.file.path);
    res.render('importar', { msg: `Página "${displayName}" importada com sucesso!` });
  } catch (err) {
    console.error(err);
    res.render('importar', { msg: `Erro ao importar a página: ${err.message}` });
  }
});

// ----------------------------
// CARREGAR ROTAS DINÂMICAS
// ----------------------------
const routesPath = path.join(__dirname, '../config/routes.json');

function carregarRotasDinamicas() {
  if (!fs.existsSync(routesPath)) return;
  const raw = fs.readFileSync(routesPath, 'utf8').trim();
  if (raw === '') return;

  let rotas = [];
  try {
    rotas = JSON.parse(raw);
  } catch {
    console.error('Erro ao ler routes.json: JSON inválido');
    return;
  }

  rotas.forEach(r => {
    app[r.method](r.path, (req, res) => {
      const htmlPath = path.join(__dirname, '../public', r.view);
      res.sendFile(htmlPath);
    });
  });
}

carregarRotasDinamicas();

// ----------------------------
// INICIAR SERVIDOR
// ----------------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
