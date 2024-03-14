import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileStyle } from '../../styles/user/ProfileStyle'
import { TouchableOpacity } from "react-native";
import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";

export default function Profile() {

    const [active, setActive] = useState("publicaciones")

    return (
        <SafeAreaView>
            <View style={ProfileStyle.profileInfoContainer}>
                <View style={ProfileStyle.topPartContainer}>
                    <View style={ProfileStyle.profileImageContainer}>
                        <Image
                            source={require("../../../assets/images/dog.jpg")}
                            style={ProfileStyle.imageProfile} />
                    </View>
                    <View style={ProfileStyle.topPartRightPart}>
                        <View style={ProfileStyle.namesContainer}>
                            <Text style={ProfileStyle.aliasText}>Pablo51</Text>
                            <Text style={ProfileStyle.usernameText}>@pablo451</Text>
                        </View>
                        <View style={ProfileStyle.followButtonContainer}>
                            <TouchableOpacity style={ProfileStyle.followButton}>
                                <Text style={ProfileStyle.followButtonText}>Seguir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={ProfileStyle.bottomPartContainer}>
                    <View style={ProfileStyle.followersRowContainer}>
                        <View style={ProfileStyle.followersContainer}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16 }}>
                                    <Text style={{ fontWeight: 'bold' }}>57</Text> seguidores
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                    <Text style={{ fontWeight: 'bold' }}>543</Text> siguiendo
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity>
                            <Icon name="mail-outline"
                                size={26} />
                        </TouchableOpacity>

                    </View>
                    <View style={ProfileStyle.descriptionContainer}>
                        <Text style={{ fontSize: 16 }}>Esta cuenta la he creado para dejar saber a todo el mundo que Starfield es el peor juego de la historia</Text>

                    </View>
                    <View style={ProfileStyle.gamertagsContainer}>
                        <View style={ProfileStyle.gamertagContainer}>
                            <TouchableOpacity style={ProfileStyle.gamertagButtonLeft}>
                                <Image
                                    source={require("../../../assets/icons/brand_icons/ps_logo.png")}
                                    style={ProfileStyle.gamertagImage} />
                                <Text style={ProfileStyle.gamertagText}> Pablito51</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={ProfileStyle.bottomContainer}>
                        <View style={ProfileStyle.bottomElementsContainer}>
                            <View style={ProfileStyle.bottomElements1}>
                                <TouchableOpacity
                                    onPress={() => setActive("publicaciones")}>
                                    <Text style={[active == "publicaciones" ? ProfileStyle.bottomTextFocused : ProfileStyle.bottomTextUnfocused]}>16 publicaciones</Text>
                                </TouchableOpacity>
                                {active == "publicaciones" && (<View style={ProfileStyle.elementActive} />)}
                            </View>
                            <TouchableOpacity
                                onPress={() => setActive("likes")}>
                                <Text style={[active == "likes" ? ProfileStyle.bottomTextFocused : ProfileStyle.bottomTextUnfocused]}>65 me gusta</Text>
                                {active == "likes" && (<View style={ProfileStyle.elementActive} />)}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={ProfileStyle.bottomLine}></View>
        </SafeAreaView>
    )
}