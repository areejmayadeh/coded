import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Image
} from 'react-native';
import { getCharacters } from '../api';
import { TBListItem } from '../components/TBListItem.component';
import { useNavigation } from "@react-navigation/native";
import * as Linking from 'expo-linking';

export const TBCharacterList = (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        Linking.getInitialURL().then(urlRedirect);
        Linking.addEventListener('url', event => {
            urlRedirect(event.url);
        });
    }, []);

    useEffect(() => {
        return () => {
            Linking.removeEventListener('url', event => {
                urlRedirect(event.url);
            })
        };
    })

    const urlRedirect = useCallback((url) => {
        if (!url) return;
        const { path, queryParams } = Linking.parse(url);
        if (path != null && path.indexOf('details') != -1 && queryParams?.id) {
            navigation.navigate("Home")
            navigation.navigate('TBCharacterDetails', { id: queryParams?.id })
        } else {
            navigation.navigate("Home")
        }
    }, []);

    const fetchData = () => {
        setLoading(true);
        getCharacters(page).then((res) => {
            setLoading(false);
            if (res.status == 200) {
                if ((characters || []).length > 0 && page != 1) {
                    setCharacters([...characters, ...res.data.results])
                } else {
                    setCharacters(res.data.results);
                }

            }
        });
    }

    const loadMoreData = () => {
        setPage(page + 1);
    }

    const HeaderComponent = () => {
        return (
            <Image source={require('../assets/BG.jpg')} style={styles.headerImg} />
        )
    }

    return (
        <View style={styles.container}>
            {(characters || []).length > 0 ?
                <FlatList
                    data={characters}
                    ListHeaderComponent={() => HeaderComponent()}
                    keyExtractor={(item, index) => String(item.id)}
                    renderItem={({ item }) => item != undefined ? <TBListItem item={item} /> : null}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreData}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                    onEndReachedThreshold={0.1}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingBottom: 60,
                        flexGrow: 1,
                    }}
                    removeClippedSubviews={true}
                    bounces={false}
                />
                : null}
            {loading ? <ActivityIndicator size='large' color='#34FDED' /> : null}
            {!loading && (characters || []).length == 0 ? <Text>Sorry! no characters to shown for now try later.</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    headerImg: {
        width: '100%',
        height: 200,
    }
});