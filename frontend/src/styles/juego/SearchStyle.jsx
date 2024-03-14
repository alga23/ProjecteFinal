import { themeColors } from "../../theme";

export const SearchStyle = {

    containerPrincipal: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        marginHorizontal: 30
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
    containerJuego: {
        marginLeft: 30
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
        justifyContent: 'space-between',
        marginRight: 30
    },
    cardJuegos: {
        flexDirection: 'row',
        gap: 10,
    },
    juegoImg: {
        width: 150,
        height: 250,
        borderRadius: 10,
    },
    noResult: {
        marginVertical: 20,
        marginHorizontal: 35
    },
}
