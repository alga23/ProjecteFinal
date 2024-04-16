import { themeColors } from "../../theme";

export const MensajeStyle ={

    containerPrincipal: {
        flex: 1,
        backgroundColor: '#fff'
    },
    lineTop: {
        borderTopWidth: 1,
        borderColor: themeColors.lineBorderGray,
        marginBottom: 20
    },
    textoBandeja: {
        fontSize: 28,
        fontWeight: 'bold'
        },
    container: {
        marginTop: 178,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerSecundario:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoSecundario:{
        fontSize: 14
    },
    botonStyle:{
        backgroundColor: '#0074B4',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 20,
        padding:13,
 },
    botonTexto:{
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    botonContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerConMensajes:{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15
    },
    search: {
        flexDirection: 'row'
    },
    inputSearch: {
        width: '82%',
    },
    textName: {
        fontWeight: 'bold'
    },
    textMessage: {
        fontWeight: 'bold'
    },
    arrowContainer: {
        marginLeft: 15,
        padding: 10
    },
    textoTusMensajes:{
        fontWeight: 'bold',
        fontSize: 19
        

    },
    fotoUsuario:{
        width: 60, 
        height: 60, 
        borderRadius: 75, 
        overflow: 'hidden', 
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'
    },
    containerCardMessage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginVertical: 20,
        marginHorizontal: 20
    },
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    infoUsuario: {
        flexDirection: 'column',
    },
    notify: {
        width: '80%',
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#008EDC',
        marginLeft: 4
    },
    timeText: {
        color: '#7A7A7A',
    },
    textContador: {
        color: '#fff',
        textAlign: 'center'
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#ccc'
    }
}