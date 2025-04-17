import {BD} from '../db.js'

class rotasCategorias{
    static async novaCategoria(req, res){
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body;
     
            try{
                const categoria = await BD.query(`INSERT INTO categorias  (nome, tipo_transacao, gasto_fixo, id_usuario) VALUES ($1, $2, $3, $4)`,
                    [ nome, tipo_transacao, gasto_fixo, id_usuario ])
            
                res.status(201).json('categorias cadastradas')
            }catch(error){
            console.error('erro ao criar categoria', error)
            res.status(500).json({message:  "Erro ao consultar categorias",  error: error.message})
        }
    }
       // Função atualizar
       static async atualizarTodosCampos(req, res){
        const {id} = req.params 
        const {nome, tipo_transacao, gasto_fixo, id_usuario } = req.body;
 
        try{
            const categoria = await BD.query('UPDATE categorias SET nome = $1, tipo_transacao = $2, gasto_fixo = $3, id_usuario = $4  where id_categoria = $5',
                [nome, tipo_transacao, gasto_fixo, id_usuario, id ]
            )
            res.status(200).json(categoria.rows[0])
        }catch(error){
        res.status(500).json({message:  "Erro ao consultar categorias",  error: error.message})
    }
 } 

   //Funçao para ATUALIZAR os valores INDIVIDUALMENTE caso necessario
   static async atualizar(req, res) {
    const {nome, tipo_transacao, gasto_fixo, id_usuario} = req.body;

    try{
        //Inicialiar arrays(vetores) para armazenar os campos e valores a serem atualizados
        const campos = [];
        const valores = [];

        
        //Verificar quais campos foram fornecidos
        if(nome !== undefined){
            campos.push(`nome = $${valores.length + 1 }`) //Usa o tamanho da array para determinar o campo
            valores.push(nome);
        }

        
        if(tipo_transacao !== undefined){
            campos.push(`tipo_transacao = $${valores.length + 1 }`)
            valores.push(tipo_transacao);
        }

          
        if(gasto_fixo!== undefined){
            campos.push(`gasto_fixo = $${valores.length + 1 }`)
            valores.push(gasto_fixo);
        }
        if(id_usuario!== undefined){
            campos.push(`id_usuario = $${valores.length + 1 }`)
            valores.push(id_usuario);
        }

        if(campos.length === 0 ){
            return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
        }

         //montamos a query dinamicamente
         const query = `UPDATE categorias SET ${campos.join(',')} WHERE id_usuario = ${id} RETURNING *`
         //Executando nossa query 
         const categoria = await BD.query(query,valores)

          //Verifica se o usuario foi atualizado 
        if(categoria.rows.length === 0){
            return res.status(404).json({message: 'Categoria não encontrada'})
        }
        return res.status(200).json(categoria.rows[0]);
    }
        catch(error){
            res.status(500).json({message: "Erro ao atualizar o categoria", error: error.message})

        }
    }

        //DELETAR
        static async deletar(req, res){
            const { id } = req.params;
            try{
                const categoria = await BD.query('UPDATE categorias SET ativo = false WHERE id_categoria = $1', [id])
        return res.status(200).json({message: "Categoria atualizada com sucesso"})
            }catch(error){
                res.status(500).json({message:  "Erro ao deletar usuario",  error: error.message})
            }
        }

        //consultar 
      static async consultarPorId(req, res){
        const {id} =req.params;
        try{
            const categoria = await BD.query(`SELECT * FROM categorias WHERE id_categoria = $1`, [id]);
        res.status(200).json(categoria.rows[0]); 
        }catch(error){
            res.status(500).json({message:  "Erro ao consultar categorias",  error: error.message})
        }
    }

     //Função listar todos
     static async listarTodos(req, res){
        try{
            const categoria = await BD.query('SELECT * FROM categorias');
            return res.status(200).json(categoria.rows); //retorna a lista de categoria
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as categorias', error: error.message})
        }
    }
}
    
      export default rotasCategorias;
