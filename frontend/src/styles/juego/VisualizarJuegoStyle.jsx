import { themeColors } from "../../theme";

export const VisualizarJuegoStyle = {

    containerPrincipal: {
        flex: 1,
        backgroundColor: '#fff'
    },
    lineTop: {
        borderTopWidth: 1,
        borderColor: themeColors.lineBorderGray,
        marginBottom: 20,
    },
    fondoNegro: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .2)',
        width: 400,
        height: '100%',
        zIndex: 999
    },
    container: {
        flex: 1
    },
    containerImg: {
        position: 'relative',
    },
    imgGta: {
        width: '100%',
        height: 240,
    },
    arrowContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        borderRadius: 50,
        padding: 4,
        backgroundColor: 'rgba(0, 0, 0, .4)',
        zIndex: 1000
    },
    iconArrow: {
        color: '#fff'
    },

    margenContenedor: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    textRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTitulo: {
        fontSize: 25,
        flexShrink: 1,
    },
    containerEtiquetas: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 20
    },
    etiquetaJuego: {
        borderTopRightRadius: 65,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingRight: 14,
        padding: 4,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        color: '#fff',
    },
    textInfo: {
        textAlign: 'justify'
    },
    textOpiniones: {
        textAlign: 'center',
        borderBottomWidth: 1,
        fontWeight: 'bold',
        fontSize: 18
    },
    lineMain: {
        borderBottomWidth: 2,
        borderColor: themeColors.azulFondo,
        width: '50%',
        marginLeft: 95
    },
    imgPerfil: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    cardOpiniones: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10
    },
    infoUsuario: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 5,
        marginBottom: 10
    },
    textOpinion: {
        marginBottom: 10,
        width: '90%',
    },
    containerIconsElement: {
        flexDirection: 'row',
        gap: 25,
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    }
}