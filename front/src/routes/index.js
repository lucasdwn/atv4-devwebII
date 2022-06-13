import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import CadastrarCliente from '../pages/cadastrarClientes';
import CadastrarPedido from '../pages/cadastrarPedido';
import EditarCliente from '../pages/editarCliente';
import Home from '../pages/home';


function Rotas() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/cadastrar_pedido' element={<CadastrarPedido/>}/>
                <Route exact path='/cadastrar_cliente' element={<CadastrarCliente/>}/>
                <Route exact path='/editar_cliente/:cliente_id' element={<EditarCliente/>}/>
            </Routes>
        </Router>
    )
}

export default Rotas;