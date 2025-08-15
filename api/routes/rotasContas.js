import {BD} from '../db.js'

class rotasContas{
    static async novaConta(req, res){
    const {nome, tipo_conta, saldo, ativo = true, conta_padrao} = req.body;

    try{
        const contas = await BD.query(`INSERT INTO contas ( nome, tipo_conta, saldo, ativo, conta_padrao) VALUES ($1, $2, $3, $4, $5)`,
            [nome, tipo_conta, saldo, ativo, conta_padrao] )
        res.status(201).json('Contas cadastradas')
        }catch(error){
        console.error('erro ao criar conta', error)

        res.status(500).json({message:  "Erro ao consultar conta",  error: error.message})
        }
    }

    // Função atualizar
    static async atualizarTodosCampos(req, res){
        const {id} = req.params 
        const {nome, tipo_conta, saldo, ativo, conta_padrao} = req.body;
        
 
        try{
            const contas = await BD.query('UPDATE contas SET nome = $1, tipo_conta = $2, saldo = $3, ativo = $4, conta_padrao = $5 ',
                [nome, tipo_conta, saldo, ativo, conta_padrao]
            )
            res.status(200).json(contas.rows[0])
        }catch(error){
        res.status(500).json({message:  "Erro ao consultar contas",  error: error.message})
          }
     } 
     //Funçao para ATUALIZAR os valores INDIVIDUALMENTE caso necessario
   static async atualizar(req, res) {
    const {id} = req.params
    const {nome, tipo_conta, saldo, ativo, conta_padrao} = req.body;

    try{
        //Inicialiar arrays(vetores) para armazenar os campos e valores a serem atualizados
        const campos = [];
        const valores = [];

         //Verificar quais campos foram fornecidos
        if(nome !== undefined){
            campos.push(`nome = $${valores.length + 1 }`) //Usa o tamanho da array para determinar o campo
            valores.push(nome);
        }

        if(tipo_conta !== undefined){
            campos.push(`tipo_conta = $${valores.length + 1 }`)
            valores.push(tipo_conta);
        }

        if(saldo !== undefined){
            campos.push(`saldo = $${valores.length + 1 }`)
            valores.push(saldo);
        }

        if(ativo!== undefined){
            campos.push(`ativo = $${valores.length + 1 }`)
            valores.push(ativo);
        }
        if(conta_padrao!== undefined){
            campos.push(`conta_padrao = $${valores.length + 1 }`)
            valores.push(conta_padrao);
        }
        if(campos.length === 0 ){
            return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
        }

        
        //montamos a query dinamicamente
        const query = `UPDATE contas SET ${campos.join(',')} WHERE id_conta = ${id} RETURNING *`
        //Executando nossa query 
        const contas = await BD.query(query,valores)

        //Verifica se o usuario foi atualizado 
        if(contas.rows.length === 0){
            return res.status(404).json({message: 'Contas não encontrado'})
        }
        return res.status(200).json(contas.rows[0]);
    }

      catch(error){
            res.status(500).json({message: "Erro ao atualizar a conta", error: error.message})

        }
    }

        //DELETAR
    static async deletar(req, res){
        const { id } = req.params;
        try{
            const contas = await BD.query('UPDATE contas SET ativo = false WHERE id_conta = $1', [id])
    return res.status(200).json({message: "Conta desativada com sucesso"})
        }catch(error){
            res.status(500).json({message:  "Erro ao desativar conta",  error: error.message})
        }
    }
    //consultar 
      static async consultarPorId(req, res){
        const {id} =req.params;
        try{
            const contas = await BD.query(`SELECT * FROM contas WHERE id_conta = $1`, [id]);
        res.status(200).json(contas.rows[0]); 
        }catch(error){
            res.status(500).json({message:  "Erro ao consultar contas",  error: error.message})
        }
    }

     //Função listar todos
     static async listarTodos(req, res){
        try{
            //const usuarios = await Usuario.listar();//chamar o metodo listar na model usuario
            const contas = await BD.query('SELECT * FROM contas WHERE ativo = true ');
            return res.status(200).json(contas.rows); //retorna a lista de usuarios.
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as contas', error: error.message})
        }
    }
}

export default rotasContas;