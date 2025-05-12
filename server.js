const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// Exemplo de rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
