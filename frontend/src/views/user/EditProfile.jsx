import { SafeAreaView } from "react-native-safe-area-context";
import { EditProfileStyle } from "../../styles/user/EditProfileStyle";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import { themeColors } from "../../theme";
import { useTranslation } from 'react-i18next';
import { editUser } from "../../../../backend/controllers/user";

export default function EditProfile() {

    const { t, i18n } = useTranslation();

    return (
        <SafeAreaView>
            <View style={EditProfileStyle.topContainer}>
                <View style={EditProfileStyle.topLeftPart}>
                    <TouchableOpacity
                        style={EditProfileStyle.arrowButton}
                        onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                    <Text style={EditProfileStyle.editText}>{t("editarPerfil")}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={EditProfileStyle.guardarText}>{t("guardar")}</Text>
                </TouchableOpacity>

            </View>
            <View style={EditProfileStyle.mainContentContainer}>
                <View style={EditProfileStyle.imageContainer}>
                    <TouchableOpacity>
                        <Image
                            source={require("../../../assets/images/dog.jpg")}
                            style={EditProfileStyle.imageProfile} />
                    </TouchableOpacity>

                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("nombreCompleto")}</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue="Juan Luis"
                        placeholder="Escribe tu nuevo nombre completo"
                        placeholderTextColor={themeColors.postBorderLight}
                    //onChangeText={(text) => setName(text)}

                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("nick")}</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue="JuanLuis12"
                        placeholder="Escribe tu nuevo nick"
                        placeholderTextColor={themeColors.postBorderLight}
                    //onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("email")}</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue="juanLuis@gmail.com"
                        placeholder="Escribe tu nuevo email"
                        placeholderTextColor={themeColors.postBorderLight}
                    //onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>Contraseña</Text>
                    <TextInput
                        style={EditProfileStyle.textInput}
                        defaultValue="password"
                        placeholder={t("escribeTuNuevaContraseña")}
                        placeholderTextColor={themeColors.postBorderLight}
                        secureTextEntry
                    //onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={EditProfileStyle.inputContainer}>
                    <Text style={EditProfileStyle.textOutsideInput}>{t("biografia")}</Text>
                    <TextInput
                        style={[EditProfileStyle.textInput, EditProfileStyle.textInputBiografia]}
                        defaultValue="esta es la biografia actual del usuario jisdnaiudauidnaudnida"
                        placeholder={t("escribeTuNuevaBiografia")}
                        placeholderTextColor={themeColors.postBorderLight}
                        multiline={true} // Hace que el input sea multilinea
                        numberOfLines={4}
                    //onChangeText={(text) => setName(text)}
                    />
                </View>


            </View>
        </SafeAreaView>
    )
}