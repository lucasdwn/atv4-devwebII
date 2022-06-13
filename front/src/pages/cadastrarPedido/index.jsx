/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import NavBar_ from "../../components/navbar_";
import api from "../../services/api";

function CadastrarPedido() {
    const [pedido, setPedido] = useState({
        pedido_nome: "",
        pedido_preco: 0
    })

   const valueInput = e => setPedido({ ...pedido, [e.target.name]: e.target.value})

   const cadastrar = async e => {
    e.preventDefault()
    setPedido({
        pedido_nome: "",
        pedido_preco: 0
    })
    await api.post('/pedido', pedido).then(() => {
        alert('Pedido cadastrado!')
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
                <h1>Cadastrar Pedido</h1>
                <form onSubmit={cadastrar}>
                    <div className="field">
                        <label htmlFor="pedido_nome">Nome do pedido:</label>
                        <input type="text" name="pedido_nome" onChange={valueInput}/>
                    </div>
                    <div className="field">
                        <label htmlFor="pedido_preco">Preço do pedido:</label>
                        <input type="number" name="pedido_preco" onChange={valueInput}/>
                    </div>
                    <input type="submit" value="Cadastrar"/>
                </form>
            </main>
        </section>
     );
}

export default CadastrarPedido;