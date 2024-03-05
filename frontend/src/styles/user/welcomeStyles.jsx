import { themeColors } from "../../theme/index"

export const welcomeStyles = {
    container: {
        flex: 1,
        backgroundColor: themeColors.azulFondo,
    },
    contentContainer: {
        justifyContent: 'center',
        margin: 20,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        marginTop: 50,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    image: {
        width: 350,
        height: 350,
    },
    buttonContainer: {
        marginVertical: 50,
    },
    signUpButton: {
        backgroundColor: themeColors.amarilloBoton,
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    signUpButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: themeColors.textGray,
    },
    alreadyHaveAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
    },
    alreadyHaveAccountText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 15,
    },
    logInButton: {
        fontWeight: 'bold',
        color: themeColors.amarilloBoton,
        fontSize: 15,

    },
};