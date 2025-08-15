import { parse } from 'dotenv'
import {BD} from '../db.js'

class rotasTransacoes{
    static async novaTransacoes(req, res){
        const { id_usuario, id_categoria, valor, descricao, data_vencimento, data_transacao, data_pagamento, tipo_transacao, id_conta, id_subcategoria,
            parcela_atual, num_parcelas } = req.body
     
            try{
                const transacao = await BD.query(`INSERT INTO transacoes  ( id_usuario, id_categoria, valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_subcategoria,
            parcela_atual, data_transacao, num_parcelas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                    [  id_usuario, id_categoria, valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_subcategoria,
                        parcela_atual,data_transacao, num_parcelas ])
            
                res.status(201).json('transações cadastradas')
            }catch(error){
            console.error('erro ao criar transação', error)
            res.status(500).json({message:  "Erro ao consultar transação",  error: error.message})
        }
    }

     // Função atualizar
       static async atualizarTodosCampos(req, res){
        const {id} = req.params 
        const {id_usuario, id_categoria, valor, descricao, data_vencimento, data_transacao, data_pagamento, tipo_transacao, id_conta, id_subcategoria,
            parcela_atual, num_parcelas} = req.body;

    try{
            const transacao = await BD.query('UPDATE transacoes SET valor = $1 , descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo_transacao = $5, id_conta = $6, id_subcategoria = $7, parcela_atual = $8, num_parcelas = $9, id_usuario = $10, id_categoria = $11, data_transacao = $12 where id_transacao = $13',
                [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_subcategoria, parcela_atual, num_parcelas, id_usuario, id_categoria, data_transacao, id ]
            )
            res.status(200).json(transacao.rows[0])
        }catch(error){
        res.status(500).json({message:  "Erro ao atualizar transacao",  error: error.message})
    }
 } 

      //Funçao para ATUALIZAR os valores INDIVIDUALMENTE caso necessario
   static async atualizar(req, res) {
    const {id} = req.params
    const {id_usuario, id_categoria, valor, descricao, data_vencimento, data_transacao, data_pagamento, tipo_transacao, id_conta, id_subcategoria,
            parcela_atual, num_parcelas} = req.body;

     try{
        //Inicialiar arrays(vetores) para armazenar os campos e valores a serem atualizados
        const campos = [];
        const valores = [];

         //Verificar quais campos foram fornecidos
        if(valor !== undefined){
            campos.push(`valor = $${valores.length + 1 }`) //Usa o tamanho da array para determinar o campo
            valores.push(valor);
        }

        if(descricao !== undefined){
            campos.push(`descricao = $${valores.length + 1 }`)
            valores.push(descricao);
        }
        if(data_transacao !== undefined){
            campos.push(`data_transacao = $${valores.length + 1 }`)
            valores.push(data_transacao);
        }
          if(data_vencimento !== undefined){
             campos.push(`data_vencimento = $${valores.length + 1 }`)
            valores.push(data_vencimento);
        }   
        if(data_pagamento !== undefined){
            campos.push(`data_pagamento = $${valores.length + 1 }`)
            valores.push(data_pagamento);
        }
        if(tipo_transacao !== undefined){
            campos.push(`tipo_transacao = $${valores.length + 1 }`)
            valores.push(tipo_transacao);
        }
        if(id_conta !== undefined){
            campos.push(`id_conta = $${valores.length + 1 }`)
            valores.push(id_conta);
        }
        if(id_subcategoria !== undefined){
            campos.push(`id_subcategoria = $${valores.length + 1 }`)
            valores.push(id_subcategoria);
        }
        if(parcela_atual !== undefined){
            campos.push(`parcela_atual = $${valores.length + 1 }`)
            valores.push(parcela_atual);
        }
        if(num_parcelas !== undefined){
            campos.push(`num_parcelas = $${valores.length + 1 }`)
            valores.push(num_parcelas);
        }
        if(id_usuario !== undefined){
            campos.push(`id_usuario = $${valores.length + 1 }`)
            valores.push(id_usuario);
        }
        if(id_categoria !== undefined){
            campos.push(`id_categoria = $${valores.length + 1 }`)
            valores.push(id_categoria);
        }

        if(campos.length === 0 ){
            return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
        }

         //montamos a query dinamicamente
         const query = `UPDATE transacoes SET ${campos.join(',')} WHERE id_usuario = ${id} RETURNING *`
         //Executando nossa query 
         const transacao = await BD.query(query,valores)

         
          //Verifica se o usuario foi atualizado 
        if(transacao.rows.length === 0){
            return res.status(404).json({message: 'Transacao não encontrada'})
        }
        return res.status(200).json(transacao.rows[0]);
    }
        catch(error){
            res.status(500).json({message: "Erro ao atualizar a transacao ", error: error.message})

        }
    }

       //DELETAR
        static async deletar(req, res){
            const { id } = req.params;
            try{
                const transacao = await BD.query('UPDATE transacoes SET ativo = false WHERE id_transacao = $1', [id])
        return res.status(200).json({message: "Transacao atualizada com sucesso"})
            }catch(error){
                res.status(500).json({message:  "Erro ao deletar usuario",  error: error.message})
            }
        }

         //consultar 
      static async consultarPorId(req, res){
        const {id} =req.params;
        try{
            const transacao = await BD.query(`SELECT * FROM transacoes WHERE id_transacao = $1`, [id]);
        res.status(200).json(categoria.rows[0]); 
        }catch(error){
            res.status(500).json({message:  "Erro ao consultar transacaoes",  error: error.message})
        }
    }

    
     //Função listar todos
     static async listarTodos(req, res){
        try{
            const transacao = await BD.query('SELECT * FROM transacoes');
            return res.status(200).json(transacao.rows); //retorna a lista de categoria
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as transacoes', error: error.message})
        }
    }

    //Criar uma rota que permite filtrar as transações por data de vencimento ou data de pagamento
    //dentro do intervalo especifico
    static async filtrarPorData(req, res){
    const { data_inicio, data_fim, tipo_data } = req.query;

    let colunaData;
    if (tipo_data === 'vencimento') {
        colunaData = 'data_vencimento';
    } else if (tipo_data === 'pagamento') {
        colunaData = 'data_pagamento';
    } else {
        return res.status(400).json({ message: 'Tipo de data inválido, use vencimento ou pagamento' 
        })
    }
    try {
        const query = `
        SELECT t.*, u.nome AS nome_usuario, ct.nome 
        FROM transacoes  AS t 
        lEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
        LEFT JOIN contas ct ON t.id_conta = ct.id_conta
        WHERE ${colunaData} BETWEEN $1 AND $2
        ORDER BY ${colunaData} ASC
        `


     const transacao = await BD.query(query, [data_inicio, data_fim])

    res.status(200).json(transacao.rows);
    }catch (error) {
        console.error('Erro ao filtrar transações:', error);
        res.status(500).json({ message: 'Erro ao filtrar transações', error: error.message });
        }
    }

    //Somando transacoes entrada ou saida
    static async somarTransacoes(req, res) {
        const { tipo, id_usuario } = req.query;
        try {
        const tipoTransacao = tipo.toUpperCase();

        const query = `
            SELECT SUM(valor) AS total
             FROM transacoes
             WHERE tipo_transacao = $1 AND id_usuario = $2 
        `
        const resultado = await BD.query(query, [tipoTransacao, id_usuario]);

        let total = resultado.rows[0].total;
        if (total === null) 
        {
            total = 0
        }
        res.status(200).json({ total: parseFloat(total) });
        }catch (error) {
        console.error('Erro ao somar transação:', error);
        res.status(500).json({ message: 'Erro ao somar transação', error: error.message });
            
    
        }

    }

    static async transacoesVencidas(req, res) {
        const { id_usuario } = req.params;

        try{
            const query = `
                SELECT t.valor, t.data_transacao, t.data_vencimento, t.data_pagamento,
                u.nome AS nome_usuario,
                c.nome AS nome_conta,
                ct.nome AS nome_subcategoria,
                stc.nome AS nome_subcategoria
                FROM transacoes AS t
                LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
                LEFT JOIN contas c ON t.id_conta = c.id_conta
                LEFT JOIN categorias ct ON t.id_categoria = ct.id_categoria
                LEFT JOIN subcategorias stc ON t.id_subcategoria = stc.id_subcategoria
                WHERE t.data_vencimento < CURRENT_DATE          -- Filtra transações vencidas
                AND t.id_usuario = $1
                ORDER BY t.data_vencimento ASC
            `

            const resultado = await BD.query(query, [id_usuario])

            //Função para formatar a data
            const formatarDataBr = (data) => {
                if (!data) return null;
                return new Date(data).toLocaleDateString('pt-BR')//Converte a data no padrao BR
            }

            const dadosFormatados = resultado.rows.map(t => ({
                ...t, // copia todas as propriedfades originais da resultado para a t
                data_transacao: formatarDataBr(t.data_transacao),
                data_vencimento: formatarDataBr(t.data_vencimento),
                data_pagamento: formatarDataBr(t.data_pagamento),
            }))
            res.status(200).json(dadosFormatados);
            }catch(error){
                console.error('Erro ao listar transações vencidas:', error);
                res.status(500).json({ message: 'Erro ao listar transações vencidas', error: error.message });
            
        }
       
    }


}

export default rotasTransacoes;