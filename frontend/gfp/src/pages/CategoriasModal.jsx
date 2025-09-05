import React, { useState, useEffect, useContext } from "react";
import { enderecoServidor, listaCores, listaIcones, iconesCategoria} from "../utils";
import { MdCreditCard, MdSave, MdClose } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom'
import Estilos from '../styles/Estilos'
import { UsuarioContext } from '../UsuarioContext'

export default function CategoriasModal({ modalAberto, fecharModal, itemAlterar }) {
    const { dadosUsuario } = useContext(UsuarioContext);

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tipotransacao, setTipoTransacao] = useState('SAIDA')
    const [gastoFixo, setGastoFixo] = useState(false)
    const [cor, setCor] = useState(listaCores[0])
    const [icone, setIcone] = useState(listaIcones[0])

    useEffect(() => {
        if (itemAlterar) {
            setNome(itemAlterar.nome);
            setDescricao(itemAlterar.descricao);
            setTipoTransacao(itemAlterar.tipo_transacao);
            setGastoFixo(itemAlterar.gasto_fixo);
            setCor(itemAlterar.cor);
            setIcone(itemAlterar.icone);
        } else {
            setNome('');
            setDescricao('');
        }
    }, [itemAlterar, modalAberto]);

    if (modalAberto === false) {
        return null;
    }


    const botaoSalvar = async () => {
        if (nome.trim() == '') {
            alert('Informe o nome da categoria')
            return
        }
        const dados = {
            nome: nome,
            descricao: descricao,
            tipotransacao: tipotransacao,
            id_usuario: dadosUsuario.id_usuario,
            gastoFixo: gastoFixo,
            cor: cor,
            icone: icone,
            ativo: true
        }

        try {
            let endpoint = `${enderecoServidor}/categorias`
            let metodo = 'POST'

            if (itemAlterar) {
                endpoint = `${enderecoServidor}/categorias/${itemAlterar.id_categorias}`
                metodo = 'PUT'
                console.log(metodo)
                console.log(endpoint)
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dadosUsuario.token}`
                },
                body: JSON.stringify(dados)
            })

            if (resposta.ok) {
                alert('Categoria cadastrada com sucesso!')
                fecharModal();
            }

        } catch (error) {
            alert('Erro ao salvar Conta' + error.message)
            console.error('Erro ao salvar conta:', error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 py-6 px-4 flex justify-center items-centerz-50   ">
            <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-gray-800">
                {/* Cabeçalho */}
                <header className="flex itens-center gap-2 mb-6 border-b border-gray-200 pb-4">
                    <MdCreditCard className="text-cyan-600 h-8 w-8 " />
                    <h2 className="text-2xl font-bold">
                        {itemAlterar ? 'Editar Categoria' : 'Nova Categoria'}
                    </h2>
                </header>

                {/* Formulario de cadastro*/}
                <div className="space-y-5 ">
                    <div className="flex p-2 rounded-md shadow-sm">
                        <button type='button' onClick={() => setTipoTransacao('ENTRADA')}
                            className={` flex-1 rounded-1-md ${tipotransacao == 'ENTRADA' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>ENTRADA</button>
                        <button type='button' onClick={() => setTipoTransacao('SAIDA')}
                            className={` flex-1 rounded-1-md ${tipotransacao == 'SAIDA' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>SAIDA</button>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="w-2/3">
                            <label className={Estilos.labelCadastro}>Nome da Categoria</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
                                placeholder="Ex.: Alimentação, Lazer, etc"
                                className={Estilos.inputCadastro} />
                        </div>
                        <input type="checkbox" checked={gastoFixo} onChange={(e) => setGastoFixo(e.target.checked)} />
                        <label>Gasto Fixo?</label>
                    </div>

                    <label className={Estilos.labelCadastro}>Descrição da Categoria</label>
                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Ex.: Gastos com supermercado"
                        className={Estilos.inputCadastro} />

                       <label className={Estilos.labelCadastro}>Escolha uma cor </label>
                       <div className={Estilos.listaCoresModalCategorias}>
                        {
                            listaCores.map((corItem) => (
                                <div
                                    key={corItem}
                                    onClick={() => setCor(corItem)}
                                    style={{ backgroundColor: corItem }}
                                    className={`${Estilos.iconeCorBotaoModal} ${cor == corItem ? 'ring-2 ring-offset-2 ring-cyan-500' :''}`}

                                />
                            ))
                        }
                       </div>

                       <label className={Estilos.labelCadastro}>Escolha um ícone </label>
                       <div className={Estilos.listaItensModalCategorias}>
                        {
                            listaIcones.map((iconeItem) => (
                                <div
                                    key={icone}
                                    onClick={() => setIcone(iconeItem)}
                                    style={{ backgroundColor: cor}}
                                    className={`${Estilos.iconeCorBotaoModal} ${cor == iconeItem ? 'ring-2 ring-offset-2 ring-cyan-500' :''}`}
                                >
                                    { iconesCategoria[iconeItem]}
                                </div>
                                
                            ) )
                        }
                       </div>








                    {/* Botões de controle*/}
                    <div className="flex justify-end gap-3 mt-8">
                        <button className={Estilos.botaoOutline} onClick={() => fecharModal()}>
                            <MdClose /> Cancelar
                        </button>
                        <button className={Estilos.botao} onClick={botaoSalvar}>
                            <MdSave /> Salvar
                        </button>

                    </div>
                </div>


            </section>

        </div>
    )
}