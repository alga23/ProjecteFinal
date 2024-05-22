import { themeColors } from "../../theme"

export const EditProfileStyle = {
    topContainer: {
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: themeColors.postBorderLight,

    },
    topLeftPart: {
        flexDirection: "row",
        alignItems: "center",

    },
    editText: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 8,
    },
    guardarText: {
        fontSize: 18,
        fontWeight: "600",
    },
    mainContentContainer: {
        padding: 20,
    },
    imageContainer: {
        alignItems: "center"
    },
    imageProfile: {
        borderRadius: 45,
        height: 120,
        width: 120,
    },
    inputContainer: {
        marginTop: 18,
    },
    textOutsideInput: {
        fontWeight: "600",
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 8,
        borderRadius: 10,
        borderColor: "#D9D9D9",
        backgroundColor: themeColors.inputGray,
    },
    textInputBiografia: {
        height: 100,
        maxHeight: 100,
        textAlignVertical: 'top'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    modalButton: {
        marginVertical: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: themeColors.primary,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'black',
        fontSize: 16,
    },
}