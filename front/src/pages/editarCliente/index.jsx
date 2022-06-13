/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar_ from "../../components/navbar_";
import api from "../../services/api";

function EditarCliente() {
    const { cliente_id } = useParams()
    const navigate = useNavigate()

    const [cliente, setCliente] = useState({
        cliente_nome: ''
    })

   const valueInput = e => setCliente({ ...cliente, [e.target.name]: e.target.value})

   const cadastrar = async e => {
    e.preventDefault()
    setCliente({
        cliente_nome: ''
    })
    await api.put(`/cliente/${cliente_id}`, cliente).then((response) => {
        alert('Cliente editado!')
        navigate('/')
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
                <h1>Editar Cliente</h1>
                <form onSubmit={cadastrar}>
                    <div className="field">
                        <label htmlFor="cliente_nome">Nome:</label>
                        <input type="text" name="cliente_nome" id='cliente_nome' onChange={valueInput} value={cliente.cliente_nome}/>
                    </div>
                    <input type="submit" value="Salvar"/>
                </form>
            </main>
        </section>
    );
}

export default EditarCliente;