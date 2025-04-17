import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config()

//Estabelecendo conexão com o SupaBase usando connectionString
//const BD = new Pool ({
//  connectionString: "postgres://postgres.nhlwumzklctlqztdyman:i1QvVdi3v0Y8Si8t@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
// ssl: {
//         rejectUnauthorized: false // O supabase requer SSL
//     }
// });


const BD = new Pool({
   user: 'postgres',
    host: 'localhost',
    database: 'bd_gfp',
    password:'admin',
    port: 5432,
})


const testarConexao = async () =>{
    try{
        const client = await BD.connect();//tenta estabelecer a conexão com o banco de dados
        console.log("Conexao com o banco de dados estabelecida");
        client.release();//libera o client
    }catch(error)
    {
        console.log("Erro ao conectar o bnaco de dados ", error.message)
    }
}

export {BD, testarConexao};