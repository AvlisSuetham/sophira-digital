const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

//Debug
console.log("➡️ __dirname:", __dirname);
console.log("➡️ Public path:", path.join(__dirname, '../public'));
console.log("➡️ Views path:", path.join(__dirname, '../views/index.html'));


// Arquivos estáticos (public)
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});