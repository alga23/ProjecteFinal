import { themeColors } from "../theme";

export const BottomMenuStyle = {

    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: themeColors.background,
    },
    addCircle: {
        position: 'absolute',
        bottom: 65,
        right: 10,
        zIndex: 10,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: themeColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
        backgroundColor: themeColors.background,
    },
    circleColor: {
        color: themeColors.azulFondo
    },
    iconColor: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
}