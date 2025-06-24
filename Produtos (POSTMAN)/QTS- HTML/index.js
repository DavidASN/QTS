const express = require('express')
const env = require('dotenv')

//Cliente
const {buscarClientes, buscarCliente} = require('./src/DAO/cliente/buscar_cliente.js')
const {incluirCliente} = require('./src/DAO/cliente/inserir_cliente.js')
const { deletarCliente } = require('./src/DAO/cliente/deletar_cliente.js')
const { editarParcialmenteCliente } = require('./src/DAO/cliente/editar_parcialmente_cliente.js')
const { editarIntegralmenteCliente } = require('./src/DAO/cliente/editar_integralmente_cliente.js')

//Produtos
const {buscarProdutos, buscarProduto} = require('./src/DAO/produtos/buscar_produto.js')
const {incluirProduto} = require('./src/DAO/produtos/inserir_produto.js')
const { deletarProduto } = require('./src/DAO/produtos/deletar_produto.js')
const { editarParcialmenteProduto } = require('./src/DAO/produtos/editar_parcialmente_produto.js')
const { editarIntegralmenteProduto } = require('./src/DAO/produtos/editar_integralmente_produto.js')

//Categoria
const { buscarCategorias, buscarCategoria } = require('./src/DAO/categoria/buscar_categoria.js')
const { incluirCategoria } = require('./src/DAO/categoria/inserir_categoria.js')
const { deletarCategoria } = require('./src/DAO/categoria/deletar_categoria.js')
const { editarParcialmenteCategoria } = require('./src/DAO/categoria/editar_parcialmente_categoria.js')
const { editarIntegralmenteCategoria } = require('./src/DAO/categoria/editar_integralmente_categoria.js')

//Endereco
const { buscarEnderecos, buscarEndereco } = require('./src/DAO/endereco/buscar_endereco.js')
const { incluirEndereco } = require('./src/DAO/endereco/inserir_endereco.js')
const { deletarEndereco } = require('./src/DAO/endereco/deletar_endereco.js')
const { editarParcialmenteEndereco } = require('./src/DAO/endereco/editar_parcialmente_endereco.js')
const { editarIntegralmenteEndereco } = require('./src/DAO/endereco/editar_integralmente_endereco.js')

// Pedido
const { buscarPedidos, buscarPedido } = require('./src/DAO/pedido/buscar_pedido.js')
const { incluirPedido } = require('./src/DAO/pedido/inserir_pedido.js')
const { deletarPedido } = require('./src/DAO/pedido/deletar_pedido.js')
const { editarParcialmentePedido } = require('./src/DAO/pedido/editar_parcialmente_pedido.js')
const { editarIntegralmentePedido } = require('./src/DAO/pedido/editar_integralmente_pedido.js')

// Status
const { buscarStatus, buscarStatusId } = require('./src/DAO/status/buscar_status.js')
const { incluirStatus } = require('./src/DAO/status/inserir_status.js')
const { deletarStatus } = require('./src/DAO/status/deletar_status.js')
const { editarParcialmenteStatus } = require('./src/DAO/status/editar_parcialmente_status.js')
const { editarIntegralmenteStatus } = require('./src/DAO/status/editar_integralmente_status.js')

// ItemPedido
const { buscarItensPedido, buscarItemPedido } = require('./src/DAO/itemPedido/buscar_itemPedido.js')
const { incluirItemPedido } = require('./src/DAO/itemPedido/inserir_itemPedido.js')
const { deletarItemPedido } = require('./src/DAO/itemPedido/deletar_itemPedido.js')
const { editarParcialmenteItemPedido } = require('./src/DAO/itemPedido/editar_parcialmente_itemPedido.js')
const { editarIntegralmenteItemPedido } = require('./src/DAO/itemPedido/editar_integralmente_itemPedido.js')

const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')


const app = express()
env.config()

app.use(
    express.urlencoded({
        extended: true
    })
  )
  
  app.use(express.json())
  


app.get('/', (req, res) => {
  res.send('Hello World')
})


//CLIENTE

app.get('/firma/1.0.0/clientes', async (req, res) =>{
    
    let clientes = await buscarClientes()
    res.json(clientes)
})

app.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let cliente = await buscarCliente(codigo)
    res.json(cliente)
})

app.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
   let result = await incluirCliente(infos)
    res.json(result)
})

app.put('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [telefone, nome, limite, id_endereco, id_status]
    let result = await editarIntegralmenteCliente(infos, codigo)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, campo, valor } = req.body
    let result = await editarParcialmenteCliente(codigo, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/cliente', async (req, res) =>{
    let { codigo } = req.body
    let result = await deletarCliente(codigo)
    res.json(result)
})


//PRODUTOS

app.get('/firma/1.0.0/produtos', async (req, res) =>{
    
    let produtos = await buscarProdutos()
    res.json(produtos)
})

app.get('/firma/1.0.0/produto/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let produto = await buscarProduto(codigo)
    res.json(produto)
})

app.post('/firma/1.0.0/produto', async (req, res) =>{
    let {codigo,nome, id_categoria, preco} = req.body
    const infos = [codigo,nome, id_categoria, preco]
   let result = await incluirProduto(infos)
    res.json(result)
})

app.put('/firma/1.0.0/produto', async (req, res) =>{
    let {codigo,nome, id_categoria, preco} = req.body
    const infos = [nome, id_categoria, preco]
    let result = await editarIntegralmenteProduto(infos, codigo)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/produto', async (req, res) =>{
    let {codigo, campo, valor } = req.body
    let result = await editarParcialmenteProduto(codigo, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/produto', async (req, res) =>{
    let { codigo } = req.body
    let result = await deletarProduto(codigo)
    res.json(result)
})

//CATEGORIA

app.get('/firma/1.0.0/categorias', async (req, res) =>{
    
    let categorias = await buscarCategorias()
    res.json(categorias)
})


app.get('/firma/1.0.0/categoria/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let categoria = await buscarCategoria(id)
    res.json(categoria)
})

