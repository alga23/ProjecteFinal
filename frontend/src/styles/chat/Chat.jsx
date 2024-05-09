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
        width: 50,
        height: 50,
        borderRadius: 50
    },
    borderLine: {
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    inputMensajes: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 50,
        paddingVertical: 15,
        position: 'relative'
    },
    messageUser: {
        width: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 40,
        marginHorizontal: 40,
        padding: 10
    },
    cameraIcon: {
        position: 'absolute',
        top: 15,
        left: 10
    },
    enterMessage: {
        position: 'absolute',
        top: 15,
        right: 20
    }
}