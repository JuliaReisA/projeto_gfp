import {BD} from '../db.js'

class rotasSubCategorias{
    static async NovaSubCategoria(req, res){
        const { nome, gasto_fixo, id_categoria} = req.body;
     
            try{
                const subcategoria = await BD.query(`INSERT INTO subcategorias  (nome, gasto_fixo, id_categoria) VALUES ($1, $2, $3)`,
                    [ nome, gasto_fixo, id_categoria ])
            
                res.status(201).json('Subcategorias cadastradas')
            }catch(error){
            console.error('erro ao criar categoria', error)
            res.status(500).json({message:  "Erro ao consultar categorias",  error: error.message})
        }
    }

      // Função atualizar
      static async atualizarTodosCampos(req, res){
        const {id} = req.params 
        const {nome, gasto_fixo, id_categoria} = req.body;
 
        try{
            const subcategoria = await BD.query('UPDATE subcategorias SET nome = $1, gasto_fixo = $2, id_categoria = $3 WHERE id_subcategoria = $4  ',
                [nome, gasto_fixo, id_categoria, id ]
            )
            res.status(200).json(subcategoria.rows[0])
        }catch(error){
        res.status(500).json({message:  "Erro ao consultar categorias",  error: error.message})
    }
 } 

 
   //Funçao para ATUALIZAR os valores INDIVIDUALMENTE caso necessario
   static async atualizar(req, res) {
    const {id} = req.params
    const {nome, gasto_fixo, id_categoria} = req.body;

    try{
        //Inicialiar arrays(vetores) para armazenar os campos e valores a serem atualizados
        const campos = [];
        const valores = [];

      //Verificar quais campos foram fornecidos
      if(nome !== undefined){
        campos.push(`nome = $${valores.length + 1 }`) //Usa o tamanho da array para determinar o campo
        valores.push(nome);
    }

    if(gasto_fixo!== undefined){
        campos.push(`gasto_fixo = $${valores.length + 1 }`)
        valores.push(gasto_fixo);
    }

    if(id_categoria!== undefined){
        campos.push(`id_categoria = $${valores.length + 1 }`)
        valores.push(id_categoria);
    }

    
    if(campos.length === 0 ){
        return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
    }

    
         //montamos a query dinamicamente
         const query = `UPDATE subcategorias SET ${campos.join(',')} WHERE id_categoria = ${id} RETURNING *`
         //Executando nossa query 
         const subcategoria = await BD.query(query,valores)

          //Verifica se o usuario foi atualizado 
        if(subcategoria.rows.length === 0){
            return res.status(404).json({message: 'subcategoria não encontrada'})
        }
        return res.status(200).json(subcategoria.rows[0]);
    }
        catch(error){
            res.status(500).json({message: "Erro ao atualizar o categoria", error: error.message})

        }
    }

       //DELETAR
       static async deletar(req, res){
        const { id } = req.params;
        try{
            const subcategoria = await BD.query('UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1', [id])
    return res.status(200).json({message: "subcategoria deletada com sucesso"})
        }catch(error){
            res.status(500).json({message:  "Erro ao deletar usuario",  error: error.message})
        }
    }

        //consultar 
        static async consultarPorId(req, res){
            const {id} =req.params;
            try{
                const subcategoria = await BD.query(`SELECT * FROM subcategorias WHERE id_categoria = $1`, [id]);
            res.status(200).json(subcategoria.rows[0]); 
            }catch(error){
                res.status(500).json({message:  "Erro ao consultar categorias",  error: error.message})
            }
        }

         //Função listar todos
     static async listarTodos(req, res){
        try{
            const subcategoria = await BD.query('SELECT * FROM subcategorias');
            return res.status(200).json(subcategoria.rows); //retorna a lista de categoria
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as categorias', error: error.message})
        }
    }


}
    export default rotasSubCategorias;