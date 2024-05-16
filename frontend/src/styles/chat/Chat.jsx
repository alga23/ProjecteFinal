export const ChatStyle = {
    container: {
        flex: 1
    },
    headerChat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    imagenPerfil: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    borderLine: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    },
    inputMensajes: {
        flex: .95,
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        backgroundColor: '#0074B4',
        borderRadius: 20,
        padding: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageIcon: {
        marginRight: 10,
        color: '#0074B4',
    },
    previewImagenContainer: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        backgroundColor: '#000',
        padding: 3,
        borderRadius: 10
    },
    previewImagen: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    containerClosePreviewImagen: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
    },
    closePreviewImagen: {
        color: '#fff',
    },
    myMessage: {
        alignSelf: 'flex-end',
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#000000',
        opacity: .8,
        paddingTop: 5,
        borderRadius: 20,
        maxWidth: '100%',
    },
    theirMessage: {
        alignSelf: 'flex-start',
        marginLeft: 8,
        marginBottom: 8,
        backgroundColor: '#ccc',
        paddingTop: 5,
        borderRadius: 20,
        maxWidth: '100%',
    },
    messageUser: {
        maxWidth: '90%',
        paddingHorizontal: 25,
        marginBottom: 10
    },
    contenidoChat: {
        fontSize: 15,
        color: '#ffffff',
    },
    otherUserTextoChat: {
        fontSize: 15,
        color: '#333333',
    },
    fechaChat: {
        fontSize: 14,
        color: '#777777',
        marginTop: 6,
        alignSelf: 'flex-end',
    },
    imagenMensaje: {
        width: 225,
        height: 225,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 8,
    },
    enterMessage: {
        position: 'absolute',
        top: 15,
        right: 20
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    messageImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        minWidth: 100,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#FF6347",
    },
    buttonCancel: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
    },
    descriptionText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
        textAlign: "center"
    },
    containerInfo: {
        marginTop: 270
    },
    containerInfoImagen: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    imagenInfo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#0074B4',
    },

    textInfo: {
        textAlign: 'center',
        fontSize: 16,
        color: '#4A4A4A',
        marginTop: 5,
    },

    boldText: {
        fontWeight: 'bold',
    },

    borderLineInfo: {
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    dateText: {
        fontSize: 14,
        color: '#707070',
        textAlign: 'center',
        marginBottom: 20,
    },
}