import {BD} from '../db.js'
import bcrypt from 'bcrypt'

class rotasUsuarios{
    static async novoUsuario(req, res){
        const { nome, email, senha, tipo_acesso } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        try{
            const usuario = await BD.query(`
               INSERT INTO usuarios(nome, email, senha, tipo_acesso)
                VALUES($1, $2, $3, $4)
              `,[nome, email, senhaCriptografada, tipo_acesso])
                res.status(201).json('Usuario Cadastrado')
        }catch(error){
            console.error('Erro ao criar usuario', error);
            res.status(500).json({message: 'Erro ao criar', error: error.message})

        }
    }

        // Função atualizar
        static async atualizarTodosCampos(req, res){
        const {nome, email, senha, tipo_acesso } = req.body;
 
        try{
            const usuario = await BD.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3 , tipo_acesso = $4 where id_usuario = $5',
                [nome, email, senha, tipo_acesso]// comando SQL para atualizar o usuario
            )
            res.status(200).json(usuario.rows[0])
        }catch(error){
        res.status(500).json({message:  "Erro ao consultar usuarios",  error: error.message})
    }
 } 
     //Funçao para ATUALIZAR os valores INDIVIDUALMENTE caso necessario
    static async atualizar(req, res) {
    const {nome, email, senha, tipo_acesso} = req.body;

    try{
        //Inicialiar arrays(vetores) para armazenar os campos e valores a serem atualizados
        const campos = [];
        const valores = [];

        //Verificar quais campos foram fornecidos
        if(nome !== undefined){
            campos.push(`nome = $${valores.length + 1 }`) //Usa o tamanho da array para determinar o campo
            valores.push(nome);
        }

        if(email !== undefined){
            campos.push(`email = $${valores.length + 1 }`)
            valores.push(email);
        }

        if(senha !== undefined){
            campos.push(`senha = $${valores.length + 1 }`)
            valores.push(senha);
        }

        if(tipo_acesso !== undefined){
            campos.push(`tipo_acesso = $${valores.length + 1 }`)
            valores.push(tipo_acesso);
        }
        if(campos.length === 0 ){
            return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
        }

        //montamos a query dinamicamente
        const query = `UPDATE usuarios SET ${campos.join(',')} WHERE id_usuario = ${id} RETURNING *`
        //Executando nossa query 
        const usuario = await BD.query(query,valores)

        //Verifica se o usuario foi atualizado 
        if(usuario.rows.length === 0){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }
        return res.status(200).json(usuario.rows[0]);
    }
        catch(error){
            res.status(500).json({message: "Erro ao atualizar o usario", error: error.message})

        }
    }

        //DELETAR
    static async deletar(req, res){
        const { id } = req.params;
        try{
            const usuario = await BD.query('UPDATE usuarios SET ativo = false WHERE id_usuario = $1', [id])
    return res.status(200).json({message: "Usuario deletado com sucesso"})
        }catch(error){
            res.status(500).json({message:  "Erro ao deletar usuario",  error: error.message})
        }
    }
      //consultar 
      static async consultarPorId(req, res){
        const {id} =req.params;
        try{
            const usuario= await BD.query(`SELECT * FROM usuarios WHERE id_usuario = $1`, [id]);
        res.status(200).json(usuario.rows[0]); 
        }catch(error){
            res.status(500).json({message:  "Erro ao consultar usuarios",  error: error.message})
        }
    }
     //Função listar todos
     static async listarTodos(req, res){
        try{
            //const usuarios = await Usuario.listar();//chamar o metodo listar na model usuario
            const usuario = await BD.query('SELECT * FROM usuarios');
            return res.status(200).json(usuario.rows); //retorna a lista de usuarios.
        }catch(error){
            res.status(500).json({message: 'Erro ao listar os usuarios', error: error.message})
        }
    }

    static async login(req, res){
        const { email, senha} = req.body;
        
        try{
            const resultado = await BD.query(
                `SELECT id_usuario, email, senha, tipo_acesso
                FROM usuarios
                WHERE email = $1 `,
                [email]
            );
            if(resultado.rows.length === 0 ){
                return res.status(401).json({message: 'Email ou senha inválidos'})
            }
            const usuarios = resultado.rows[0];
            const senhaInvalida = await bcrypt.compare(senha, usuarios.senha)

    if(!senhaInvalida){
    return res.status(401).json( 'Email ou senha inválidos')
    }
    // //Gerar um novo token para o usuario
    // const token = jwt.sign(
    // //payload
    // {id: usuarios.id, nome: usuarios.nome, email: usuarios.email},
    // //signature
    // SECRET_KEY,
    // {expiresIn: '1h'}
    //  )
     return res.status(200).json({message: 'Login realizado com sucesso', usuarios});
     //  return res.status(200).json({message: 'Login realizado com sucesso', usuario});
     }
     catch(error){
       console.error('Erro ao realizar login:', error)
       return res.status(500).json({message: 'Erro ao realizar login', error: error.message})

        }
    }
}
 export default rotasUsuarios;