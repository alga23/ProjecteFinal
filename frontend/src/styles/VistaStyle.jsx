import { Platform, StatusBar } from "react-native";

export const VistaStyle = {
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
}