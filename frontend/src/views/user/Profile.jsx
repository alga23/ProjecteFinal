import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useFetch from '../../hooks/useFetch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStyle } from '../../styles/user/ProfileStyle';
import useAuth from '../../hooks/useAuth';
import FollowFeed from '../post/FollowFeed';
import { useTranslation } from 'react-i18next';
import { Global } from '../../utils/Global';

export default function Profile({ route }) {
    const { auth } = useAuth({});
    const isOwnProfile = resolvedProfileId === auth._id;

    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [active, setActive] = useState('publicaciones');
    const { profileId } = route.params ?? { profileId: null };
    const resolvedProfileId = profileId ?? auth._id;
    const [profileDetails, setProfileDetails] = useState(null);

    const [profileContador, setProfileContador] = useState(null);
    const [profilePosts, setProfilePosts] = useState([]);
    const { fetchData } = useFetch();
    const navigation = useNavigation();

    const { t } = useTranslation();

    const LoadingIndicator = () => (
        <View style={{ flex: 1, marginTop: 60 }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    const fetchProfileData = async () => {
        try {
            const responseProfileDetails = await fetchData(Global.url + 'user/profile/' + resolvedProfileId, 'GET');
            if (responseProfileDetails.status === 'success') {
                const user = responseProfileDetails.user;
                setProfileDetails(user);
            } else {
                console.log('Error getting user details.');
            }
            
            const responseContador = await fetchData(Global.url + 'user/' + resolvedProfileId + '/contador', 'GET');
            if (responseContador.status === 'success') {
                setProfileContador(responseContador);
            } else {
                console.log('Error getting counter details.');
            }
            
            const responsePosts = await fetchData(Global.url + 'post/user/' + resolvedProfileId, 'GET');
            if (responsePosts.status === 'success') {
                setProfilePosts(responsePosts.publications);
            } else {
                console.log('Error getting posts from user.');
            }
        } catch (error) {
            console.log('Error: ' + error);
        } finally {
            setIsLoadingProfile(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setIsLoadingProfile(true);
            fetchProfileData();
        }, [profileId])
    );

    useEffect(() => {
        fetchProfileData();
    }, [profileId]);

    const handlePress = (route, id) => {
        navigation.navigate(route, { id: id });
    };

    // Función para eliminar un post del feed
    const onDeletePost = useCallback((postId) => {
        setProfilePosts(prevFeed => prevFeed.filter(post => post._id !== postId));
    }, []);

    const renderProfilePosts = () => {
        return profilePosts.map(post => (
            <FollowFeed
                key={post._id}
                post={post}
                userId={resolvedProfileId}
                auth={auth}
                onDeletePost={onDeletePost}
            />
        ));
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
                                <TouchableOpacity style={ProfileStyle.followButton}>
                                    <Text style={ProfileStyle.followButtonText}>Seguir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={ProfileStyle.bottomPartContainer}>
                        <View style={ProfileStyle.followersRowContainer}>
                            <View style={ProfileStyle.followersContainer}>
                                <TouchableOpacity onPress={() => handlePress('FollowList', [profileDetails._id, 'followers'])}>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{profileContador.followers}</Text>{t('seguidores')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('FollowList', [profileDetails._id, 'following'])}>
                                    <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{profileContador.following}</Text>{t('siguiendo')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handlePress('Chat', profileDetails._id)}>
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
                                        source={require('../../../assets/icons/brand_icons/ps_logo.png')}
                                        style={ProfileStyle.gamertagImage} />
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
