import { themeColors } from "../../theme/index"

export const LoginStyle = {
    container: {
        flex: 1,
        backgroundColor: themeColors.azulFondo,
    },
    contentContainer: {
        justifyContent: 'center',
    },
    arrowButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    arrowButton: {
        backgroundColor: themeColors.amarilloBoton,
        padding: 10,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginLeft: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    image: {
        width: 175,
        height: 175,
    },
    fieldsContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingTop: 25,
        marginTop: 30
    },
    textInput: {
        backgroundColor: themeColors.inputGray,
        color: themeColors.textGray,
        borderRadius: 12,
        marginBottom: 3,
        padding: 12,
        marginTop: 5

    },
    forgotPasswordText: {
        color: themeColors.textGray,
        fontWeight: '500',
        marginTop: 5

    },
    passwordContainer: {
        marginTop: 10
    },

    loginButton: {
        backgroundColor: themeColors.amarilloBoton,
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 0,
        marginTop: 25
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: themeColors.textGray,
    },
    brandIconsContainer: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: 'center',

    },
    dontHaveAnAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
    },
    dontHaveAnAccountText: {
        color: themeColors.textGray,
        fontWeight: '400',
    },
    signUpButton: {
        fontWeight: 'bold',
        color: themeColors.amarilloBoton,
    },
    brandIconButtonImage: {
        width: 40,
        height: 40
    },
    brandIconButton: {
        padding: 6,
        backgroundColor: themeColors.inputGray,
        borderRadius: 20,
        marginHorizontal: 20
    }


}