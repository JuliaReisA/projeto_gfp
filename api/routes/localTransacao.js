import {BD} from '../db.js'

class rotasLocalTransacoes{
    static async novoLocalTransacoes(req, res){
    const {nome, tipo_local, saldo, ativo} = req.body;

    try{
        const local = await BD.query(`INSERT INTO local_transacao ( nome, tipo_local, saldo, ativo) VALUES ($1, $2, $3, $4)`,
            [nome, tipo_local, saldo, ativo] )
        res.status(201).json('Local transações cadastradas')
        }catch(error){
        
        console.error('erro ao criar Local transação', error)

        res.status(500).json({message:  "Erro ao consultar  Local transação",  error: error.message})
        }
    }

    // Função atualizar
    static async atualizarTodosCampos(req, res){
        const {id} = req.params 
        const {nome, tipo_local, saldo, ativo } = req.body;
        
 
        try{
            const categoria = await BD.query('UPDATE local_transacao SET nome = $1, tipo_local = $2, saldo = $3, ativo = $4 ',
                [nome, tipo_local, saldo, ativo, id ]
            )
            res.status(200).json(categoria.rows[0])
        }catch(error){
        res.status(500).json({message:  "Erro ao consultar local_transacao",  error: error.message})
          }
     } 
     //Funçao para ATUALIZAR os valores INDIVIDUALMENTE caso necessario
   static async atualizar(req, res) {
    const {nome, tipo_local, saldo, ativo} = req.body;

    try{
        //Inicialiar arrays(vetores) para armazenar os campos e valores a serem atualizados
        const campos = [];
        const valores = [];








    } catch(err){
        console.log(err);
        
    }
}

}











export default rotasLocalTransacoes;