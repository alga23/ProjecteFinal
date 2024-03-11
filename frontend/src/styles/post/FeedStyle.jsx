import { themeColors } from "../../theme/index"

export const FeedStyle = {
 
    containerPrincipal: {   
        flex: 1
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
        width: 60,
        height: 60
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
    }
}