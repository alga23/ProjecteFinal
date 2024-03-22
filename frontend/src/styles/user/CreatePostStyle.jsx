
import { themeColors } from "../../theme/index"

export const CreatePostStyle = {
    topContainer: {
        backgroundColor: "white",
        height: 85,
        padding: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    backButtonContainer: {
        justifyContent: "center",

    },
    postButton: {
        backgroundColor: themeColors.postButtonBlue,
        paddingHorizontal: 23,
        height: 43,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        marginTop: 15

    },
    postButtonText: {
        color: "white",
        fontWeight: 600,
        fontSize: 22,
        textAlign: "center"

    },
    contentContainer: {
        flexDirection: "row",
        padding: 20,
        borderColor: themeColors.postBorderLight,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    profilePictureContainer: {
    },
    imageProfile: {

        borderRadius: 50,
        height: 45,
        width: 45,
    },
    textContainer: {
        padding: 10,
        height: 300,
    },
    postText: {
        color: themeColors.textGray,
        fontSize: 18,
        fontWeight: "300",
        width: "100%"

    }



}

