const express = require('express');
const app = express();
const PORTA = 3000;
const cadastroProdutos = require('./cadastro_produtos');

const produtos = [{id:1, nome: "Produto 1", preco: 30}];

app.use(express.json());

//Recurso: Produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
})

app.get('/produtos/:id', (req,res) => {
    const id = req.params.id;
    console.log("Get ID: ", id);
    res.json(produtos[0]);
})

app.post('/produtos', (req, res) => {
    //res.send("Cadastrar Produto");
    const produto = req.body;
    try {
        const produtoInserido = cadastroProdutos.inserir(produto);
        res.status(201).json(produtoInserido);
    }
    catch (err) {
        console.log(err)
        res.status(err.numero).json(err);
    }
})

app.put('/produtos/:id', (req,res) => {
    const id = req.params.id;
    console.log("UPDATE: ",id)
    res.json(produtos[0]);
})

app.delete('/produtos/:id', (req,res) => {
    const id = req.params.id;
    console.log("DELETE: ",id)
    res.json(produtos[0]);
})

app.listen(PORTA, () => {
    console.log("Servidor iniciado com sucesso...")
})