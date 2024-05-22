import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useFetch from '../../hooks/useFetch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStyle } from '../../styles/user/ProfileStyle';
import useAuth from '../../hooks/useAuth';
import * as SecureStore from 'expo-secure-store';
import FollowFeed from '../post/FollowFeed';
import { useTranslation } from 'react-i18next';
import { Global } from '../../utils/Global';

export default function Profile({ route }) {
    const { auth } = useAuth({});
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [active, setActive] = useState("publicaciones");
    const { profileId } = route.params ?? { profileId: null };
    const resolvedProfileId = profileId ?? auth._id;
    const [profileDetails, setProfileDetails] = useState(null);
    const [profileContador, setProfileContador] = useState(null);
    const [profileLikedPosts, setProfileLikedPosts] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);
    const [userId, setUserId] = useState(null);
    const { fetchData } = useFetch();

    const navigation = useNavigation();
    const { t } = useTranslation();

    const isOwnProfile = resolvedProfileId === auth._id;

    const LoadingIndicator = () => (
        <View style={{ flex: 1, marginTop: 60 }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    useEffect(() => {
        const getUserId = async () => {
            const storedUserId = await SecureStore.getItemAsync('user');
            setUserId(storedUserId);
        };

        getUserId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setIsLoadingProfile(true);
            fetchProfileData();
        }, [profileId])
    );

    useEffect(() => {
        fetchProfileData();
    }, [profileId]);

    const fetchProfileData = async () => {
        try {
            // Fetch profile details
            const responseProfileDetails = await fetchData(Global.url + "user/profile/" + resolvedProfileId, "GET");
            if (responseProfileDetails.status === "success") {
                const user = responseProfileDetails.user;
                setProfileDetails(user);
            } else {
                throw new Error('Error getting user details.');
            }

            // Fetch profile counter
            const responseContador = await fetchData(Global.url + "user/" + resolvedProfileId + "/contador", "GET");
            if (responseContador.status === "success") {
                setProfileContador(responseContador);
            } else {
                throw new Error('Error getting counter details.');
            }

            // Fetch profile posts
            const responsePosts = await fetchData(Global.url + "post/user/" + resolvedProfileId, "GET");
            if (responsePosts.status === "success") {
                setProfilePosts(responsePosts.publications);
            } else {
                throw new Error('Error getting posts from user.');
            }

            // Fetch liked posts by the user
            const responseLikedPosts = await fetchData(Global.url + "post/liked/" + resolvedProfileId, "GET");
            if (responseLikedPosts.status === "success") {
                setProfileLikedPosts(responseLikedPosts.likedPosts);
            } else {
                throw new Error('Error getting liked posts.');
            }

            // Check if not own profile, then fetch following status
            if (!isOwnProfile) {
                const responseFollowing = await fetchData(Global.url + "follow/following/" + auth._id);
                if (responseFollowing.status === "success") {
                    setIsFollowing(responseFollowing.user_following.includes(resolvedProfileId));
                } else {
                    throw new Error('Error getting followers from user.');
                }
            }
        } catch (error) {
            console.log("Error: " + error);
        } finally {
            setIsLoadingProfile(false);
        }
    };
    const handleButton = async () => {
        if (isOwnProfile) {
            navigation.navigate("Edit");
        } else {
            const body = { follower: resolvedProfileId };
            try {
                const response = await fetchData(Global.url + "follow/save", "POST", body);
                if (response.status === 'success') {
                    if (isFollowing) {
                        setIsFollowing(false)
                    } else {
                        setIsFollowing(true)
                    }
                } else {
                    console.error('Error en la solicitud');
                    console.log(body)
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    };

    const handlePress = (route, id) => {
        navigation.navigate(route, { id: id });
    };

    // Function to delete a post from the feed
    const onDeletePost = useCallback((postId) => {
        setProfilePosts(prevFeed => prevFeed.filter(post => post._id !== postId));
    }, []);

    const onDeleteLikedPost = useCallback(async (postId) => {
        try {
            const response = await fetchData(Global.url + "post/unlike/" + postId, "DELETE");
            if (response.status === "success") {
                // Remove the post from liked posts
                setProfileLikedPosts(prevLikedFeed => prevLikedFeed.filter(post => post._id !== postId));
                // Update the like counter
                setProfileContador(prevContador => ({
                    ...prevContador,
                    likes: prevContador.likes - 1
                }));
            } else {
                throw new Error('Error unliking post.');
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }, []);

    const renderProfilePosts = () => {
        if (active === 'publicaciones') {
            return profilePosts.map(post => (
                <FollowFeed
                    key={post._id}
                    post={post}
                    userId={userId}
                    auth={auth}
                    onDeletePost={onDeletePost}
                />
            ));
        } else if (active === 'likes') {
            return profileLikedPosts.map(post => (
                <FollowFeed
                    key={post._id}
                    post={post}
                    userId={userId}
                    auth={auth}
                    onDeletePost={onDeleteLikedPost}
                />
            ));
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoadingProfile ? (
                <LoadingIndicator />
            ) : (
                <ScrollView style={ProfileStyle.profileInfoContainer}>
                    <View style={ProfileStyle.topPartContainer}>
                        <View style={ProfileStyle.profileImageContainer}>
                            {profileDetails.imagen && profileDetails.imagen === 'default.png' ? (
                                <Image source={{ uri: Global.url_default }} style={ProfileStyle.imageProfile} />
                            ) : (
                                <Image source={{ uri: profileDetails.imagen }} style={ProfileStyle.imageProfile} />
                            )}
                        </View>
                        <View style={ProfileStyle.topPartRightPart}>
                            <View style={ProfileStyle.namesContainer}>
                                <Text style={ProfileStyle.aliasText}>{profileDetails.nick}</Text>
                                <Text style={ProfileStyle.usernameText}>@{profileDetails.username}</Text>
                            </View>
                            <View style={ProfileStyle.followButtonContainer}>
                                <TouchableOpacity style={ProfileStyle.followButton} onPress={handleButton}>
                                    <Text style={ProfileStyle.followButtonText}>
                                        {isOwnProfile ? "Editar" : (isFollowing ? "Siguiendo" : "Seguir")}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={ProfileStyle.bottomPartContainer}>
                        <View style={ProfileStyle.followersRowContainer}>
                            <View style={ProfileStyle.followersContainer}>
                                <TouchableOpacity onPress={() => handlePress('FollowList', [profileDetails._id, 'followers'])}>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{profileContador.followers}</Text> {t('seguidores')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('FollowList', [profileDetails._id, 'following'])}>
                                    <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{profileContador.following}</Text> {t('siguiendo')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {!isOwnProfile && (
                                <TouchableOpacity onPress={() => handlePress('Chat', profileDetails._id)}>
                                    <Icon name="mail-outline" size={26} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={ProfileStyle.descriptionContainer}>
                            <Text style={{ fontSize: 16 }}>{profileDetails.biografia}</Text>
                        </View>
                        <View style={ProfileStyle.gamertagsContainer}>
                            <View style={ProfileStyle.gamertagContainer}>
                                <TouchableOpacity style={ProfileStyle.gamertagButtonLeft}>
                                    <Image
                                        source={require('../../../assets/icons/brand_icons/ps_logo.png')}
                                        style={ProfileStyle.gamertagImage}
                                    />
                                    <Text style={ProfileStyle.gamertagText}> Pablito51</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={ProfileStyle.bottomContainer}>
                            <View style={ProfileStyle.bottomElementsContainer}>
                                <View style={ProfileStyle.bottomElements1}>
                                    <TouchableOpacity onPress={() => setActive('publicaciones')}>
                                        <Text style={[active === 'publicaciones' ? ProfileStyle.bottomTextFocused : ProfileStyle.bottomTextUnfocused]}>
                                            {profileContador.posts} {t('publicaciones')}
                                        </Text>
                                    </TouchableOpacity>
                                    {active === 'publicaciones' && <View style={ProfileStyle.elementActive} />}
                                </View>
                                <TouchableOpacity onPress={() => setActive('likes')}>
                                    <Text style={[active === 'likes' ? ProfileStyle.bottomTextFocused : ProfileStyle.bottomTextUnfocused]}>
                                        {profileContador.likes} {t('meGusta')}
                                    </Text>
                                    {active === 'likes' && <View style={ProfileStyle.elementActive} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {renderProfilePosts()}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

