export const corPrincipal = '#1d2d44';
export const corSecundaria = '#706ef9';
export const corTextos = '#f2f2f2';
export const corFundo ='#f1c0e8';
export const corFundo2 = '#cfbaf0';

const Estilos = {
    conteudo : {
        flex: 1,
        width: '100%',
        backgroundColor: corFundo
    },

    conteudoHeader : {
        flex: 1,
        backgroundColor: corSecundaria,
    },
    conteudoCorpo : {
        flex: 1,
        backgroundColor: corFundo2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 15,
       
    },
    imagemLista: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 7,
       
    },
    nomeLista: {
        fontSize: 16,
        fontWeight: 'bold',
        color: corSecundaria,
    },
    inputCad: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: corPrincipal,
        borderRadius: 5,
        padding: 10,
        backgroundColor: corFundo,
    }

}



export default Estilos;