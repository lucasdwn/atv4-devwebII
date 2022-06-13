/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
import { useEffect } from "react";
import { useState } from "react";
import NavBar_ from "../../components/navbar_";
import api from "../../services/api";

function CadastrarCliente() {
    const [cliente, setCliente] = useState({
        cliente_nome: '',
        fk_pedido_id: 0
    })
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        loadPedidos()
    }, []);

    async function loadPedidos(){
        await api.get('/pedido').then((response) =>{
            setPedidos(response.data)
            console.log(response.data)
        })
        
    }

   const valueInput = e => setCliente({ ...cliente, [e.target.name]: e.target.value})

   const cadastrar = async e => {
    e.preventDefault()
    setCliente({
        cliente_nome: '',
        fk_pedido_id: ''
    })
    await api.post('/cliente', cliente).then(() => {
        alert('Cliente cadastrado!')
    }).catch((error) =>{
        alert(error)
    })

   }
    
    return (
        <section>
            <header>
                <NavBar_/>
            </header>
            <main>
                <h1>Cadastrar Cliente</h1>
                <form onSubmit={cadastrar}>
                    <div className="field">
                        <label htmlFor="cliente_nome">Nome:</label>
                        <input type="text" name="cliente_nome" id='cliente_nome' onChange={valueInput} value={cliente.cliente_nome}/>
                    </div>
                    <div className="field">
                        <label htmlFor="fk_pedido_id">Pedido:</label>
                        <select name="fk_pedido_id" id="fk_pedido_id" value={cliente.fk_pedido_id} onChange={valueInput}>
                            <option>Selecione um pedido</option>
                            {
                                pedidos && pedidos.map((pedidos) => {
                                    <option value={pedidos.pedido_id} key={pedidos.pedido_id}>{pedidos.pedido_nome}</option>
                                })
                            }
                            {pedidos.map((pedido) =>{
                                const list = (
                                    <option value={pedido.pedido_id} key={pedido.pedido_id}>{pedido.pedido_nome}</option>
                                );
                                return list;
                            })}
                        </select>
                    </div>
                    <input type="submit" value="Cadastrar"/>
                </form>
            </main>
        </section>
    );
}

export default CadastrarCliente;