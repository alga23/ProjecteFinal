import { themeColors } from "../../theme"

export const ProfileStyle = {
    profileInfoContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,


    },
    topPartContainer: {
        flexDirection: 'row',

    },
    imageProfile: {
        borderRadius: 50,
        height: 70,
        width: 70,
    },
    topPartRightPart: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1
    },
    namesContainer: {
        justifyContent: "center",
        marginLeft: 15,
    },
    aliasText: {
        fontWeight: "500",
        fontSize: 20,
    },
    usernameText: {
        fontSize: 16,
    },
    followButtonContainer: {
        justifyContent: "center",

    },
    followButton: {
        backgroundColor: themeColors.postButtonBlue,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,

    },
    followButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
    bottomPartContainer: {
        marginTop: 16,
    },
    followersRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    followersContainer: {
        flexDirection: "row",

    },
    descriptionContainer: {
        marginTop: 12,
    },
    gamertagsContainer: {
        marginTop: 16,
        flexDirection: "row"
    },

    gamertagImage: {
        height: 18,
        width: 18,
    },
    gamertagButtonLeft: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: themeColors.gamertagBlue,
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 10,
    },
    gamertagText: {
        fontWeight: "300",
        color: "white",
        marginLeft: 6,
    },
    bottomContainer: {

    },
    bottomElementsContainer: {
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,

    },
    bottomElements1: {

    },
    element1: {
        backgroundColor: themeColors.azulFondo,
        height: 4,

    },

    bottomLine: {
        borderBottomWidth: 1,
        borderColor: themeColors.postBorderLight,
    },
    bottomTextPublicaciones: {
        fontWeight: "600",
        fontSize: 18,
    },
    bottonTextLikes: {
        fontSize: 18,
        fontWeight: "500"
    }

}

