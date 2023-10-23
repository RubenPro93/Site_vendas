// Importa o módulo "fs" (file system) que permite interagir com o sistema de arquivos no nível de IO
const fs = require('fs')

// Exporta uma função chamada "databaseRepo"
exports.databaseRepo = function () {

    // Define o nome do arquivo JSON que será usado como banco de dados
    var dbNameProducts = 'database.json';

    // Declara uma função "readDb" que lê o arquivo JSON e retorna o seu conteúdo como um objeto JavaScript
    var readDb = function(dbName){
        var rawData = fs.readFileSync(dbName);
        return JSON.parse(rawData)
    };

    // Declara uma função "writeDb" que recebe um objeto JavaScript e escreve no arquivo JSON
    var writeDb = function(dbName, data){
        fs.writeFileSync(dbName, JSON.stringify(data, null, 2));
    };

    // Retorna um objeto com quatro métodos: insertProduct, updateProduct, deleteProduct e listProducts
    return {

        // Método para inserir um produto
        insertProduct: function(product){
            var dataJson = readDb(dbNameProducts); // lê o banco de dados
            dataJson.products.push(product); // insere o novo produto na lista de produtos
            writeDb(dbNameProducts, dataJson); // escreve a lista atualizada no banco de dados
            return product // retorna o produto inserido
        },

        // Método para atualizar um produto
        updateProduct: function(updatedProduct){
            var dataJson = readDb(dbNameProducts); // lê o banco de dados
            // procura o índice do produto a ser atualizado na lista de produtos
            var productIndex = dataJson.products.findIndex(x => x.id === updatedProduct.id);
            if (productIndex !== -1) { // se o produto foi encontrado
                dataJson.products[productIndex] = updatedProduct; // atualiza o produto
                writeDb(dbNameProducts, dataJson); // escreve a lista atualizada no banco de dados
            }
            return updatedProduct; // retorna o produto atualizado (mesmo que não tenha sido encontrado)
        },

        // Método para deletar um produto
        deleteProduct: function(id){
            var dataJson = readDb(dbNameProducts); // lê o banco de dados
            // cria uma nova lista que não inclui o produto a ser deletado
            dataJson.products = dataJson.products.filter(x => x.id != id);
            writeDb(dbNameProducts, dataJson); // escreve a lista atualizada no banco de dados
            return true; // retorna true para indicar sucesso
        },

        // Método para listar todos os produtos
        listProducts: function(){
            // lê o banco de dados e retorna a lista de produtos
            return readDb(dbNameProducts).products
        }
    }
};
