/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
import NavBar_ from "../../components/navbar_";
import { Table, Button } from 'react-bootstrap';
import './styles.css'
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])
    useEffect(() => {
        loadClientes()
    }, []);

    const [pedidos, setPedidos] = useState([])
    useEffect(() => {
        loadPedidos()
    }, []);

    async function loadClientes() {
        await api.get('/cliente').then((response) => {
            setClientes(response.data)
        }).catch((error) =>{
            alert(error)
        })
       
    }

    async function loadPedidos() {
        await api.get('/pedido').then((response) => {
            setPedidos(response.data)
        }).catch((error) =>{
            alert(error)
        })
       
    }

    function editCliente(cliente_id) {
        navigate(`/editar_cliente/${cliente_id}`)
    }

    async function deleteCliente(cliente_id) {
        await api.delete(`/cliente/${cliente_id}`).then(() => {
            alert('Cliente deletado')
            loadClientes()
        })
    }

    return (
        <section>
            <header>
                <NavBar_/>
            </header>
            <main>
                <h1>Clientes</h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Pedido</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        {clientes.map((cliente) =>{
                                const list = (
                                    <tr key={cliente.cliente_id}>
                                        <td>{cliente.cliente_id}</td>
                                        <td>{cliente.cliente_nome}</td>
                                        <td>{cliente.fk_pedido_id}</td>
                                        <td>
                                                <Button className='button' variant="light" onClick={() => editCliente(cliente.cliente_id)}>Editar</Button>
                                                <Button className='button' variant="danger" onClick={() => deleteCliente(cliente.cliente_id)}>Remover</Button>
                                            </td>
                                    </tr>
                                );
                                return list;
                            })}
                        </tbody>
                    </Table>
                </div>
                <h1>Pedidos</h1>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Preco</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pedidos.map((pedido) =>{
                                const list = (
                                    <tr key={pedido.pedido_id}>
                                        <td>{pedido.pedido_id}</td>
                                        <td>{pedido.pedido_nome}</td>
                                        <td>R$ {pedido.pedido_preco}</td>
                                    </tr>
                                );
                                return list;
                            })}
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Home;