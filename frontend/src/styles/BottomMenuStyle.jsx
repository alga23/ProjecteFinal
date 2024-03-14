import { themeColors } from "../theme";

export const BottomMenuStyle = {

    container: {
        marginBottom: 10
    },
    button: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    secondary: {
        marginRight: 5
    },
    addCircle: {
        position: 'absolute',
        right: 10,
        bottom: 50
    },
    circleColor: {
        color: themeColors.azulFondo
    },
    iconColor: {
        position: 'absolute', 
        top: '28%', 
        left: '30%'
    },
    menuBottom: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
}