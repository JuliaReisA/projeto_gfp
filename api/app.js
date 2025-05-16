import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubCategorias from './routes/rotasSubCategorias.js';
import rotasTransacoes from './routes/rotasTransacoes.js';
import rotasLocalTransacoes from './routes/localTransacao.js';

const app = express()
testarConexao();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API funcionando!')
})

//Rotas Usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)  //✔
app.post('/usuarios/login', rotasUsuarios.login) //✔
app.get('/usuarios/:id', rotasUsuarios.consultarPorId) //✔
app.get('/usuarios', autenticarToken, rotasUsuarios.listarTodos) //✔
app.delete('/usuarios/:id',autenticarToken,  rotasUsuarios.deletar) // ✔
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.atualizar) //✔
app.put('/usuarios/:id', rotasUsuarios.atualizarTodosCampos) //✔


//Rotas Categorias
app.post('/categorias', rotasCategorias.novaCategoria) //✔
app.put('/categorias/:id', rotasCategorias.atualizarTodosCampos) //✔
app.put('/categorias/:id', rotasCategorias.atualizar) // ✔
app.delete('/categorias/:id', rotasCategorias.deletar) // ✔
app.get('/categorias/:id', rotasCategorias.consultarPorId) // ✔
app.get('/categorias', rotasCategorias.listarTodos) // ✔

//Rotas SubCategorias
app.post('/subcategorias', rotasSubCategorias.NovaSubCategoria) // ✔
app.put('/subcategorias/:id', rotasSubCategorias.atualizarTodosCampos) // ✔
app.patch('/subcategorias/:id', rotasSubCategorias.atualizar) // ✔
app.delete('/subcategorias/:id', rotasSubCategorias.deletar) // ✔
app.get('/subcategorias/:id', rotasSubCategorias.consultarPorId) // ✔
app.get('/subcategorias', rotasSubCategorias.listarTodos) // ✔

//Local

app.post('/local', rotasLocalTransacoes.novoLocalTransacoes)

//Transações
app.post('/transacao', rotasTransacoes.novaTransacoes)

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`)
})