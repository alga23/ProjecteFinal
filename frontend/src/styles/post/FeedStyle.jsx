import { themeColors } from "../../theme/index"

export const FeedStyle = {
 
    containerPrincipal: {   
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
    },
    cardPost: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 15,
        borderBottomWidth: 1,
        borderColor: themeColors.lineBorderGray,
        paddingBottom: 10
    },
    postInfo: {
        width: '80%',
        flexDirection: 'column',
        marginTop: 15,
        gap: 15
    },
    imageUsuario: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 10,
        marginRight: 15
    },
    infoUsuario: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    containerIcons: {
        flexDirection: 'row',
        gap: 25
    },
    imagenPost: {
        width: '100%',
        height: 250
    },
    containerIconElement: {
        flexDirection: 'row',
        gap: 5
    },
    textSiguiendo: {
        color: themeColors.azulFondo
    },
    textPopulares: {
        color: themeColors.azulFondo
    },
    line: {
        borderBottomWidth: 1,
        borderColor: themeColors.lineBorderGray
    },
    mainLine: {
        width: '30%',
        borderBottomWidth: 2,
        borderColor: themeColors.azulFondo
    },
    lineSelectSiguiendo: {
        marginLeft: 30,
    },
    lineSelectPopulares: {
        marginLeft: 235
    },
    noPosts: {
        marginHorizontal: 30,
        marginVertical: 20,
        fontSize: 16,
        color: 'gray', // Puedes ajustar el color según el diseño de tu app
    },
    followBottom: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: themeColors.azulFondo,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    followButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
}