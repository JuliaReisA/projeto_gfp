import {BD} from '../db.js'

class rotasTransacoes{
    static async novaTransacoes(req, res){
        const { id_usuario, id_categoria, valor, descricao, data_transacao,  } = req.body;
     
            try{
                const categoria = await BD.query(`INSERT INTO categorias  (nome, tipo_transacao, gasto_fixo, id_usuario) VALUES ($1, $2, $3, $4)`,
                    [ nome, tipo_transacao, gasto_fixo, id_usuario ])
            
                res.status(201).json('categorias cadastradas')
            }catch(error){
            console.error('erro ao criar categoria', error)
            res.status(500).json({message:  "Erro ao consultar categorias",  error: error.message})
        }
    }
}
    export default rotasTransacoes;