app.post('/firma/1.0.0/categoria', async (req, res) => {
    let { id, nome } = req.body
    const infos = [id, nome]
    let result = await incluirCategoria(infos)
    res.json(result)
})

app.put('/firma/1.0.0/categoria', async (req, res) => {
    let { id, nome } = req.body
    let result = await editarIntegralmenteCategoria(nome, id)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/categoria', async (req, res) => {
    let { id, campo, valor } = req.body
    let result = await editarParcialmenteCategoria(id, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/categoria', async (req, res) => {
    let { id } = req.body
    let result = await deletarCategoria(id)
    res.json(result)
})

//ENDERECO
app.get('/firma/1.0.0/enderecos', async (req, res) => {
    let enderecos = await buscarEnderecos()
    res.json(enderecos)
})

app.get('/firma/1.0.0/endereco/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let endereco = await buscarEndereco(id)
    res.json(endereco)
})

app.post('/firma/1.0.0/endereco', async (req, res) => {
    let { id, logradouro, cep, numero, bairro, cidade } = req.body
    const infos = [id, logradouro, cep, numero, bairro, cidade]
    let result = await incluirEndereco(infos)
    res.json(result)
})

app.put('/firma/1.0.0/endereco', async (req, res) => {
    let { id, logradouro, cep, numero, bairro, cidade } = req.body
    const infos = [logradouro, cep, numero, bairro, cidade]
    let result = await editarIntegralmenteEndereco(infos, id)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/endereco', async (req, res) => {
    let { id, campo, valor } = req.body
    let result = await editarParcialmenteEndereco(id, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/endereco', async (req, res) => {
    let { id } = req.body
    let result = await deletarEndereco(id)
    res.json(result)
})

// PEDIDOS
app.get('/firma/1.0.0/pedidos', async (req, res) => {
    let pedidos = await buscarPedidos()
    res.json(pedidos)
})

app.get('/firma/1.0.0/pedido/:numero', async (req, res) => {
    let numero = parseInt(req.params.numero)
    let pedido = await buscarPedido(numero)
    res.json(pedido)
})

app.post('/firma/1.0.0/pedido', async (req, res) => {
    let { numero, data_elaboracao, cliente_id } = req.body
    const infos = [numero, data_elaboracao, cliente_id]
    let result = await incluirPedido(infos)
    res.json(result)
})

app.put('/firma/1.0.0/pedido', async (req, res) => {
    let { numero, data_elaboracao, cliente_id } = req.body
    const infos = [data_elaboracao, cliente_id]
    let result = await editarIntegralmentePedido(infos, numero)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/pedido', async (req, res) => {
    let { numero, campo, valor } = req.body
    let result = await editarParcialmentePedido(numero, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/pedido', async (req, res) => {
    let { numero } = req.body
    let result = await deletarPedido(numero)
    res.json(result)
})



// STATUS
app.get('/firma/1.0.0/status', async (req, res) => {
    let statusList = await buscarStatus()
    res.json(statusList)
})

app.get('/firma/1.0.0/status/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let status = await buscarStatusId(id)
    res.json(status)
})

app.post('/firma/1.0.0/status', async (req, res) => {
    let { id, nome } = req.body
    const infos = [id, nome]
    let result = await incluirStatus(infos)
    res.json(result)
})

app.put('/firma/1.0.0/status', async (req, res) => {
    let { id, nome } = req.body
    let result = await editarIntegralmenteStatus([nome], id)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/status', async (req, res) => {
    let { id, campo, valor } = req.body
    let result = await editarParcialmenteStatus(id, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/status', async (req, res) => {
    let { id } = req.body
    let result = await deletarStatus(id)
    res.json(result)
})

// ItemPedido

app.get('/firma/1.0.0/itemPedidos', async (req, res) => {
    let itensPedido = await buscarItensPedido()
    res.json(itensPedido)
})

app.get('/firma/1.0.0/itemPedido/:id/:id_pedido/:id_produto', async (req, res) => {
    let id = parseInt(req.params.id)
    let id_pedido = parseInt(req.params.id_pedido)
    let id_produto = parseInt(req.params.id_produto)
    let itemPedido = await buscarItemPedido(id, id_pedido, id_produto)
    res.json(itemPedido)
})

app.post('/firma/1.0.0/itemPedido', async (req, res) => {
    let { id, id_pedido, id_produto, qnt } = req.body
    const infos = [id, id_pedido, id_produto, qnt]
    let result = await incluirItemPedido(infos)
    res.json(result)
})

app.put('/firma/1.0.0/itemPedido', async (req, res) => {
    let { id, id_pedido, id_produto, qnt } = req.body
    const infos = [qnt]
    let result = await editarIntegralmenteItemPedido(infos, id, id_pedido, id_produto)
    res.status(200).json(result)
})

app.patch('/firma/1.0.0/itemPedido', async (req, res) => {
    let { id, id_pedido, id_produto, campo, valor } = req.body
    let result = await editarParcialmenteItemPedido(id, id_pedido, id_produto, campo, valor)
    res.status(200).json(result)
})

app.delete('/firma/1.0.0/itemPedido', async (req, res) => {
    let { id, id_pedido, id_produto } = req.body
    let result = await deletarItemPedido(id, id_pedido, id_produto)
    res.json(result)
})



app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})