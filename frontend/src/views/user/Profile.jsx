import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileStyle } from '../../styles/user/ProfileStyle'
import { TouchableOpacity } from "react-native";
import { View, Image, Text, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native'
import useFetch from '../../hooks/useFetch'
import React, { useState, useContext, useEffect } from 'react'
import { Global } from '../../utils/Global'

export default function Profile() {
    const route = useRoute()
    //const resolvedProfileId = profileId ?? userDetails._id
    const [active, setActive] = useState("publicaciones")
    const { profileId } = route.params ?? { profileId: null }
    const resolvedProfileId = profileId
    const [profileDetails, setProfileDetails] = useState(null)
    const [isLoadingProfile, setIsLoadingProfile] = useState(true)
    const { fetchData } = useFetch();
    const navigation = useNavigation();

    const LoadingIndicator = () => (
        <View style={{ flex: 1, marginTop: 60 }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    const fetchProfileData = async () => {
        try {
            const responseProfileDetails = await fetchData(Global.url + "user/profile/" + resolvedProfileId);
            if (responseProfileDetails.status === "success") {
                const user = await responseProfileDetails.user;

                setProfileDetails(user);
            } else {
                console.log('Error getting user details.');
            }
        } catch (error) {
            console.log("Error: " + error);
        } finally {
            setIsLoadingProfile(false)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            //setIsLoadingPosts(true)
            setIsLoadingProfile(true)
            fetchProfileData()
            //fetchData();
            //fetchLikes();
        }, [profileId])
    )

    const handlePress = (route, id) => {
        navigation.navigate(route, {id: id});
    }

    return (
        <SafeAreaView>
            {isLoadingProfile ? (
                <LoadingIndicator />
            ) : (
                <View style={ProfileStyle.profileInfoContainer}>
                    <View style={ProfileStyle.topPartContainer}>
                        <View style={ProfileStyle.profileImageContainer}>
                            {profileDetails.imagen === "default.png" ? (
                                <Image
                                    source={{ uri: Global.url_default }}
                                    style={ProfileStyle.imageProfile} />
                            ) : (
                                <Image
                                    source={{ uri: profileDetails.imagen }}
                                    style={ProfileStyle.imageProfile} />
                            )
                            }

                        </View>
                        <View style={ProfileStyle.topPartRightPart}>
                            <View style={ProfileStyle.namesContainer}>
                                <Text style={ProfileStyle.aliasText}>{profileDetails.nick}</Text>
                                <Text style={ProfileStyle.usernameText}>@{profileDetails.username}</Text>
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
                                <TouchableOpacity onPress={() => handlePress('Following', profileDetails._id)}>
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
                                <Icon name="mail-outline" size={26} />
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileStyle.descriptionContainer}>
                            <Text style={{ fontSize: 16 }}>{profileDetails.biografia}</Text>
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
                                    <TouchableOpacity onPress={() => setActive("publicaciones")}>
                                        <Text style={[active == "publicaciones" ? ProfileStyle.bottomTextFocused : ProfileStyle.bottomTextUnfocused]}>16 publicaciones</Text>
                                    </TouchableOpacity>
                                    {active == "publicaciones" && (<View style={ProfileStyle.elementActive} />)}
                                </View>
                                <TouchableOpacity onPress={() => setActive("likes")}>
                                    <Text style={[active == "likes" ? ProfileStyle.bottomTextFocused : ProfileStyle.bottomTextUnfocused]}>65 me gusta</Text>
                                    {active == "likes" && (<View style={ProfileStyle.elementActive} />)}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}