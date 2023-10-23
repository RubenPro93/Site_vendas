// Importa o módulo "express" que é um framework para construir aplicações web em Node.js
const express = require('express')

// Importa o módulo "cors" que é um middleware para habilitar CORS (Cross-Origin Resource Sharing)
var cors = require('cors')

// Cria uma nova aplicação express
var app = express()

// Importa a função "databaseRepo" do módulo "dbrepo"
var dbRepo = require('./db-repo').databaseRepo();

// Importa o módulo "body-parser" que é um middleware para parsear o corpo das requisições HTTP
const bodyParser = require('body-parser');

// Define a porta na qual a aplicação vai rodar
const port = 3000

// Adiciona o middleware CORS à cadeia de middlewares da aplicação
app.use(cors())

// Adiciona o middleware body-parser à cadeia de middlewares da aplicação para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

app.post('/addProduct', (req, res) => {
    // Obtém o novo produto enviado no corpo da requisição
    const newProduct = req.body;
  
    // Chama o método "insertProduct" do objeto "dbRepo" para adicionar o novo produto à base de dados
    const addedProduct = dbRepo.insertProduct(newProduct);
  
    // Verifica se o produto foi adicionado com sucesso
    if (addedProduct) {
      res.send('OK'); // Envie uma resposta de sucesso
    } else {
      res.send('NOK'); // Envie uma resposta de falha
    }
  });

// Define um roteador para tratar requisições POST na rota "/deleteProduct"
app.post('/deleteProduct', (req, res) => {
  // Lê o id do produto a ser deletado do corpo da requisição
  let id = req.body.id;

  // Chama a função "deleteProduct" do objeto "dbRepo" para deletar o produto
  var result = dbRepo.deleteProduct(id)

  // Envia a resposta "OK" se o produto foi deletado com sucesso, ou "NOK" caso contrário
  res.send(result ? 'OK' : 'NOK');
})

app.post('/updateProduct', (req, res) => {
    // Obtém o produto atualizado enviado no corpo da requisição
    const updatedProduct = req.body;
  
    // Chama o método "updateProduct" do objeto "dbRepo" para atualizar o produto na base de dados
    const updated = dbRepo.updateProduct(updatedProduct);
  
    // Verifica se o produto foi atualizado com sucesso
    if (updated) {
      res.send('OK'); // Envie uma resposta de sucesso
    } else {
      res.send('NOK'); // Envie uma resposta de falha
    }
  });


// Define um roteador para tratar requisições GET na rota "/products"
app.get('/products', (req, res) => {
  // Envia a lista de produtos como resposta
  res.send(dbRepo.listProducts())
});


// Faz a aplicação começar a escutar requisições na porta definida
app.listen(port, () => {
  // Imprime uma mensagem no console quando a aplicação começa a escutar na porta
  console.log(`App listening on port ${port}`)
})


