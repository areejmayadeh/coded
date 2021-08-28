import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";


export const TBListItem = (props) => {
    let { item } = props;
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.push('TBCharacterDetails', { id: item.id, name: item.name })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        width: Dimensions.get('screen').width / 2 - 24,
        paddingBottom: 16
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16
    },
    title: {
        fontWeight: '800',
        fontSize: 18,
        fontStyle: 'italic',
        color: '#34FDED'
    }
});