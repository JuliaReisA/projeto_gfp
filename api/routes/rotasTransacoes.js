import {BD} from '../db.js'

class rotasTransacoes{
    static async novaTransacoes(req, res){
        const { id_usuario, id_categoria, valor, descricao, data_vencimento, data_transacao, data_pagamento, tipo_transacao, id_local_transacao, id_subcategoria,
            parcela_atual, num_parcelas } = req.body
     
            try{
                const transacao = await BD.query(`INSERT INTO transacoes  ( id_usuario, id_categoria, valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_subcategoria,
            parcela_atual, data_transacao, num_parcelas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                    [  id_usuario, id_categoria, valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_subcategoria,
                        parcela_atual,data_transacao, num_parcelas ])
            
                res.status(201).json('transações cadastradas')
            }catch(error){
            console.error('erro ao criar transação', error)
            res.status(500).json({message:  "Erro ao consultar transação",  error: error.message})
        }
    }
}
    export default rotasTransacoes;