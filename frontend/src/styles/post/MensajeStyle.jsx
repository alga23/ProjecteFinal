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
    textUserName: {
        color: '#666666'
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
        width: 50, 
        height: 50, 
        borderRadius: 75, 
        overflow: 'hidden', 
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'
    },
    containerCardMessage: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 7,
        marginHorizontal: 20
    },
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    scrollViewContainer: {
        marginBottom: 100
    },
    infoUsuario: {
        flexDirection: 'column',
    },
    notify: {
        width: '80%',
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#008EDC',
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
    },
    contenedorMessage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    imageContainer: {
        marginRight: 10,
    },
    imagen: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoUser: {
        flex: 1,
        justifyContent: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    nickText: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    usernameText: {
        color: '#666666',
    },
    createdAtText: {
        color: '#666666'
    },
    deleteContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 68, 68, 0.8)',
        borderRadius: 15,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
}