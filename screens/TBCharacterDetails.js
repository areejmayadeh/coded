import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import { getCharacterById } from '../api';
import { useRoute } from "@react-navigation/native";
import { TBEpisodesList } from '../components/TBEpisodesList.component';
const { height } = Dimensions.get('screen');


export const TBCharacterDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const route = useRoute();
    const characterId = route.params?.id ? route.params?.id : undefined;

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        setLoading(true);
        getCharacterById(characterId).then((res) => {
            setLoading(false);
            if (res.status == 200) {
                setData(res.data);
            }
        })
    }

    const getStatusColor = (status) => {
        if (status == 'Dead') {
            return 'red';
        } else if (status == 'Alive') {
            return '#239509';
        } else {
            return 'orange';
        }
    }

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size='large' color='#34FDED' /> : null}
            {data && !loading ?
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Image source={{ uri: data.image }} style={styles.image} />
                        <Text style={styles.name}>{data.name}</Text>
                        <View style={styles.statusContainer}>
                            <View
                                style={[
                                    styles.statusDot,
                                    { backgroundColor: getStatusColor(data.status) }
                                ]}
                            />
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: getStatusColor(data.status) }
                                ]}>
                                {data.status}
                            </Text>
                        </View>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subtitle}>
                                {`Type : ${data.species}`}
                            </Text>
                            <Text style={styles.subtitle}>|</Text>
                            <Text style={styles.subtitle}>
                                {`Gender ${data.gender}`}
                            </Text>
                        </View>
                        <View style={styles.separator} />
                        <Text
                            style={styles.episodesTitle}
                        >
                            {`Episodes (${data.episode?.length})`}
                        </Text>
                    </View>
                    <TBEpisodesList episodes={data.episode} />
                </ScrollView>
                :
                !loading ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text>No data available for this character</Text>
                    </View>
                    : null
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignContent: 'center'
    },
    title: {
        color: 'red',
        fontSize: 24,
        fontWeight: '700'
    },
    image: {
        height: height * 0.5,
        width: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    statusText: {
        fontSize: 16,
        color: '#239509',
        fontWeight: 'bold',
    },
    deadStatusText: {
        color: 'red',
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#239509',
        marginHorizontal: 5
    },
    deadStatus: {
        backgroundColor: 'red',
    },
    separator: {
        borderTopColor: '#34FDED',
        borderTopWidth: 1,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginHorizontal: 20
    },
    subtitle: {
        color: '#08B3A5',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    episodesTitle: {
        backgroundColor: '#34FDED',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
});