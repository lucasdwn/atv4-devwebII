 const express = require('express'); 
const route = express.Router(); 
const conn = require("../config/db") 
conn.insertTablePedido()
conn.insertTablesCliente()

route.post("/pedido", async (req,res) =>{
    try {
        const response = await conn.populationTabelPedido({
            pedido_nome: req.body.pedido_nome,
            pedido_preco: req.body.pedido_preco
        })
        res.json(response)
        console.log('Pedido cadastrado com sucesso!')
    } catch (error) {
        res.json(error)
        console.log('Erro ao cadastrar pedido' + error)
    }
});


route.get("/pedido", async (req, res) =>{
    try {
        const find = await conn.selectPedidos()
        res.json(find)
    } catch (error) {
        res.json(error)
    }
})

route.post("/cliente", async (req, res) =>{
    try {
        const response = await conn.populationTableCliente({
            cliente_nome: req.body.cliente_nome,
            fk_pedido_id: req.body.fk_pedido_id
        })
        res.json(response)
        console.log('Cliente Cadastrado com sucesso!')
    } catch (error) {
        res.json(error)
        console.log('Erro ao cadastrar cliente!' + error)
    }
});

route.get("/cliente", async (req, res) =>{
    try {
        const find = await conn.selectClientes()
        res.json(find)
    } catch (error) {
        res.json(error)
    }
})

route.put("/cliente/:cliente_id", async (req, res) => {
try {
    const { cliente_id } = req.params;
    const { cliente_nome } = req.body
    await conn.updateCliente(cliente_id, {cliente_nome})
    res.json(req.body)
    console.log("Cliente editado com sucesso!")
} catch (error) {
    res.json(error)
    console.log('Erro ao editar cliente!' + error)
}
})

route.delete("/cliente/:cliente_id", async (req, res) => {
    try {
        const { cliente_id } = req.params;
        const response = await conn.deleteCliente(cliente_id)
        res.json(response)
        console.log('Cliente deletado com sucesso!')
    } catch (error) {
        res.json(error)
        console.log('Erro ao deletar cliente!' + error)
    }
});

module.exports = {
    route
}