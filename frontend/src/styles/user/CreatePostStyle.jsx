
import { themeColors } from "../../theme/index"
import { Dimensions } from "react-native"

const widthContainer = Dimensions.get('window').height;
const height = widthContainer - 140;

export const CreatePostStyle = {
    container: {
        height: height,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
    },
    addPublicar: {
        borderRadius: 10,
        backgroundColor: themeColors.azulFondo,
        color: themeColors.textWhite,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontWeight: 'bold',
    },
    disabledButton: {
        opacity: .7
    },
    fotoPerfil: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: 15
    },
    textAreaExceeded: {
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Fondo rojo claro
    },
    textArea: {
        marginTop: 25,
        width: '80%',
        borderRadius: 5,
        textAlignVertical: 'top', // Alinea el texto desde arriba
    },
    containerImageSelect: {
        width: 320,
        height: 240,
        marginBottom: 40
    },
    charLenghtContainer: {
        marginRight: 30
    },
    imageSelect: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        marginTop: 20
    },
    containerClose: {
        position: 'absolute',
        top: 30,
        right: 12,
    },
    iconClose: {
        fontSize: 30,
        color: themeColors.textWhite,
        backgroundColor: themeColors.bg_dark,
        borderRadius: 25
    },
    scrollView: {
        marginBottom: -140
    },
    containerPostear: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginLeft: 10,
    },
    containerPostear2: {
        flexDirection: 'column',
        width: '100%'
    },
    textInsideLimit: {
        color: themeColors.textBlack,
    },
    textExceededLimit: {
        color: themeColors.textBlack,
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Fondo rojo claro
    },
    textInput: {
        marginTop: 25,
        width: '80%',
        borderRadius: 5,
        textAlignVertical: 'top',
        fontSize: 18
    },
    containerInput: {
        width: '100%',
        height: '100%',
    },
    containerFooter: {
        paddingTop: 10,
        flexDirection: 'row',
        gap: 10,
        marginLeft: 20,
        borderTopWidth: 1,
        borderTopColor: themeColors.lineBorderGray,
        backgroundColor: themeColors.bg_white
    },
    containerFooter2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: themeColors.lineBorderGray,
        backgroundColor: themeColors.bg_white,
        paddingBottom: 10
    },
    circularContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    circularProgress: {
        marginRight: 20
    },
    circularText: {
        fontSize: 14,
        color: themeColors.textBlack,
        textAlign: 'center', // Centra horizontalmente
        position: 'absolute',
        top: 5,
        left: 0,
        right: 0,
        bottom: 0
    },
    redText: {
        color: 'red',
        marginLeft: -10
    },
    textAndIconsContainer: {
        marginLeft: 20,
    },
    text: {
        color: themeColors.textFooterPost,
        fontSize: 11,
        marginBottom: 10, // Espacio entre el texto y los iconos
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 20,
    },

    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.bgOpenModal
    },
    modalContent: {
        backgroundColor: themeColors.textWhite,
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    textEditar: {
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 15
    },
    confirmationButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
        marginTop: 30
    },
    confirmationButton: {
        borderWidth: 1,
        backgroundColor: themeColors.bg_dark,
        color: themeColors.textWhite,
        paddingVertical: 5,
        paddingHorizontal: 15
    }
}