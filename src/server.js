const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar EJS como view engine
app.set('view engine', 'ejs');

// Definir pasta das views relativamente ao src/
app.set('views', path.join(__dirname, '../views'));

// Debug
console.log("➡️ __dirname:", __dirname);
console.log("➡️ Public path:", path.join(__dirname, '../public'));
console.log("➡️ Views path:", path.join(__dirname, '../views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('index'); // Renderiza index.ejs
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});