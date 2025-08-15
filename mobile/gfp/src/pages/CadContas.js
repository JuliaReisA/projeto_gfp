import React, { useState, useEffect, useLayoutEffect, use} from "react"
import { View, Text, TextInput, Switch, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Estilos, { corPrincipal } from "../styles/Estilos";
import { enderecoServidor } from "../utils";

export default function CadContas({ navigation, route }) {
    const [inputNome, setInputNome] = useState('')
    const [inputTipo, setInputTipo] = useState('')
    const [inputSaldo, setInputSaldo] = useState('')
    const [inputContaPadrao, setInputContaPadrao] = useState(false)
    const [usuario, setUsuario] = useState({})

     useEffect(() => {
            buscarUsuarioLogado();
        }
        , []);

    useEffect(() => {
        if (route.params && route.params.conta) {
            setInputNome(route.params.conta.nome);
            setInputTipo(route.params.conta.tipo_conta);
            setInputSaldo(route.params.conta.saldo.toString());
            setInputContaPadrao(route.params.conta.conta_padrao);
        }
    }, [route.params])


       const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('Login');
            }
        }

    const botaoSalvar = async () => {
      try {
          const dados = {
              nome: inputNome,
              tipo_conta: inputTipo,
              saldo: inputSaldo,
              conta_padrao: inputContaPadrao
          }
  
          const endpoint = `${enderecoServidor}/contas`
          const metodo = 'POST'

            if (route.params && route.params.conta) {
                endpoint = `${enderecoServidor}/contas/${route.params.conta.id_conta}`
                metodo = 'PUT'
            }

          const resposta = await fetch(endpoint, {
              method: metodo,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${usuario.token}`
              },
              body: JSON.stringify(dados)
          })
  
          if (resposta.ok) {
              alert('Conta cadastrada com sucesso!')
              navigation.goBack()
          }
      } catch (error) {
            console.error("Erro ao cadastrar conta:", error);
            alert('Erro ao cadastrar conta')
      }
    }


     useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={botaoSalvar}>
                        <MaterialIcons name="save" size={28} color={corPrincipal} 
                            style={{marginRight: 15}} />
                    </TouchableOpacity>
                )
            })
        }, [navigation, inputNome, inputTipo, inputSaldo, inputContaPadrao])


    return (
        <View style={Estilos.conteudoHeader}>
           <View style={Estilos.conteudoCorpo}>
            <Text>Nome da Conta:</Text>
            <TextInput placeholder="Digite o nome da conta"
                value={inputNome} onChangeText={setInputNome}
                style={Estilos.inputCad} />
            <Text>Tipo da Conta:</Text>
            <TextInput placeholder="Digite o Tipo da conta"
                value={inputTipo} onChangeText={setInputTipo}
                style={Estilos.inputCad} />
            <Text>Saldo:</Text>
            <TextInput placeholder="Digite o saldo"
                value={inputSaldo} onChangeText={setInputSaldo}
                style={Estilos.inputCad} keyboardType="numeric"/>
             <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Switch value={inputContaPadrao}
                    onValueChange={setInputContaPadrao} />
                <Text>Conta Padrão</Text>
                </View>
            </View>
        </View>

    )
}