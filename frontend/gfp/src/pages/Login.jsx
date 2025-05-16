import { useNavigate, Link } from "react-router-dom";
import React, { useState } from 'react';
import { enderecoServidor } from "../utils";
import Logo from "../assets/logopink.png"
// import * as from 'react-native-animatable'



const Login = ({ navigation }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async  function botaoEntrar(e) {
        e.preventDefault();

        try{
            if (email == ''  || senha == ''){
                throw new Error('Preencha todos os campos');
            }
            //Autenticando utilizando a API de backend com o fetch
            const resposta = await fetch(`${enderecoServidor}/usuarios/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        senha: senha,
                    })
                }
            )
            if(resposta.ok){
                const dados = await resposta.json();
                navigate("/principal")
                localStorage.setItem('UsuarioLogado', JSON.stringify(dados));
            } else {
                setMensagem('Email ou senha incorretos');
                throw new Error('Email ou senha incorretos');
            }

        }catch (error) {
            console.error('Erro ao realizar login:', error);
            alert(error.message);
            return;
        }
    }

    return (
        <div style={{width:'30%', margin: 'auto', height:'100vh', display:'flex', justifyContent:'center', flexDirection:'column' }}>
         <img className="img-login" src={Logo} ></img>
            <p style={{ color: 'pink', fontWeight: 'bold' }}>Login</p>

            <p style={{ color: 'black', fontWeight: 'bold' }}>E-mail</p>

            <input type="email" placeholder="Digite seu email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}/>

            <p style={{ color: 'black', fontWeight: 'bold' }}>Senha</p>
            <input type="password" placeholder="Digite sua senha" 
                onChange={(e) => setSenha(e.target.value)}
                value={senha}/>
            <button onClick={botaoEntrar}>Entrar</button>

        </div>
    )
}

export default Login;