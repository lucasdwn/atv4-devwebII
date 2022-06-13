const mysql = require("mysql2/promise");
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'crud',
        password: ''
    });
    console.log('conectou ao mysql');
    global.connection = connection
    return global.connection;
}

console.log();
console.log("Criando Tabela de Pedidos");
async function insertTablePedido() {
    const conn = await connect();
    await conn.query(`CREATE TABLE Pedidos ( 
        pedido_id INT NOT NULL AUTO_INCREMENT,
        pedido_nome VARCHAR(100),
        pedido_preco FLOAT(10,2),
        PRIMARY KEY (pedido_id) 
        )`)
}

console.log();
console.log("Criando Tabela de Pedidos");
async function insertTablePedido() {
    const conn = await connect();
    await conn.query(`CREATE TABLE Pedidos ( 
        pedido_id INT NOT NULL AUTO_INCREMENT,
        pedido_nome VARCHAR(100),
        pedido_preco FLOAT(10,2),
        PRIMARY KEY (pedido_id) 
        )`)
}

console.log();
console.log("Criando Tabela de Clientes");
async function insertTablesCliente() {
    const conn = await connect();
    await conn.query(`CREATE TABLE Clientes ( 
        cliente_id INT NOT NULL AUTO_INCREMENT, 
        cliente_nome VARCHAR(100),
        fk_pedido_id INT, 
        PRIMARY KEY (cliente_id),
        KEY fk_pedido_id (fk_pedido_id),
        CONSTRAINT fk_pedido_id FOREIGN KEY (fk_pedido_id) REFERENCES pedidos (pedido_id)
        )`)
}

async function populationTabelPedido(values) {
    const conn = await connect();
    const insertValues = `INSERT INTO pedidos(pedido_id, pedido_nome, pedido_preco) VALUES (?,?,?);`
    const value = [values.pedido_id, values.pedido_nome, values.pedido_preco]
    return await conn.query(insertValues, value)
}

async function populationTableCliente(values) {
    const conn = await connect();
    const insertValues = `INSERT INTO clientes(cliente_id, cliente_nome, fk_pedido_id ) VALUES (?,?,?)`
    const value = [values.cliente_id, values.cliente_nome, values.fk_pedido_id]
    return await conn.query(insertValues, value)
}

async function updateCliente(cliente_id, value) {
    const conn = await connect();
    const updateValues = `UPDATE clientes SET cliente_nome =? WHERE cliente_id =?`;
    const values = [value.cliente_nome, cliente_id]
    return await conn.query(updateValues, values)
}

async function deleteCliente(cliente_id) {
    const conn = await connect();
    const updateValues = `DELETE FROM clientes WHERE cliente_id =?`;
    const values = [cliente_id]
    return await conn.query(updateValues, values)
}

async function selectClientes(){
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM clientes`)
    return rows
}

async function selectPedidos(){
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM pedidos`)
    return rows
}

module.exports = {
    insertTablePedido,
    insertTablesCliente,
    populationTabelPedido,
    populationTableCliente,
    updateCliente,
    deleteCliente,
    selectClientes,
    selectPedidos
}