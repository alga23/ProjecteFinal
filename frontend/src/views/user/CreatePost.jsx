import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { LoginStyle } from '../../styles/user/LoginStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from "../../theme/index"
import { CreatePostStyle } from '../../styles/user/CreatePostStyle'
import { ArrowLeftIcon } from "react-native-heroicons/solid"

export default function CreatePost() {
    return (
        <SafeAreaView>
            <View style={CreatePostStyle.topContainer}>
                <View style={CreatePostStyle.backButtonContainer}>
                    <TouchableOpacity>
                        <ArrowLeftIcon size={40} color="black"></ArrowLeftIcon>
                    </TouchableOpacity>
                </View>
                <View style={CreatePostStyle.postButtonContainer}>
                    <TouchableOpacity style={CreatePostStyle.postButton}>
                        <Text style={CreatePostStyle.postButtonText}> Publicar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={CreatePostStyle.contentContainer}>
                <View style={CreatePostStyle.profilePictureContainer}>
                    <Image
                        source={require("../../../assets/images/default_profile_picture.jpg")}
                        style={CreatePostStyle.imageProfile}
                    />
                </View>
                <View style={CreatePostStyle.textContainer}>
                    <TextInput
                        style={CreatePostStyle.postText}
                        placeholder="¿Qué tienes en mente?"
                        multiline={true} />
                </View>
            </View>
        </SafeAreaView>
    )
}