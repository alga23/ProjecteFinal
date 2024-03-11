import { themeColors } from "../../theme";

export const ShowJuegosStyle = {

    containerPrincipal: {
        flex: 1
    },
    container: {
        marginHorizontal: 30,
    },
    lineTop: {
        borderTopWidth: 1,
        borderColor: themeColors.lineBorderGray,
        marginBottom: 20
    },
    containerIconLupa: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 50,
    },
    inputFiltro: {
        position: 'relative'
    },
    inputText: {
        paddingLeft: 35,
        paddingVertical: 5
    },
    lupaIcon: {
        position: 'absolute',
        top: 5,
        left: 5
    },
    textCategoria: {
        marginVertical: 20
    },
    containerGeneroView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardJuegos: {
        flexDirection: 'row',
        gap: 10
    },
    juegoImg: {
        width: 120,
        height: 250,
        borderRadius: 10,
    }
}
